import {useNavigation, useIsFocused} from '@react-navigation/native';
import React from 'react';
import {Image, View, Dimensions, StatusBar} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase(
  { name: 'tamia.db', createFromLocation: 1 },
  () => {
    //   Alert.alert('Info', 'Sukses loading database SQLite');
  },
  err => {
    console.log(err);
  },
);

export default function Splash({navigation}) {
  const {width, height} = Dimensions.get('window');
  const navigations = useNavigation();
  const focused = useIsFocused();

  React.useEffect(() => {
    setTimeout(() => {
      navigations.navigate('Home');
    }, 2000);
  }, [navigation, focused]);



  // React.useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'DELETE FROM user',
  //       [],
  //       (tx, results) => {
  //         console.log('Results', results.rowsAffected);
  //         if (results.rowsAffected > 0) {
  //           ToastAndroid.show('Data berhasil dihapus!!!', ToastAndroid.SHORT);
  //           getData();
  //         } else {
  //           ToastAndroid.show('Error!!!', ToastAndroid.SHORT);
  //         }
  //       }
  //     );
  //   });
  //   console.log('focused');
  //   navigations.navigate('Home');
  // }, [])

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
