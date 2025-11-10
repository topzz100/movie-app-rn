// import { View, Image, Dimensions } from 'react-native';
// import React from 'react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
// import Carousel from 'react-native-reanimated-carousel';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// // Main item width is almost the full screen
// const ITEM_WIDTH = SCREEN_WIDTH;
// const ITEM_HEIGHT = ITEM_WIDTH * 0.6; // adjust as needed for aspect ratio

// const dataValues = [
//   { id: 1, uri: 'https://picsum.photos/id/1018/800/600' },
//   { id: 2, uri: 'https://picsum.photos/id/1015/800/600' },
//   { id: 3, uri: 'https://picsum.photos/id/1025/800/600' },
//   { id: 4, uri: 'https://picsum.photos/id/1035/800/600' },
//   { id: 5, uri: 'https://picsum.photos/id/1043/800/600' },
// ];

// const TrendingMovies = () => {
//   return (
//     <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
//       <View style={{ flex: 1, justifyContent: 'center' }}>
//         <Carousel
//           loop
//           width={SCREEN_WIDTH} // total carousel width
//           height={ITEM_HEIGHT} // height of items
//           data={dataValues}
//           mode="parallax" // center main item + previews
//           snapEnabled
//           modeConfig={{
//             parallaxScrollingScale: 0.9, // scale of side items
//             parallaxScrollingOffset: 20, // amount of previous/next visible
//           }}
//           renderItem={({ item, animationValue }) => {
//             const animatedStyle = useAnimatedStyle(() => {
//               const scale = interpolate(animationValue.value, [-1, 0, 1], [0.85, 1, 0.85]);
//               const opacity = interpolate(animationValue.value, [-1, 0, 1], [0.6, 1, 0.6]);
//               return { transform: [{ scale }], opacity };
//             });

//             return (
//               <Animated.View
//                 style={[
//                   {
//                     borderRadius: 16,
//                     overflow: 'hidden',
//                     width: ITEM_WIDTH,
//                     height: ITEM_HEIGHT,
//                     //backgroundColor: '#111',
//                     backgroundColor: 'red',
//                   },
//                   animatedStyle,
//                 ]}>
//                 <Image
//                   source={{ uri: item.uri }}
//                   style={{ width: '100%', height: '100%' }}
//                   resizeMode="cover"
//                 />
//               </Animated.View>
//             );
//           }}
//         />
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// export default TrendingMovies;

import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from 'api/moviedb';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Make item width smaller than screen width to show peek
const ITEM_WIDTH = SCREEN_WIDTH * 0.65; // 80% of screen width
const ITEM_HEIGHT = ITEM_WIDTH * 1.5; // adjust as needed for aspect ratio

const dataValues = [
  { id: 1, uri: 'https://picsum.photos/id/1018/800/600' },
  { id: 2, uri: 'https://picsum.photos/id/1015/800/600' },
  { id: 3, uri: 'https://picsum.photos/id/1025/800/600' },
  { id: 4, uri: 'https://picsum.photos/id/1035/800/600' },
  { id: 5, uri: 'https://picsum.photos/id/1043/800/600' },
];

const TrendingMovies = ({ data }: any) => {
  const navigation = useNavigation<any>();
  const handleClick = (item: any) => {
    navigation.navigate('Movie', item);
    //console.log(item);
  };
  return (
    <View className="mb-8">
      <Text className="mx-4 mb-4 text-xl text-white">Trending</Text>
      <View style={{}}>
        <Carousel
          //loop
          width={SCREEN_WIDTH} // Full screen width for carousel
          height={ITEM_HEIGHT}
          data={data}
          mode="parallax"
          snapEnabled
          style={{ height: ITEM_HEIGHT }} // Force fixed height
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 120,
          }}
          renderItem={({ item, animationValue }: any) => {
            const animatedStyle = useAnimatedStyle(() => {
              const scale = interpolate(animationValue.value, [-1, 0, 1], [0.85, 1, 0.85]);
              const opacity = interpolate(animationValue.value, [-1, 0, 1], [0.6, 1, 0.6]);
              return { transform: [{ scale }], opacity };
            });
            //console.log(item.poster_path, 'path');

            return (
              <Pressable
                onPress={() => handleClick(item)}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: ITEM_HEIGHT,
                }}>
                <Animated.View
                  style={[
                    {
                      borderRadius: 16,
                      overflow: 'hidden',
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      backgroundColor: '#111',
                    },
                    animatedStyle,
                  ]}>
                  {image500(item.poster_path) ? (
                    <Image
                      source={{ uri: image500(item?.poster_path) }}
                      className="rounded-3xl"
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                    />
                  ) : null}
                </Animated.View>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

export default TrendingMovies;
