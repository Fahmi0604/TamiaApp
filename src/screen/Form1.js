import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function Form1() {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();

  const [nama, setNama] = useState('');
  const [umur, setUmur] = useState('');

  //   const handleAddData = () => {
  //     if (nominal == '' && keterangan != '') {
  //       Alert.alert('Info', 'Field tidak boleh kosong');
  //     } else {
  //       db.transaction(tx => {
  //         tx.executeSql(
  //           'INSERT INTO transaksi (date,nominal,keterangan,tipe) VALUES (?,?,?,?);',
  //           [date.toDateString(), nominal, keterangan, 'pemasukan'],
  //           (txn, res) => {
  //             if (res.rowsAffected > 0) {
  //               //   let newListData = listData;
  //               //   let insertID = res.insertId;
  //               //   newListData.push({
  //               //     id_transaksi: insertID, //memanfaatkan ID unique dari column user_id
  //               //     date: date,
  //               //     nominal: nominal,
  //               //     keterangan: keterangan,
  //               //     tipe: 'pemasukan',
  //               //   });

  //               //   setListData(newListData);
  //               //   Alert.alert('Info', `insert id : ${insertID}`);
  //               setDate(new Date(Date.now()));
  //               setNominal('');
  //               setKeterangan('');
  //               Alert.alert('Info', `Data Berhasil Ditambahkan`);
  //             }
  //           },
  //           err => {
  //             console.log(err);
  //           },
  //         );
  //       });
  //     }
  //   };

  return (
    <ScrollView>
      <StatusBar backgroundColor={'#f2f2f2'} barStyle="dark-content" />
      <View
        style={{
          height: height,
          paddingHorizontal: '5%',
          paddingVertical: '10%',
        }}>
        <View style={{marginBottom: 20}}>
          <Text style={{color: '#282828', marginBottom: 5}}>Nama</Text>
          <TextInput
            value={nama}
            onChangeText={text => setNama(text)}
            style={{
              borderWidth: 1,
              borderRadius: 7,
              color: '#282828',
              paddingLeft: 10,
            }}
            placeholder="Masukan Namamu"
            placeholderTextColor={'gray'}
          />
        </View>

        <View style={{}}>
          <Text style={{color: '#282828', marginBottom: 5}}>Umur</Text>
          <TextInput
            value={umur}
            onChangeText={text => setUmur(text.replace(/[^0-9]/g, ''))}
            style={{
              borderWidth: 1,
              borderRadius: 7,
              color: '#282828',
              paddingLeft: 10,
            }}
            placeholder="Masukan Umurmu"
            placeholderTextColor={'gray'}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Form2', {nama, umur})}
          style={{
            width: (width / 10) * 9,
            backgroundColor: '#047857',
            paddingVertical: 15,
            borderRadius: 1000,
            position: 'absolute',
            bottom: 20,
            marginHorizontal: (width / 10) * 0.5,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
