import { settings } from '@/constants/data';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { logout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: any;
  showArrow?: boolean;
}

const Profile = () => {
  // fetch user to display name and avatar
  const { refetch, user } = useGlobalContext();
  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert('Success', 'Logged out successfully');
      refetch();
    } else {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const SettingsItem = ({
    icon,
    title,
    onPress,
    textStyle,
    showArrow = true,
  }: SettingsItemProps) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        className='flex flex-row items-center justify-between py-3'
      >
        <View className='flex flex-row items-center gap-3'>
          <Image source={icon} className='size-6' />
          <Text
            className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}
          >
            {title}
          </Text>
        </View>
        {showArrow && <Image source={icons.rightArrow} className='size-5' />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 px-7'
      >
        <View className='flex flex-row items-center justify-between mt-15'>
          <Text className='text-xl font-rubik-bold'>Profile</Text>
          <Image source={icons.bell} className='size-5' />
        </View>
        <View className='flex-row justify-center flex mt-5'>
          <View className='flex flex-col items-center relative mt-5'>
            <Image
              source={{ uri: user?.avatar }}
              className='size-44 relative rounded-full'
            />
            <TouchableOpacity className='absolute bottom-11 right-2'>
              <Image source={icons.edit} className='size-9' />
            </TouchableOpacity>
            <Text className='text-2xl font-rubik-bold  mt-2'>{user?.name}</Text>
          </View>
        </View>
        <View className='flex flex-col mt-10'>
          <SettingsItem icon={icons.calendar} title='My Bookings' />
          <SettingsItem icon={icons.wallet} title='Payments' />
        </View>
        <View className='flex flex-col mt-5 border-t pt-5'>
          {settings.slice(2).map((item, index) => (
            <SettingsItem
              // key={`${item.title}-${index}`}
              key={`${item.title}-${Math.random()}`}
              icon={item.icon}
              title={item.title}
              showArrow={false}
            />
          ))}
        </View>
        <View className='flex flex-col mt-5 border-t pt-5'>
          <SettingsItem
            icon={icons.logout}
            title='Logout'
            showArrow={false}
            textStyle='text-danger'
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
