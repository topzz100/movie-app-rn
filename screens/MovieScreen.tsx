import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from 'theme';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from 'components/Cast';
import MovieList from 'components/MovieList';
import { HeartIcon } from 'react-native-heroicons/solid';
import Loading from 'components/Loading';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from 'api/moviedb';

const { width, height } = Dimensions.get('window');
export default function MovieScreen() {
  const { params: item } = useRoute<any>();
  const navigation = useNavigation<any>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [casts, setCasts] = useState();
  const [similar, setSimilar] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<any>({});
  useEffect(() => {
    //call the movie details api
    console.log(item?.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id: any) => {
    const data = await fetchMovieDetails(id);
    // console.log(data, 'data res');
    data && setMovie(data);
    setLoading(false);
  };
  const getMovieCredits = async (id: any) => {
    const data = await fetchMovieCredits(id);
    // console.log(data, 'data casts');
    data && data.cast && setCasts(data.cast);
    setLoading(false);
  };

  const getSimilarMovies = async (id: any) => {
    const data = await fetchSimilarMovies(id);
    //console.log(data, 'data casts');
    data && data.results && setSimilar(data.results);
    setLoading(false);
  };
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
      {/* back button movie poster */}

      <SafeAreaView className="absolute z-20 w-full flex-row items-center justify-between px-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1">
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? theme.background : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <View className="w-full">
          <View>
            <Image
              source={{ uri: image500(movie?.poster_path) }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23, 23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>

          <View style={{ marginTop: -height * 0.09 }} className="gap-3 ">
            {/* title*/}
            <Text className="text-center text-3xl font-bold tracking-wider text-white">
              {movie?.title}
            </Text>
            {/* status, release runtime */}
            <Text className="text-center text-base font-semibold text-neutral-400">
              {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
            </Text>
            {/* genres */}
            <View className="mx-4 flex-row justify-center space-x-2">
              {movie?.genres &&
                movie?.genres?.map((genre: any, index: any) => {
                  const showDot = index + 1 !== movie.genres.length;
                  return (
                    <Text
                      key={index}
                      className="text-center text-base font-semibold text-neutral-400">
                      {genre.name} {showDot && `•`}{' '}
                    </Text>
                  );
                })}
              {/* <Text className="text-center text-base font-semibold text-neutral-400">
                Thrill •{' '}
              </Text>
              <Text className="text-center text-base font-semibold text-neutral-400">Comedy </Text> */}
            </View>
            {/* description */}
            <Text className="mx-4 tracking-wide text-neutral-400">{movie?.overview}</Text>
          </View>

          {/* Casts */}
          <Cast casts={casts} navigation={navigation} />

          {/* Similar movies */}
          <MovieList data={similar} title="Similar Movies" hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
}
