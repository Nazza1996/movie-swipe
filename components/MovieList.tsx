import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Animated, Dimensions, TouchableOpacity, Text } from "react-native";
import MovieDetails from "../components/MovieDetails";
import {
  GestureHandlerStateChangeEvent,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { fetchMovieDetails, fetchMovieCredits } from "@/services/tmdb";

const movies = [
  {
    id: 1,
    title: "Iron Man",
    tagline: "",
    overview: "N/A",
    release: "N/A",
    genre: ["N/A"],
    cast: ["N/A"],
    crew: ["N/A"],
    poster: "",
    runtime: "",
    revenue: "",
    production_companies: ["N/A"],
  },
  {
    id: 2,
    title: "Man of Steel",
    tagline: "",
    overview: "N/A",
    release: "N/A",
    genre: ["N/A"],
    cast: ["N/A"],
    crew: ["N/A"],
    poster: "",
    runtime: "",
    revenue: "",
    production_companies: ["N/A"],
  },
  {
    id: 3,
    title: "Avengers Endgame",
    tagline: "",
    overview: "N/A",
    release: "N/A",
    genre: ["N/A"],
    cast: ["N/A"],
    crew: ["N/A"],
    poster: "",
    runtime: "",
    revenue: "",
    production_companies: ["N/A"],
  },
  {
    id: 4,
    title: "Harry Potter and The Philosopher's Stone",
    tagline: "",
    overview: "N/A",
    release: "N/A",
    genre: ["N/A"],
    cast: ["N/A"],
    crew: ["N/A"],
    poster: "",
    runtime: "",
    revenue: "",
    production_companies: ["N/A"],
  },
  {
    id: 5,
    title: "Dune part 2",
    tagline: "",
    overview: "N/A",
    release: "N/A",
    genre: ["N/A"],
    cast: ["N/A"],
    crew: ["N/A"],
    poster: "",
    runtime: "",
    revenue: "",
    production_companies: ["N/A"],
  },
];

movies.push({
  id: 0,
  title: "Placeholder",
  tagline: "",
  overview: "N/A",
  release: "N/A",
  genre: ["N/A"],
  cast: ["N/A"],
  crew: ["N/A"],
  poster:
    "https://www.themoviedb.org/t/p/original/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
  runtime: "",
  revenue: "",
  production_companies: ["N/A"],
});

const MovieList = () => {
  const [translateX] = useState(new Animated.Value(0)); // Horizontal movement
  const [translateY] = useState(new Animated.Value(0)); // Vertical movement

  const [currentIndex, setCurrentIndex] = useState(0);
  const [movieData, setMovieData] = useState<any[]>([]); // To store preloaded movie data

  // Preload all movie data when the app starts
  useEffect(() => {
    const loadAllMovies = async () => {
      const allMovies = await Promise.all(
        movies.map(async (movie) => {
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
              poster: details.poster_path || "",
              runtime: details.runtime || "N/A",
              revenue: details.revenue || "N/A",
              production_companies: details.production_companies || "N/A",
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
      // Update current index after swipe animation finishes
      nextMovie({ direction: "left" });
      resetPosition(); // Reset the position of the card
    });
  };

  const restart = () => {
    setCurrentIndex(0);
  };

  if (movieData.length === 0) {
    return null;
  }

  const currentMovie = movieData[currentIndex];

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={restart}>
        <Text style={{color: "white", fontSize: 30, fontWeight: "bold"}}>Restart List</Text>
      </TouchableOpacity> */}
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
              uri: `https://media.themoviedb.org/t/p/original${currentMovie.poster}`,
            }}
            style={styles.poster}
          />
        </Animated.View>
      </PanGestureHandler>

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
    padding: 30,
    backgroundColor: "#2c2b3f",
    borderRadius: 10,
    alignItems: "center",
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
});

export default MovieList;
