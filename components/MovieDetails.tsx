import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import SlidingUpPanel from "rn-sliding-up-panel";
import Cast from "@/components/Cast";

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
    const panelRef = useRef<any>(null); // Ref to control panel methods
    const [panelState, setPanelState] = useState("closed");

    const togglePanel = async () => {
      if (panelRef.current) {
        if (panelState === "closed") {
          panelRef.current.show();
          setPanelState("open");
        } else {
          panelRef.current.hide();
          setPanelState("closed");
        }
      }
    };

    const handlePanelDragEnd = (event: any) => {
      if (event < 200) {
        setPanelState("closed");
      } else {
        setPanelState("open");
      }
    };

    const scrollViewRef = useRef<ScrollView>(null);
    useEffect(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [movie]);

    let genres = movie.genre.map((genre: any) => genre.name).join(", ");
    let directors = movie.crew.filter((crew: any) => crew.job === "Director").map((director: any) => director.name).join(", ") || "N/A";
    let production_companies = movie.production_companies.map((company: any) => company.name).join(", ");

    return (
      <View style={styles.container}>
        {/* Sliding Panel for movie details */}
        <SlidingUpPanel
          ref={panelRef} // Assigning the ref to control it programmatically
          draggableRange={{ top: 700, bottom: 150 }} // Set how far the panel can slide
          snappingPoints={[30, 450, 700]} // Points where the panel will snap to
          height={700} // Maximum height of the panel
          backdropOpacity={0.3} // Set backdrop opacity for the area outside the panel
          onMomentumDragEnd={handlePanelDragEnd} // Handle drag end event
          friction={3.5} // Set friction for the panel
        >

          {dragHandler => (
          <View style={styles.detailsContainer}>

            <View style={styles.dragHandler} {...dragHandler}>
              <View style={styles.touchBarIcon} />
            </View>
            <View style={styles.dragHandler2} {...dragHandler} />

            <TouchableOpacity onPress={togglePanel}>
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
          )}

        </SlidingUpPanel>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 100,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    elevation: 5,
    position: "absolute",
    height: 700,
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
  dragHandler: {
    height: 40,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    top: -20,
    left: -20,
  },
  dragHandler2: {
    height: 100,
    width: "30%",
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  ratingLogo: {
    width: 37,
    height: 26,
    marginBottom: 10,
    marginRight: 10,
  },
  touchBarIcon: {
    width: "90%",
    height: 5,
    backgroundColor: "#38374f",
    borderRadius: 5,
    position: "absolute",
    left: "50%",
    marginLeft: "-40%",
  },
});

export default MovieDetails;
