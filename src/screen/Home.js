import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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

export default function Home() {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();
  const focused = useIsFocused();

  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    getData();

    if (focused) {
      console.log('called');
    }
  }, [focused]);

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM user;',
        [],
        (txn, res) => {
          if (res.rows.length > 0) {
            let count = res.rows.length;
            let newListData = [];

            for (let index = 0; index < count; index++) {
              const element = res.rows.item(index);
              newListData.push({
                id_user: element.id_user, //memanfaatkan value dari database, column id_user
                nama: element.nama, //memanfaatkan value dari database, column username
                umur: element.umur,
                berat_badan: element.berat_badan,
                tinggi_badan: element.tinggi_badan,
                hb: element.hb,
                periode_mens: element.periode_mens,
                pola_makan: element.pola_makan,
                konsumsi_obat: element.konsumsi_obat,
                date: element.date,
              });
            }

            // console.log(newListData.length);

            // Alert.alert('Info', JSON.stringify(newListData));
            setUser(newListData);
          } else {
            setUser([]);
          }
        },
        err => {
          console.log(err);
        },
      );
    });
  }

  const navigateToResult = (id) => {
    navigation.navigate('Result', { id: id });
  }

  const deleteData = (inputUserId) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM user where id_user=?',
        [inputUserId],
        (tx, results) => {
          console.log('Terdelete', results.rowsAffected);
          if (results.rowsAffected > 0) {
            ToastAndroid.show('Data berhasil dihapus!!!', ToastAndroid.SHORT);
            getData();
          } else {
            ToastAndroid.show('Error!!!', ToastAndroid.SHORT);
            getData();
          }
        }
      );
    });
  }

  useEffect(() => {
    console.log(user);
  }, [user])
  

  const generateCard = (user, i) => {
    if (user.hb >= 10 && user.hb <= 13) {
      return(
      <View key={i} style={{ backgroundColor: '#dddddd', display: 'flex', padding: 15, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
        <TouchableOpacity onPress={() => navigateToResult(user.id_user)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#007bff', width: width / 10, height: width / 10, marginRight: width / 20, borderRadius: 1000 }}></View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>{user.nama}</Text>
            <Text>Tes Terakhir {new Date(user.date).toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteData(user.id_user)} style={{ marginRight: width / 20 }}>
          <Icon name='trash' size={25} color='#282828' />
        </TouchableOpacity>
      </View>)
    } else if (user.hb >= 8 && user.hb <= 9.9) {
      return(
      <View key={i} style={{ backgroundColor: '#dddddd', display: 'flex', padding: 15, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
        <TouchableOpacity onPress={() => navigateToResult(user.id_user)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#28a745', width: width / 10, height: width / 10, marginRight: width / 20, borderRadius: 1000 }}></View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>{user.nama}</Text>
            <Text>Tes Terakhir {new Date(user.date).toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteData(user.id_user)} style={{ marginRight: width / 20 }}>
          <Icon name='trash' size={25} color='#282828' />
        </TouchableOpacity>
      </View>)
    } else if (user.hb >= 6 && user.hb <= 7.9) {
      return(
      <View key={i} style={{ backgroundColor: '#dddddd', display: 'flex', padding: 15, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
        <TouchableOpacity onPress={() => navigateToResult(user.id_user)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#ffc107', width: width / 10, height: width / 10, marginRight: width / 20, borderRadius: 1000 }}></View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>{user.nama}</Text>
            <Text>Tes Terakhir {new Date(user.date).toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteData(user.id_user)} style={{ marginRight: width / 20 }}>
          <Icon name='trash' size={25} color='#282828' />
        </TouchableOpacity>
      </View>)
    } else if (user.hb < 6) {
      return(
      <View key={i} style={{ backgroundColor: '#dddddd', display: 'flex', padding: 15, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
        <TouchableOpacity onPress={() => navigateToResult(user.id_user)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#dc3545', width: width / 10, height: width / 10, marginRight: width / 20, borderRadius: 1000 }}></View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>{user.nama}</Text>
            <Text>Tes Terakhir {new Date(user.date).toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteData(user.id_user)} style={{ marginRight: width / 20 }}>
          <Icon name='trash' size={25} color='#282828' />
        </TouchableOpacity>
      </View>)
    }
  }

  return (
    <View style={{ height: height }}>
      <StatusBar backgroundColor={'#f2f2f2'} barStyle="dark-content" />
      <TouchableOpacity
        onPress={() => navigation.navigate('Form1')}
        style={{
          width: (width / 10) * 1.5,
          height: (width / 10) * 1.5,
          position: 'absolute',
          bottom: 30,
          right: 30,
          backgroundColor: '#047857',
          borderRadius: 1000,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100
        }}>
        <Icon name="plus" size={25} color="white" />
      </TouchableOpacity>
      {/* <Text style={{color: '#282828'}}>Home</Text> */}
      <View style={{
        height: height,
        paddingHorizontal: '5%',
        paddingVertical: '5%',
      }}>
        <ScrollView>
          {user.map((user, i) => (
            generateCard(user, i)
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
