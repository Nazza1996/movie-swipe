import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollViewInstance } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheet from '@gorhom/bottom-sheet';

import Cast from "@/components/Cast";

const snapPoints = [150, '60%', 700];

function formatDateString(date: string) {
  return new Date(date).toDateString().split(" ").slice(1).join(" ");
}

function minutesToHours(minutes: number) {
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
}

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const MovieDetails = ({ movie }: { movie: any }) => {
  if (movie.id === 0) {
    return null;

  } else {
    const panelRef = useRef<BottomSheet>(null); // Ref to control panel methods
    const [panelPosition, setPanelHeight] = useState(0);

    const togglePanel = async () => {
      if (panelPosition === snapPoints.length - 1) {
        panelRef.current?.collapse();
      } else {
        panelRef.current?.expand();
      }
    };
    
    const handlePanelDragEnd = (position: any) => {
      setPanelHeight(position);
    };

    const scrollViewRef = useRef<ScrollViewInstance>(null);
    useEffect(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [movie]);
    
    useEffect(() => {
      if (panelPosition === 0) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      }
    }, [panelPosition]);

    let genres = movie.genre.map((genre: any) => genre.name).join(", ");
    let directors = movie.crew.filter((crew: any) => crew.job === "Director").map((director: any) => director.name).join(", ") || "N/A";
    let production_companies = movie.production_companies.map((company: any) => company.name).join(", ");

    return (
      <View style={styles.container}>

        {/* Sliding Panel for movie details */}
        <BottomSheet
          ref={panelRef}
          enableDynamicSizing={false}
          snapPoints={snapPoints}
          onChange={handlePanelDragEnd}
          backgroundStyle={{ backgroundColor: "#2c2b3f" }}
          handleIndicatorStyle={{ backgroundColor: "#38374f" }}
          index={0}
        >

          <View style={styles.detailsContainer}>
            
            <TouchableOpacity onPress={togglePanel} activeOpacity={0.7}>
              <Text style={styles.movieName}>{movie.title}</Text>
            </TouchableOpacity>

            <Text style={styles.tagline}>{movie.tagline || ""}</Text>

            <ScrollView ref={scrollViewRef}>
              <Text style={styles.detailsTitle}>Overview</Text>
              <Text style={styles.detailsText}>{movie.overview}</Text>

              <Text style={styles.detailsTitle}>{movie.crew.filter((crew: any) => crew.job === "Director").length === 1 ? "Director" : "Directors"}</Text>
              <Text style={styles.detailsText}>{directors || "N/A"}</Text>

              <Text style={styles.detailsTitle}>Release Date</Text>
              <Text style={styles.detailsText}>{formatDateString(movie.release) || "N/A"}</Text>

              <Text style={styles.detailsTitle}>{movie.genre.length === 1 ? "Genre" : "Genres"}</Text>
              <Text style={styles.detailsText}>{genres || "N/A"}</Text>

              <Text style={styles.detailsTitle}>Runtime</Text>
              <Text style={styles.detailsText}>{minutesToHours(movie.runtime) || "N/A"}</Text>

              <Text style={styles.detailsTitle}>Revenue</Text>
              <Text style={styles.detailsText}>${formatNumber(movie.revenue) || "N/A"}</Text>

              <Text style={styles.detailsTitle}>Rating</Text>
              
              <View style={{flexDirection: "row"}}>
                <Image style={styles.ratingLogo} source={require('../assets/images/tmdbLogo.png')} />
                <Text style={styles.detailsText}>{(movie.vote_average*10).toFixed(0)}%</Text>
              </View>

              <Text style={styles.detailsTitle}>Top Billed Cast</Text>
              <Cast cast={movie.cast}></Cast>

              <Text style={styles.detailsTitle}>Production {movie.production_companies.length === 1 ? "Company" : "Companies"}</Text>
              <Text style={styles.detailsText}>{production_companies || "N/A"}</Text>
            </ScrollView>
          </View>

        </BottomSheet>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  movieName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    fontVariant: ["small-caps"], // Make text look weird and cool
    alignSelf: "flex-start",
    // marginBottom: 50,
    marginTop: -20,
    // backgroundColor: "#ffffff",
  },
  tagline: {
    color: "#fff",
    fontSize: 16,
    fontStyle: "italic",
    opacity: 0.7,
    fontFamily: "verdana",
    marginBottom: 30,
  },
  detailsContainer: {
    backgroundColor: "#2c2b3f",
    padding: 20,
    paddingBottom: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    elevation: 5,
    position: "absolute",
    height: snapPoints[2], // Set the height to the maximum snap point
  },
  detailsTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontVariant: ["small-caps"],
    marginBottom: 10,
    marginTop: 20,
  },
  detailsText: {
    color: "#fff",
    fontSize: 16,
  },
  ratingLogo: {
    width: 37,
    height: 26,
    marginBottom: 10,
    marginRight: 10,
  },
  backdrop: {
    left: 0,
    width: "100%",
    height: 717.2,
  },
});

export default MovieDetails;
