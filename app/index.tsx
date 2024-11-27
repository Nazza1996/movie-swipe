import React from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "@/pages/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchResults from "@/pages/SearchResults";
import EditList from "@/pages/EditList";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  SearchResults: { search: string };
  EditList: { likedList: any; dislikedList: any };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen 
        name="SearchResults" 
        component={SearchResults}
        options={{
          title: "Search Results",
          headerStyle: { backgroundColor: "#38374f" },
          headerTitleStyle: { color: "#fff" },
        }}
      />
      <RootStack.Screen 
        name="EditList" 
        component={EditList}
        options={{
          title: "Edit List",
          headerStyle: { backgroundColor: "#38374f" },
          headerTitleStyle: { color: "#fff" },
        }}
      />
    </RootStack.Navigator>
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
  },
});
