import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { fetchPerson, fetchPersonImage } from "@/services/tmdb";

const CastPoster = ({ person }: {person: any}) => {
    const [personImage, setPersonImage] = useState("https://www.huber-online.com/daisy_website_files/_processed_/8/0/csm_no-image_d5c4ab1322.jpg");

    const getPerson = async () => {
        setPersonImage(await fetchPersonImage(person.id));
    };

    useEffect(() => {
        getPerson();
    }, [person]);

    return (
        <View style={styles.posterCard}>
            <Image style={styles.poster} source={{uri: personImage}}>
            </Image>
            <Text style={styles.name}>{person.name}</Text>
            <Text style={styles.characterName}>{person.character}</Text>
        </View>
    );
};

const POSTER_WIDTH = 150;
const POSTER_HEIGHT = (POSTER_WIDTH / 6) * 9;

const styles = StyleSheet.create({
    posterCard: {
        flex: 1,
        alignItems: "center",
        marginRight: 10,
    },
    poster: {
        width: POSTER_WIDTH,
        height: POSTER_HEIGHT,
        borderRadius: 10,
    },
    name: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
        width: POSTER_WIDTH,
    },
    characterName: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
        marginTop: 3,
        fontStyle: "italic",
        opacity: 0.7,
        width: POSTER_WIDTH,
    }
});

export default CastPoster;