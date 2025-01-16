import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import images from '@/constants/images';
import icons from '@/constants/icons';
import { Models } from 'react-native-appwrite';

interface Props {
  onPress?: () => void;
  item: Models.Document;
}

const FeaturedCard = ({
  item: { rating, name, image, address, price },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='flex-col items-start w-60 h-80 relative'
    >
      <Image source={{ uri: image }} className='size-full rounded-2xl' />
      <Image
        source={images.cardGradient}
        className='size-full rounded-2xl absolute bottom-0'
      />
      <View
        className='flex flex-row items-center absolute p-1 right-5 top-5 bg-white/90 px-2 py-1.5 rounded-full'
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparent white
        }}
      >
        <Image source={icons.star} className='size-3.5' />
        <Text className='text-xs font-rubik-bold text-primary-300 ml-1'>
          {rating}
        </Text>
      </View>
      <View className='flex flex-col items-start absolute bottom-5 inset-x-5'>
        <Text
          className='text-xl font-rubik-extrabold text-white'
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className='text-base text-white font-rubik'>{address}</Text>
        <View className='flex flex-row items-center justify-between w-full'>
          <Text
            className='text-xl font-rubik-extrabold text-white'
            style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 'bold' }}
          >
            ${price}
          </Text>
          <Image source={icons.heart} className='size-4' />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedCard;
