import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: any;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => {
  return (
    <TouchableOpacity>
      <View>
        <Image source={icon} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsItem;
