import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from 'theme';
import TrendingMovies from 'components/TrendingMovies';
import Carousel from 'react-native-snap-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import MoviesList from 'components/MoviesList';
import MovieList from 'components/MovieList';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.75;
const ITEM_HEIGHT = ITEM_WIDTH * 0.65;
const ITEM_GAP = 10;

export default function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="mb-3">
        <StatusBar style="light" />
        <View className="mx-4 flex-row items-center justify-between">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-3xl font-bold text-white">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}>
        {/* Trending movies carousel */}
        <TrendingMovies data={trending} />

        {/* Upcoming movies */}
        <MovieList data={upcoming} title={'Upcoming'} />

        {/* Top rated Movies */}
        <MovieList data={topRated} title={'Top Rated'} />
      </ScrollView>
    </View>
  );
}
