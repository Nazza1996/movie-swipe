import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";

const MovieDetails = ({ movieTitle }: { movieTitle: String }) => {
  const panelRef = useRef<any>(null); // Ref to control panel methods
  const [panelState, setPanelState] = useState("closed");

  const togglePanel = () => {
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
    if (event < 100) {
        setPanelState("closed");
    } else {
        setPanelState("open");
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Sliding Panel for movie details */}
      <SlidingUpPanel
        ref={panelRef} // Assigning the ref to control it programmatically
        draggableRange={{ top: 600, bottom: 30 }} // Set how far the panel can slide
        snappingPoints={[30, 300, 600]} // Points where the panel will snap to
        height={600} // Maximum height of the panel
        backdropOpacity={0.3} // Set backdrop opacity for the area outside the panel
        onMomentumDragEnd={handlePanelDragEnd} // Handle drag end event
      >
        <View style={styles.detailsContainer}>
          <TouchableOpacity onPress={togglePanel}><Text style={styles.movieName}>{movieTitle}</Text></TouchableOpacity>
          <Text style={styles.detailsText}>Director: John Doe</Text>
          <Text style={styles.detailsText}>Year: 2021</Text>
          <Text style={styles.detailsText}>Genre: Action</Text>
        </View>
      </SlidingUpPanel>
    </View>
  );
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
  },
  detailsContainer: {
    backgroundColor: "#2c2b3f",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    elevation: 5,
    position: "absolute",
    bottom: 0,
  },
  detailsTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  detailsText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 50,
    height: 150,
  },
});

export default MovieDetails;
