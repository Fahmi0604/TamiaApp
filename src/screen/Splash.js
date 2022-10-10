import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, View, Dimensions, StatusBar} from 'react-native';

export default function Splash() {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  }, [navigation]);

  return (
    <View style={{minHeight: height, justifyContent: 'center'}}>
      <StatusBar backgroundColor={'#f2f2f2'} barStyle="dark-content" />
      <Image
        style={{width: width, height: width}}
        source={require('../assets/logo.png')}
      />
    </View>
  );
}
