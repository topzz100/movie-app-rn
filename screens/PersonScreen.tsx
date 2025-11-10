import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles, theme } from 'theme';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from 'components/MovieList';
import Loading from 'components/Loading';
import { fetchPersonDetails, fetchPersonMovies, image342 } from 'api/moviedb';

const data = {
  id: 1,
  name: 'Emma Stone',
  character: 'Mia Dolan',
  image: 'https://i.pravatar.cc/300?img=1',
};

const { width, height } = Dimensions.get('window');

export default function PersonScreen() {
  const { params: item } = useRoute<any>();
  const navigation = useNavigation<any>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState<any>({});

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item?.id);
    getPersonMovies(item.id);
  }, []);

  const getPersonDetails = async (id: any) => {
    const data = await fetchPersonDetails(id);
    //console.log(data, 'res person');
    data && setPerson(data);
    setLoading(false);
  };

  const getPersonMovies = async (id: any) => {
    const data = await fetchPersonMovies(id);
    console.log(data, 'res data m');
    data && data.cast && setMovies(data.cast);
    setLoading(false);
  };

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
      {/* back buttom */}
      <SafeAreaView className=" w-full flex-row items-center justify-between px-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1">
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* perosn details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="mt-4 flex-row justify-center">
            {/* Outer container: handles the shadow */}
            <View
              style={{
                shadowColor: 'gray',
                shadowRadius: 40,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 1,
                elevation: 10,
                borderRadius: 100, // match inner radius
                // backgroundColor: '#111', // needed for Android shadow
              }}>
              {/* Inner container: handles rounded corners & clipping */}
              <View className="h-72 w-72 overflow-hidden rounded-full border-2 border-neutral-500">
                <Image
                  source={{ uri: image342(person?.profile_path) }}
                  style={{
                    height: height * 0.43,
                    width: width * 0.74,
                  }}
                />
              </View>
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-center text-3xl font-bold text-white">{person?.name}</Text>
            <Text className="text-center text-base text-neutral-500">{person?.place_of_birth}</Text>
          </View>
          <View className="mx-3 mt-6 flex-row items-center justify-center rounded-full bg-neutral-700 p-4 ">
            <View className="items-center border-r-2 border-r-neutral-400 px-2">
              <Text className="font-semibold text-white">Gender</Text>
              <Text className="text-sm text-neutral-300">
                {person.gender == 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View className="items-center border-r-2 border-r-neutral-400 px-2">
              <Text className="font-semibold text-white">Birthday</Text>
              <Text className="text-sm text-neutral-300">{person?.birthday}</Text>
            </View>
            <View className="items-center border-r-2 border-r-neutral-400 px-2">
              <Text className="font-semibold text-white">Known for</Text>
              <Text className="text-sm text-neutral-300">{person?.known_for_department}</Text>
            </View>
            <View className="items-center  border-r-neutral-400 px-2">
              <Text className="font-semibold text-white">Popularity</Text>
              <Text className="text-sm text-neutral-300">{person?.popularity?.toFixed(2)}</Text>
            </View>
          </View>
          <View className="mx-4 my-6 gap-2">
            <Text className="text-lg text-white">Biography</Text>
            <Text className="tracking-wide text-neutral-400">{person.biography || 'N/A'}</Text>
          </View>
          <MovieList title={'Movies'} hideSeeAll={true} data={movies} />
        </View>
      )}
    </ScrollView>
  );
}
