import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RootStackParamList } from "@/app";
import { RouteProp } from "@react-navigation/native";
import { multiSearch } from "@/services/tmdb";
import { useEffect, useState } from "react";
import SearchResultElement from "@/components/SearchResultElement";

type SearchResultsRouteProp = RouteProp<RootStackParamList, "SearchResults">;

const SearchResults = ({ route }: {route: SearchResultsRouteProp}) => {

    const search = route.params.search;
    const [searchResults, setSearchResults] = useState<any>([]);
    const filteredResults: any[] = [];

    const getSearchResults = async () => {
        // Fetch search results
        const results = await multiSearch(search);

        results.map(async (result: { title: any; poster_path: any; media_type: any; }) => {
            if (result.title && result.poster_path && result.media_type == "movie") {
                filteredResults.push(result);
            }
        });
        setSearchResults(filteredResults);
    };

    useEffect(() => {
        getSearchResults();
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search: "{search}"</Text>

            <ScrollView>
            {searchResults.map((result: any, index: number) => (
                <SearchResultElement key={index} result={result} />
            ))}
                
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#38374f",
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        left: 20,
        marginTop: 20,
        marginBottom: 10,
    },
});

export default SearchResults;