import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import images from '@/constants/images';
import icons from '@/constants/icons';

interface Props {
  onPress?: () => void;
}

const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='flex-col items-start w-60 h-80 relative'
    >
      <Image source={images.japan} className='size-full rounded-2xl' />
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
          {/* {item.} */}
          4.4
        </Text>
      </View>
      <View
        className='flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5'
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparent white
        }}
      >
        <Image source={icons.star} className='size-3.5' />
        <Text className='text-xs font-rubik-bold text-primary-300 ml-1'>
          {/* {item.} */}
          4.4
        </Text>
      </View>
      <View className='flex flex-col items-start absolute bottom-5 inset-x-5'>
        <Text
          className='text-xl font-rubik-extrabold text-white'
          numberOfLines={1}
        >
          Modern Apartments
        </Text>
        <Text className='text-base text-white font-rubik'>
          200 Cartier Avenue, Ottawa, ON
        </Text>
        <View className='flex flex-row items-center justify-between w-full'>
          <Text
            className='text-xl font-rubik-extrabold text-white'
            style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 'bold' }}
          >
            $2,500
          </Text>
          <Image source={icons.heart} className='size-4' />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedCard;
