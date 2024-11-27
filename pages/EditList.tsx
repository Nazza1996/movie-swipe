import { RootStackParamList } from "@/app";
import { RouteProp } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import EditListElement from "@/components/editListElement";
import { useState } from "react";

type EditListRouteProp = RouteProp<RootStackParamList, 'EditList'>;

const EditList = ({ route }: {route: EditListRouteProp}) => {

    const [likedList, setLikedList] = useState(route.params.likedList);
    const [dislikedList, setDislikedList] = useState(route.params.dislikedList);

    const swapList = ({ id }: { id: number }) => {
        if (likedList.find((movie: any) => movie.id === id)) {
            // Movie to disliked list
            const movieToDislike = likedList.find((movie: any) => movie.id === id);
            const updatedMovie = { ...movieToDislike, status: "disliked" };
            setLikedList(likedList.filter((movie: any) => movie.id !== id));
            setDislikedList([...dislikedList, updatedMovie]);
        } else {
            // Movie to liked list
            const movieToLike = dislikedList.find((movie: any) => movie.id === id);
            const updatedMovie = { ...movieToLike, status: "liked" };
            setDislikedList(dislikedList.filter((movie: any) => movie.id !== id));
            setLikedList([...likedList, updatedMovie]);
        }
    };

    return (
        <View style={styles.container}>

            <ScrollView>

                <Text style={styles.listTitle}>Liked Movies</Text>
                {likedList.map((movie: any, index: number) => {
                    return <EditListElement key={index} movie={movie} swapList={swapList}/>
                })}

                <Text style={styles.listTitle}>Disliked Movies</Text>
                {dislikedList.map((movie: any, index: number) => {
                    return <EditListElement key={index} movie={movie} swapList={swapList}/>
                })}

            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#38374f",
    },
    listTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        left: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    likedListScrollView: {
        width: "100%",
    },
    dislikedListScrollView: {
        width: "100%",
    }
})

export default EditList;