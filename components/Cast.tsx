import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { ItemLayout } from 'react-native-reanimated-carousel/lib/typescript/components/ItemLayout';

const castData = [
  {
    id: 1,
    name: 'Emma Stone',
    character: 'Mia Dolan',
    image: 'https://i.pravatar.cc/300?img=1',
  },
  {
    id: 2,
    name: 'Ryan Gosling',
    character: 'Sebastian Wilder',
    image: 'https://i.pravatar.cc/300?img=13',
  },
  {
    id: 3,
    name: 'John Legend',
    character: 'Keith',
    image: 'https://i.pravatar.cc/300?img=12',
  },
  {
    id: 4,
    name: 'Rosemarie DeWitt',
    character: 'Laura',
    image: 'https://i.pravatar.cc/300?img=5',
  },
  {
    id: 5,
    name: 'J.K. Simmons',
    character: 'Bill',
    image: 'https://i.pravatar.cc/300?img=33',
  },
  {
    id: 6,
    name: 'Finn Wittrock',
    character: 'Greg',
    image: 'https://i.pravatar.cc/300?img=52',
  },
  {
    id: 7,
    name: 'Jessica Rothe',
    character: 'Alexis',
    image: 'https://i.pravatar.cc/300?img=47',
  },
  {
    id: 8,
    name: 'Sonoya Mizuno',
    character: 'Caitlin',
    image: 'https://i.pravatar.cc/300?img=23',
  },
  {
    id: 9,
    name: 'Callie Hernandez',
    character: 'Tracy',
    image: 'https://i.pravatar.cc/300?img=24',
  },
  {
    id: 10,
    name: 'Tom Everett Scott',
    character: 'David',
    image: 'https://i.pravatar.cc/300?img=59',
  },
];
export default function Cast({ casts, navigation }: any) {
  return (
    <View className="my-6">
      <Text className="mx-4 mb-5 text-lg text-white"> Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {casts &&
          castData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Person', item)}
                key={index}
                className=" w-24 items-center">
                <View className="h-20 w-20 items-center overflow-hidden rounded-full border border-neutral-500">
                  <Image source={{ uri: item.image }} className="h-24 w-full rounded-2xl" />
                </View>
                <Text numberOfLines={1} className="mt-1 text-xs text-white">
                  {item.character}
                </Text>
                <Text numberOfLines={1} className="mt-1 text-xs text-neutral-400">
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
