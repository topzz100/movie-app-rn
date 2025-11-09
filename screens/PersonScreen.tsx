import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { styles, theme } from 'theme';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from 'components/MovieList';

const data = {
  id: 1,
  name: 'Emma Stone',
  character: 'Mia Dolan',
  image: 'https://i.pravatar.cc/300?img=1',
};

const { width, height } = Dimensions.get('window');

export default function PersonScreen() {
  const navigation = useNavigation<any>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [movies, setMovies] = useState([1, 2, 3]);

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
                source={{ uri: data.image }}
                style={{
                  height: height * 0.43,
                  width: width * 0.74,
                }}
              />
            </View>
          </View>
        </View>
        <View className="mt-6">
          <Text className="text-center text-3xl font-bold text-white">{data.name}</Text>
          <Text className="text-center text-base text-neutral-500">London, United Kingdom</Text>
        </View>
        <View className="mx-3 mt-6 flex-row items-center justify-center rounded-full bg-neutral-700 p-4 ">
          <View className="items-center border-r-2 border-r-neutral-400 px-2">
            <Text className="font-semibold text-white">Gender</Text>
            <Text className="text-sm text-neutral-300">Male</Text>
          </View>
          <View className="items-center border-r-2 border-r-neutral-400 px-2">
            <Text className="font-semibold text-white">Birthday</Text>
            <Text className="text-sm text-neutral-300">1994-09-02</Text>
          </View>
          <View className="items-center border-r-2 border-r-neutral-400 px-2">
            <Text className="font-semibold text-white">Known for</Text>
            <Text className="text-sm text-neutral-300">Acting</Text>
          </View>
          <View className="items-center  border-r-neutral-400 px-2">
            <Text className="font-semibold text-white">Popularity</Text>
            <Text className="text-sm text-neutral-300">64.23</Text>
          </View>
        </View>
        <View className="mx-4 my-6 gap-2">
          <Text className="text-lg text-white">Biography</Text>
          <Text className="tracking-wide text-neutral-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem nesciunt reiciendis
            accusantium culpa voluptates labore consectetur repudiandae rem, adipisci aperiam
            necessitatibus cupiditate, commodi voluptatum pariatur perspiciatis atque nulla
            deserunt? Ex ipsum exercitationem possimus sapiente provident praesentium error, iure
            maiores animi ab quod inventore natus eveniet. Magnam reiciendis magni laudantium quae
            quo voluptates commodi saepe amet animi eaque officiis soluta qui ullam omnis quod sequi
            voluptatum, quis obcaecati iste velit? Reiciendis qui perferendis aspernatur
            necessitatibus ad earum tempora, dolores repellendus eos.
          </Text>
        </View>
        <MovieList title={'Movies'} hideSeeAll={true} data={movies} />
      </View>
    </ScrollView>
  );
}
