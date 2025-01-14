import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import icons from '@/constants/icons';

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: Boolean;
  icon: any;
  title: string;
}) => (
  <View className='flex mt-3 flex-col items-center'>
    <Image
      source={icon}
      resizeMode='contain'
      className='size-6'
      tintColor={focused ? '#0061ff' : '#666876'}
    />
    <Text
      className={`${
        focused
          ? 'text-primary-300 font-rubik-medium'
          : 'text-black-200 font-rubik'
      } text-xs mt-1 text-xs w-full text-center`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          borderTopColor: '#0061FF1A',
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} title='Home' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'explore',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} title='Explore' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} title='Profile' focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
