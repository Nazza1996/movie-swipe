import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Animated, Dimensions, TouchableOpacity } from "react-native";
import MovieDetails from "../components/MovieDetails";
import {
  GestureHandlerStateChangeEvent,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { fetchMovieDetails, fetchMovieCredits, getPopularMovies } from "@/services/tmdb";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app";

const MovieList = () => {
  const [translateX] = useState(new Animated.Value(0)); // Horizontal movement
  const [translateY] = useState(new Animated.Value(0)); // Vertical movement

  const [currentIndex, setCurrentIndex] = useState(0);
  const [movieData, setMovieData] = useState<any[]>([]); // To store preloaded movie data
  const [allActions, setAllActions] = useState<any>([]); // To store all actions (likes, dislikes, etc.) for undo functionality

  const [likedList, setLikedList] = useState<any>([]); // To store liked movies
  const [dislikedList, setDislikedList] = useState<any>([]); // To store disliked movies
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Preload all movie data when the app starts
  useEffect(() => {
    const loadAllMovies = async () => {
      const movies = await getPopularMovies();
      movies.push({title: "Placeholder", id: 0, poster: "https://www.huber-online.com/daisy_website_files/_processed_/8/0/csm_no-image_d5c4ab1322.jpg"});
      const allMovies = await Promise.all(
        movies.map(async (movie: { id: number; title: any; }) => {
          if (movie.id !== 0) {
            const details = (await fetchMovieDetails(movie.title)).data;
            const credits = (await fetchMovieCredits(movie.title)).data;

            return {
              ...movie,
              tagline: details.tagline || "",
              overview: details.overview || "N/A",
              genre: details.genres || "N/A",
              release: details.release_date || "N/A",
              cast: credits.cast || "N/A",
              crew: credits.crew || "N/A",
              poster: `https://media.themoviedb.org/t/p/original${details.poster_path}` || "https://www.huber-online.com/daisy_website_files/_processed_/8/0/csm_no-image_d5c4ab1322.jpg",
              runtime: details.runtime || "N/A",
              revenue: details.revenue || "N/A",
              production_companies: details.production_companies || "N/A",
              backdrop_path: `https://media.themoviedb.org/t/p/original${details.backdrop_path}` || "https://www.huber-online.com/daisy_website_files/_processed_/8/0/csm_no-image_d5c4ab1322.jpg",
            };
          } else {
            return movie;
          }
        })
      );
      setMovieData(allMovies); // Store all movies' details
    };
    loadAllMovies();
  }, []);

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event: GestureHandlerStateChangeEvent) => {
    const { translationX } = event.nativeEvent as any;

    if (translationX > 100) {
      swipeRight();
    } else if (translationX < -100) {
      swipeLeft();
    } else {
      resetPosition(); // Snap back to center if not swiped enough
    }
  };

  const resetPosition = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const nextMovie = ({ direction }: { direction: string }) => {
    if (currentIndex !== movieData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      if (direction === "right") {
        console.log("Liked the movie!");
      } else if (direction === "left") {
        console.log("Skipped the movie!");
      }
    }
  };

  const swipeRight = () => {
    Animated.timing(translateX, {
      toValue: Dimensions.get("window").width + 1000, // Move off-screen to the right
      duration: 200,
      useNativeDriver: true,
    }).start(() => {

      setLikedList([...likedList, { 
        id: movieData[currentIndex].id,
        title: movieData[currentIndex].title, 
        poster: movieData[currentIndex].poster, 
        overview: movieData[currentIndex].overview,
        tagline: movieData[currentIndex].tagline,
        backdrop: movieData[currentIndex].backdrop_path,
        status: "liked",
      }]);

      setAllActions([...allActions, "like"]); // Store all actions for undo functionality

      // Update current index after swipe animation finishes
      nextMovie({ direction: "right" });
      resetPosition(); // Reset the position of the card
    });
  };

  const swipeLeft = () => {
    Animated.timing(translateX, {
      toValue: Dimensions.get("window").width * -1 - 1000, // Move off-screen to the left
      duration: 200,
      useNativeDriver: true,
    }).start(() => {

      setDislikedList([...dislikedList, {
        id: movieData[currentIndex].id,
        title: movieData[currentIndex].title, 
        poster: movieData[currentIndex].poster, 
        overview: movieData[currentIndex].overview,
        tagline: movieData[currentIndex].tagline,
        backdrop: movieData[currentIndex].backdrop_path,
        status: "disliked",
      }]);

      setAllActions([...allActions, "dislike"]); // Store all actions for undo functionality

      // Update current index after swipe animation finishes
      nextMovie({ direction: "left" });
      resetPosition(); // Reset the position of the card
    });
  };

  const tickColor = translateX.interpolate({
    inputRange: [-1, 0, Dimensions.get("window").width / 2, Dimensions.get("window").width],
    outputRange: ["#2c2b3f", "#2c2b3f", "#10ed00", "#10ed00"],
    extrapolateLeft: "clamp",
  });
  
  const xColor = translateX.interpolate({
    inputRange: [-Dimensions.get("window").width, -Dimensions.get("window").width / 2, 0, 1],
    outputRange: ["red", "red", "#2c2b3f", "#2c2b3f"],

  });


  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const lastAction = allActions[allActions.length - 1];
      if (lastAction === "like") {
        setLikedList(likedList.slice(0, -1));
      } else if (lastAction === "dislike") {
        setDislikedList(dislikedList.slice(0, -1));
      }
      setAllActions(allActions.slice(0, -1));
    }
  }

  const editList = () => {
    navigation.navigate('EditList', {likedList, dislikedList});
  }

  if (movieData.length === 0) {
    return null;
  }

  const currentMovie = movieData[currentIndex];

  return (
    <View style={styles.container}>

      <View>
        {/* Tick Icon / Swipe Right */}
        <TouchableOpacity onPress={swipeRight}>
          <Animated.Image source={require("@/assets/images/tick-icon.png")} style={[styles.tickIcon, {tintColor: tickColor}]}></Animated.Image>
        </TouchableOpacity>

        {/* X Icon / Swipe Left */}
        <TouchableOpacity onPress={swipeLeft}>
          <Animated.Image source={require("@/assets/images/x-icon.png")} style={[styles.xIcon, {tintColor: xColor}]}></Animated.Image>
        </TouchableOpacity>

      </View>

      <PanGestureHandler
        onGestureEvent={handleGesture}
        onEnded={handleGestureEnd}
      >
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                { translateX },
                { translateY },
                {
                  rotate: translateX.interpolate({
                    inputRange: [-200, 0, 200],
                    outputRange: ["-10deg", "0deg", "10deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={{
              uri: `${currentMovie.poster}`,
            }}
            style={styles.poster}
          />
        </Animated.View>
      </PanGestureHandler>

      <View style={{flexDirection: "row"}}>

        {/* Undo Button */}
        <TouchableOpacity onPress={undo}>
              <Image source={require("@/assets/images/undo.png")} style={[styles.undoButton, {opacity: currentIndex == 0 ? 0.5 : 1}]}></Image>
        </TouchableOpacity>

        {/* Edit List Button */}
        <TouchableOpacity onPress={editList}>
              <Image source={require("@/assets/images/editList.png")} style={styles.editListButton}></Image>
        </TouchableOpacity>

      </View>


      <MovieDetails movie={currentMovie}></MovieDetails>
    </View>
  );
};

const POSTER_WIDTH = 250;
const POSTER_HEIGHT = (POSTER_WIDTH / 6) * 9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38374f",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: 20,
    backgroundColor: "#2c2b3f",
    borderRadius: 10,
    alignItems: "center",
    zIndex: 1,
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  undoButton: {
    width: 50,
    height: 50,
    marginTop: 20,
    backgroundColor: "#2c2b3f",
    padding: 10,
    borderRadius: 30,
  },
  editListButton: {
    width: 50,
    height: 50,
    marginTop: 20,
    backgroundColor: "#2c2b3f",
    padding: 10,
    borderRadius: 30,
    tintColor: "white",
    marginLeft: 20,
  },
  tickIcon: {
    width: 50,
    height: 50,
    position: "absolute",
    right: -180,
    top: 450,
    tintColor: "#2c2b3f",
  },
  xIcon: {
    width: 45,
    height: 45,
    tintColor: "#2c2b3f",
    position: "absolute",
    left: -180,
    top: 450,
  }
});

export default MovieList;
