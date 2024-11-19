import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import SlidingUpPanel from "rn-sliding-up-panel";
import CastPoster from "@/components/castPoster";
import Cast from "@/components/Cast";

function formatDateString(date: string) {
  return new Date(date).toDateString().split(" ").slice(1).join(" ");
}

const MovieDetails = ({ movie }: { movie: any }) => {
  if (movie.id === 0) {
    return null;

  } else {
    const panelRef = useRef<any>(null); // Ref to control panel methods
    const [panelState, setPanelState] = useState("closed");
    const [isScrolling, setIsScrolling] = useState(false);

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

    const handleScrollBegin = () => setIsScrolling(true);
    const handleScrollEnd = () => setIsScrolling(false);

    let genres = movie.genre.map((genre: any) => genre.name).join(", ");
    let directors = movie.crew.filter((crew: any) => crew.job === "Director").map((director: any) => director.name).join(", ") || "N/A";

    return (
      <View style={styles.container}>
        {/* Sliding Panel for movie details */}
        <SlidingUpPanel
          ref={panelRef} // Assigning the ref to control it programmatically
          draggableRange={{ top: 700, bottom: 100 }} // Set how far the panel can slide
          snappingPoints={[30, 300, 700]} // Points where the panel will snap to
          height={700} // Maximum height of the panel
          backdropOpacity={0.3} // Set backdrop opacity for the area outside the panel
          onMomentumDragEnd={handlePanelDragEnd} // Handle drag end event
          allowDragging={!isScrolling} // Disable dragging if the user is scrolling
        >
          <View style={styles.detailsContainer}>
            <TouchableOpacity onPress={togglePanel}>
              <Text style={styles.movieName}>{movie.title}</Text>
            </TouchableOpacity>

            <Text style={styles.detailsTitle}>Director</Text>
            <Text style={styles.detailsText}>{directors || "N/A"}</Text>

            <Text style={styles.detailsTitle}>Release Date</Text>
            <Text style={styles.detailsText}>{formatDateString(movie.release) || "N/A"}</Text>

            <Text style={styles.detailsTitle}>Genre</Text>
            <Text style={styles.detailsText}>{genres || "N/A"}</Text>

            <Text style={styles.detailsTitle}>Cast</Text>
            <Cast cast={movie.cast} onScrollBegin={handleScrollBegin} onScrollEnd={handleScrollEnd}></Cast>
          </View>
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
  },
  movieName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    fontVariant: ["small-caps"], // Make text look weird and cool
    alignSelf: "flex-start",
    marginBottom: 20,
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
});

export default MovieDetails;
