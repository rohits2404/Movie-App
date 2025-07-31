const API_KEY = '36c5bf4e';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<any> => {
    try {
        const response = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}&type=movie`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

export const getMovieDetails = async (imdbID: string): Promise<any> => {
    try {
        const response = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};