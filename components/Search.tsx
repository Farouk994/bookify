import icons from '@/constants/icons';
import { useLocalSearchParams, usePathname } from 'expo-router';
import { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react'

const Search = () => {
  // modify search parameters
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, seSearch] = useState(params.query);

  // const debouncedSearch = useDebouncedCallback((text:string)=>router.setParams({query:text}), 500);
  const handleSearch = (text: string) => {
    seSearch(text);
    // debouncedSearch(text);
  };
  return (
    <View className='flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 bg-primary-100 border border-primary-200 mt-5 py-2'>
      <View className='flex-1 flex flex-row items-center justify-start z-50'>
        <Image source={icons.search} className='size-5' tintColor={'#0061ff'} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder='Search for anything'
          className='text-sm font-rubik text-black-300 ml-2 flex-1'
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className='size-5' tintColor={'#0061ff'} />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
