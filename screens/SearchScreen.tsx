import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from 'components/Loading';
import { debounce } from 'lodash';
import { image185, searchMovies } from 'api/moviedb';

const dataValues = [
  { id: 1, uri: 'https://picsum.photos/id/1018/800/600', name: 'lorem ipsum222 ksla;j' },
  { id: 2, uri: 'https://picsum.photos/id/1015/800/600', name: 'lorem ipsum' },
  { id: 3, uri: 'https://picsum.photos/id/1025/800/600', name: 'lorem ipsum' },
  { id: 4, uri: 'https://picsum.photos/id/1035/800/600', name: 'lorem ipsum' },
  { id: 5, uri: 'https://picsum.photos/id/1043/800/600', name: 'lorem ipsum' },
];
const { width, height } = Dimensions.get('window');
export default function SearchScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = (value: string) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({ query: value, include_adult: false, language: 'en-US', page: 1 }).then(
        (data) => {
          setLoading(false);
          console.log(data, 'movies');
          if (data && data.results) {
            setResults(data.results);
          }
        }
      );
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleSearchTextDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <View className="mx-4 mb-3 flex-row items-center justify-between rounded-full border border-neutral-500">
        <TextInput
          onChangeText={handleSearchTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          className="h-full flex-1 pl-6 text-base font-semibold tracking-wider text-white"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="m-1 rounded-full bg-neutral-500 p-3">
          <XMarkIcon size="25" color={'white'} />
        </TouchableOpacity>
      </View>
      {/* Results */}
      {loading ? (
        <Loading />
      ) : results?.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginHorizontal: 15 }}
          className="gap-3">
          <Text className="ml-1 font-semibold text-white">Results ({dataValues.length})</Text>
          <View className="mt-4 flex-row flex-wrap justify-between">
            {results.map((item: any, index: any) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate('Movie', item)}>
                  <View className="mb-4 space-y-2">
                    <Image
                      className="rounded-3xl"
                      source={{ uri: image185(item?.poster_path) }}
                      style={{ width: width * 0.44, height: height * 0.33 }}
                    />
                    <Text className="ml-1 text-neutral-300">{item?.title}</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className=" flex-1  items-center ">
          {/* <Image
            source={{
              uri: 'https://www.freepik.com/free-vector/hand-drawn-no-data-illustration_59563752.htm#fromView=keyword&page=2&position=4&uuid=3d30c427-d7b8-4819-83e9-a5377a98059e&query=Empty+data',
            }}
            className="h-40 w-40"
          /> */}
          <Text className="mt-[100] items-center text-white"> No data available</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
