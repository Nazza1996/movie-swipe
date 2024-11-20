import axios from 'axios';

const API_KEY = "00e479d88a8e9e261de7e9681beec309";
const TMDB_API_URL = "https://api.themoviedb.org/3";

export const fetchMovieDetails = async (movieTitle) => {
    try {
        const searchResponse = await axios.get(`${TMDB_API_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: movieTitle
            },
        });

        const movie = searchResponse.data.results[0];
        if (!movie) {
            throw new Error("Movie not found");
        }

        const detailsResponse = await axios.get(`${TMDB_API_URL}/movie/${movie.id}`, {
            params: {
                api_key: API_KEY
            }
        });

        return detailsResponse;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchMovieCredits = async (movieTitle) => {
    try {

        const searchResponse = await axios.get(`${TMDB_API_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: movieTitle
            },
        });

        const movie = searchResponse.data.results[0];
        if (!movie) {
            throw new Error("Movie not found");
        }

        const creditsResponse = await axios.get(`${TMDB_API_URL}/movie/${movie.id}/credits`, {
            params: {
                api_key: API_KEY
            }
        });

        return creditsResponse;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchPerson = async (personId) => {
    try {
        const person = await axios.get(`${TMDB_API_URL}/person/${personId}`, {
            params: {
                api_key: API_KEY,
            },
        });

        if (!person) {
            throw new Error("Person not found");
        }

        return person.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchPersonImage = async (personId) => {
    try {
        const images = await axios.get(`${TMDB_API_URL}/person/${personId}/images`, {
            params: {
                api_key: API_KEY,
            },
        });

        if (!images) {
            throw new Error("Images not found");
        }

        try {
            return "https://image.tmdb.org/t/p/original" + images.data.profiles[0].file_path;
        } catch (error) {
            console.log("No images found for person with id " + personId + ". Using default image instead.");
            return "https://www.huber-online.com/daisy_website_files/_processed_/8/0/csm_no-image_d5c4ab1322.jpg";
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getPopularMovies = async () => {
    try {
        const popularMovies = await axios.get(`${TMDB_API_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
            },
        });

        if (!popularMovies) {
            throw new Error("Popular movies not found");
        }

        return popularMovies.data.results;

    } catch (error) {
        console.error(error);
        throw error;
    }
};