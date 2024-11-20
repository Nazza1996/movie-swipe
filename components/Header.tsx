import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import SearchBar from "./SearchBar";
import { useNavigation } from "@react-navigation/native";

const Header = () => {

  return (
    <View style={styles.container}>
        <SearchBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2b3f",
    width: "100%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: "absolute",
    top: 0,
  },
  text: {
    color: "white",
    backgroundColor: "#38374f",
    padding: 10,
    borderRadius: 10,
    width: "70%",
    height: 50,
    position: "absolute",
    top: -20,
  }
});

export default Header;
