import { View, Text, Image, TouchableOpacity, Touchable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import images from '@/constants/images';
import icons from '@/constants/icons';

export default function SignIn() {
  const handleLogin = () => {
    console.log('Login');
  };
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <SafeAreaView className='bg-white h-full'>
        <ScrollView
          contentContainerStyle={{ height: '100%', backgroundColor: '#ffffff' }}
        >
          <Image
            source={images.onboarding}
            className='w-full h-4/6'
            resizeMode='contain'
          />
          <View className='px-10'>
            <Text className='text-base uppercase font-rubik text-black-100 text-center'>
              Welcome to Bookify
            </Text>
            <Text className='text-3xl font-rubik-bold text-black-300 text-center mt-2'>
              Let's Get You closer to {'\n'}
              <Text className='text-primary-300'>Your Ideal Home</Text>
            </Text>
            <Text className='text-lg font-rubik text-black-200 text-center mt-12'>
              Login to book with <Text className='font-rubik-bold'>Google</Text>
            </Text>
            <TouchableOpacity
              onPress={handleLogin}
              className='bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'
            >
              <View className='flex flex-row items-center justify-center'>
                <Image
                  source={icons.google}
                  className='w-5 h-5'
                  resizeMode='contain'
                />
                <Text className='text-lg font-rubik-medium text-black-300 ml-2'>
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>Button</TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
