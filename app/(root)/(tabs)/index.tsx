import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import Search from '@/components/Search';
import { useAppwrite } from '@/lib/useAppwrite';
import { useGlobalContext } from '@/lib/global-provider';
import FeaturedCard from '@/components/FeaturedCard';
import { Card } from '@/components/Card';
import Filters from '@/components/Filters';
import seed from '@/lib/seed';
import { getLatestProperties, getProperties } from '@/lib/appwrite';
import NoResults from '@/components/NoResults';
import { Models } from 'react-native-appwrite';

type Property = Models.Document & {
  address: string;
  agent: any; // Replace `any` with the actual type of the agent object
  area: number;
  bathrooms: number;
  bedrooms: number;
  description: string;
  facilities: string[];
  gallery: string[];
  geolocation: string;
  image: string;
  name: string;
  price: number;
  rating: number;
  reviews: string[];
  type: string;
};

type LatestProperties = {
  documents: Property[];
  total: number;
};

const Home = () => {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
    console.log('latestProperties ===========>', latestProperties);
    // throw new Error('Stopping here for debugging');
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className='h-full bg-white'>
      {/* <Button title='Seed' onPress={seed} /> */}
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        numColumns={2}
        keyExtractor={(item) => item.toString()}
        contentContainerClassName='pb-32'
        columnWrapperClassName='flex gap-5 px-5'
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading
            ? () => (
                <ActivityIndicator
                  size='large'
                  className='text-primary-300 mt-5'
                />
              )
            : () => <NoResults />
        }
        ListHeaderComponent={
          <View className='px-5'>
            <View className='flex flex-row items-center justify-between mt-5'>
              <View className='flex flex-row'>
                <Image
                  source={{ uri: user?.avatar }}
                  className='size-12 rounded-full'
                />

                <View className='flex flex-col items-start ml-2 justify-center'>
                  <Text className='text-xs font-rubik text-black-100'>
                    Good Morning
                  </Text>
                  <Text className='text-base font-rubik-medium text-black-300'>
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className='size-6' />
            </View>
            <Search />
            <View className='my-5'>
              <View className='flex flex-row items-center justify-between'>
                <Text className='text-xl font-rubik-bold text-black-300'>
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className='text-base font-rubik-bold text-primary-300'>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {latestPropertiesLoading ? (
                <ActivityIndicator size='large' className='text-primary-300' />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties?.documents || []}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  // keyExtractor={(item) => item.$id()}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName='flex gap-5 mt-5'
                />
              )}
            </View>
            <View className='mt-5'>
              <View className='flex flex-row items-center justify-between'>
                <Text className='text-xl font-rubik-bold text-black-300'>
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className='text-base font-rubik-bold text-primary-300'>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
