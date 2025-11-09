import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { styles } from 'theme';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function MovieList({ data, title, hideSeeAll = false }: any) {
  const dataValues = [
    { id: 1, uri: 'https://picsum.photos/id/1018/800/600', name: 'lorem ipsum222 ksla;j' },
    { id: 2, uri: 'https://picsum.photos/id/1015/800/600', name: 'lorem ipsum' },
    { id: 3, uri: 'https://picsum.photos/id/1025/800/600', name: 'lorem ipsum' },
    { id: 4, uri: 'https://picsum.photos/id/1035/800/600', name: 'lorem ipsum' },
    { id: 5, uri: 'https://picsum.photos/id/1043/800/600', name: 'lorem ipsum' },
  ];
  const navigation = useNavigation<any>();
  const handleClick = (item: any) => {
    navigation.push('Movie', item);
    //console.log(item);
  };
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 mb-3 flex-row items-center justify-between">
        <Text className="text-xl text-white">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {dataValues.map((item, index) => {
          return (
            <TouchableWithoutFeedback key={index} onPress={() => handleClick(item)}>
              <View style={{ width: width * 0.33 }} className="mr-4 space-y-1">
                <Image
                  source={{ uri: item.uri }}
                  className="rounded-3xl"
                  style={{ width: '100%', height: height * 0.22 }}
                />
                <Text numberOfLines={1} className="ml-1 text-neutral-300">
                  {item.name}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
