import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { RootStackParamList } from "@/app";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSearch = () => {
    if (search) {
        navigation.navigate('SearchResults', { search });
        setSearch("");
    }
  };

  return (
    <TextInput
      style={styles.text}
      placeholder="Search Movies..."
      placeholderTextColor={"#504f63"}
      value={search}
      onChangeText={(newText) => setSearch(newText)}
      onSubmitEditing={handleSearch}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    backgroundColor: "#38374f",
    padding: 10,
    borderRadius: 10,
    width: "70%",
    height: 50,
    top: 15,
  },
});

export default SearchBar;
