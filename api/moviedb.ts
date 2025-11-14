import axios from "axios";
import {apiKey} from '../constants'


//endpoints
const baseUrl = `https://api.themoviedb.org/3`
const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day?language=en-US&api_key=${apiKey}`
const upcomingMoviesEndpoint = `${baseUrl}/movie/upcoming?language=en-US&api_key=${apiKey}`
const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated?language=en-US&api_key=${apiKey}`
const searchMoviesEndpoint = `${baseUrl}/search/movie?api_key=${apiKey}`

//dynamic endpoint
const movieDetailsEndpoint = (id: any) => `${baseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = (id: any) => `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = (id: any) => `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`

const personDetailsEndpoint = (id: any) => `${baseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = (id: any) => `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`


export const image500 = (path: any) => path? `https://image.tmdb.org/t/p/w500${path}`: 
null
export const image342 = (path: any) => path? `https://image.tmdb.org/t/p/w342${path}`: 
null
export const image185 = (path: any) => path? `https://image.tmdb.org/t/p/w185${path}`: 
null


const apiCall = async(endpoint: any, params=null) => {
    const options ={
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    }
    try{
        const response = await axios.request(options)
        return response.data;
    }catch(err: any){
        console.log('error', err)
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetails =(id: any) => {
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchMovieCredits =(id: any) => {
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies =(id: any) => {
    return apiCall(similarMoviesEndpoint(id))
}

export const fetchPersonDetails =(id: any) => {
    return apiCall(personDetailsEndpoint(id))
}
export const fetchPersonMovies =(id: any) => {
    return apiCall(personMoviesEndpoint(id))
}

export const searchMovies = (params: any) => {
    return apiCall(searchMoviesEndpoint, params)
}