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

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.75;
const ITEM_HEIGHT = ITEM_WIDTH * 0.65;
const ITEM_GAP = 10;

export default function HomeScreen() {
  // const [trending, setTrending] = useState([1, 2, 3]);
  const dataValues = [
    { id: 1, uri: 'https://picsum.photos/id/1018/800/600' },
    { id: 2, uri: 'https://picsum.photos/id/1015/800/600' },
    { id: 3, uri: 'https://picsum.photos/id/1025/800/600' },
    { id: 4, uri: 'https://picsum.photos/id/1035/800/600' },
    { id: 5, uri: 'https://picsum.photos/id/1043/800/600' },
  ];
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="mb-3">
        <StatusBar style="light" />
        <View className="mx-4 flex-row items-center justify-between">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-3xl font-bold text-white">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}>
        {/* Trending movies carousel */}
        <TrendingMovies data={[1, 2, 3]} />
      </ScrollView>
    </View>
  );
}
