import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Card = () => {
  return (
    <TouchableOpacity
      //   onPress={'onPress'}
      className='flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative'
    >
      <Text>Card</Text>
    </TouchableOpacity>
  );
};

export default Card;
