import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Animated, Dimensions } from "react-native";
import { GestureHandlerStateChangeEvent, PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import MovieDetails from "../components/MovieDetails";
import MovieList from "../components/MovieList";

export default function Index() {
  const [translateX] = useState(new Animated.Value(0)); // Horizontal movement
  const [translateY] = useState(new Animated.Value(0)); // Vertical movement

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event: GestureHandlerStateChangeEvent) => {
    const { translationX } = event.nativeEvent as any;

    if (translationX > 100) {
      console.log("Liked the movie!");
      swipeRight();
    } else if (translationX < -100) {
      console.log("Skipped the movie!");
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

  const swipeRight = () => {
      Animated.timing(translateX, {
        toValue: Dimensions.get("window").width + 1000,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        resetPosition();
      });
  }

  const swipeLeft = () => {
      Animated.timing(translateX, {
        toValue: Dimensions.get("window").width * -1 - 1000,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
      resetPosition();
    });
  }

  return (
    <View style={styles.container}>
      <MovieList />
    </View>
  );
}

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
  }
});
