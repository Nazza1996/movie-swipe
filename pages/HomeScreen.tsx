import { View, StyleSheet } from "react-native";
import MovieList from "@/components/MovieList";
import Header from "@/components/Header";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {


  return (
    <View style={styles.container}>
      <Header />
      <MovieList />
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
    height: "100%",
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

export default HomeScreen;