import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const SearchResultElement = ({ result }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: `https://media.themoviedb.org/t/p/original${result.poster_path}`}}></Image>
            <View style={styles.sideText}>
                <Text style={styles.title}>{result.title}</Text>
                <Text style={styles.overview}>{result.overview}</Text>
            </View>
            <Image style={styles.plusIcon} source={require("@/assets/images/x-icon.png")}></Image>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2c2b3f',
        width: '90%',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignSelf: 'center',
        flexDirection: 'row',
        minHeight: 210,
        paddingBottom: 50,
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 5,
        top: "50%",
        marginTop: -75,
    },
    sideText: {
        // position: 'absolute',
        left: 10,
        width: 220,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        fontVariant: ['small-caps'],
    },
    overview: {
        color: 'white',
    },
    plusIconContainer: {
        backgroundColor: 'white',
        // width: "100%",
        // height: "10%",
        // alignItems: 'center',
    },
    plusIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        bottom: 15,
        left: "50%",
        marginLeft: -10,
    }
});

export default SearchResultElement;