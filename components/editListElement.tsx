import { View, Text, StyleSheet, Image, PanResponder, TouchableOpacity, Animated } from "react-native";

const EditListElement = ({movie, swapList}: {movie: any, swapList: ({ id }: { id: number }) => void}) => {
    
    return (

        <View style={styles.container}>
                <View style={styles.item}>
                    <Image style={styles.poster} source={{uri: movie.backdrop}} />
                    <View style={styles.bottomPanel}>
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                        <Text style={styles.tagline}>{movie.tagline}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {swapList(movie)}}>
                    <Image source={movie.status === "liked" ? require("@/assets/images/heart.png") : require("@/assets/images/broken-heart.png")} style={styles.editListButton}></Image>
                </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    item: {
        flex: 1,
        backgroundColor: "#2c2b3f",
        margin: 10,
        borderRadius: 10,
        flexDirection: "column",
    },
    listTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        left: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    poster: {
        width: "95%",
        height: 150,
        borderRadius: 10,
        margin: 10,
    },
    bottomPanel: {
        flex: 1,
        padding: 10,
        paddingTop: 0,
    },
    movieTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        fontVariant: ["small-caps"],
    },
    tagline: {
        color: "#fff",
        fontSize: 14,
        fontStyle: "italic",
    },
    editListButton: {
        width: 40,
        height: 40,
        position: "absolute",
        right: 20,
        bottom: 20,
        borderRadius: 10,
        tintColor: "#9c1e1e",
    },
})

export default EditListElement;