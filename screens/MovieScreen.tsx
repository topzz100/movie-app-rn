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

const { width, height } = Dimensions.get('window');
export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation<any>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [casts, setCasts] = useState([1, 2, 3]);
  const [similar, setSimilar] = useState([1, 2, 3]);

  useEffect(() => {
    //call the movie details api
  }, [item]);
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
      {/* back button movie poster */}
      <View className="w-full">
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
        <View>
          <Image
            source={{ uri: 'https://picsum.photos/id/1018/800/600' }}
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
      </View>

      <View style={{ marginTop: -height * 0.09 }} className="gap-3 ">
        {/* title*/}
        <Text className="text-center text-3xl font-bold tracking-wider text-white">
          Ant-Man and the Wasp: Quantumania
        </Text>
        {/* status, release runtime */}
        <Text className="text-center text-base font-semibold text-neutral-400">
          Release • 2020 • 170min{' '}
        </Text>
        {/* genres */}
        <View className="mx-4 flex-row justify-center space-x-2">
          <Text className="text-center text-base font-semibold text-neutral-400">Action • </Text>
          <Text className="text-center text-base font-semibold text-neutral-400">Thrill • </Text>
          <Text className="text-center text-base font-semibold text-neutral-400">Comedy </Text>
        </View>
        {/* description */}
        <Text className="mx-4 tracking-wide text-neutral-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt laboriosam velit,
          quidem neque consequatur recusandae ipsa vel suscipit totam soluta vitae nam numquam iste
          tenetur voluptatem explicabo, deleniti doloremque molestiae iusto cumque quibusdam qui?
          Adipisci accusamus corrupti praesentium iusto corporis harum nisi nesciunt numquam fugiat
          recusandae dolore, nobis deleniti facere.
        </Text>
      </View>

      {/* Casts */}
      <Cast casts={casts} navigation={navigation} />

      {/* Similar movies */}
      <MovieList data={similar} title="Similar Movies" hideSeeAll={true} />
    </ScrollView>
  );
}
