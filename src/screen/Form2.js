import React, {useEffect, useState} from 'react';
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
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import CheckBox from 'react-native-check-box';

var db = openDatabase(
  {name: 'tamia.db', createFromLocation: 1},
  () => {
    // Alert.alert('Info', 'Sukses loading database SQLite');
  },
  err => {
    console.log(err);
  },
);

export default function Form2() {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();
  const route = useRoute();

  const [beratBadan, setBeratBadan] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [HB, setHB] = useState('');

  const [periodeMens, setPeriodeMens] = useState('');
  const [check1, setcheck1] = useState(false);
  const [check2, setcheck2] = useState(false);

  const [polaMakan, setPolaMakan] = useState('');
  const [check3, setcheck3] = useState(false);
  const [check4, setcheck4] = useState(false);

  const [konsumsiObatFE, setkonsumsiObatFE] = useState('');
  const [check5, setcheck5] = useState(false);
  const [check6, setcheck6] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleAddData = () => {
    if (
      beratBadan === '' ||
      tinggiBadan === '' ||
      periodeMens === '' ||
      polaMakan === '' ||
      konsumsiObatFE === ''
    ) {
      toastEmptyForm();
    } else {
      setIsLoading(true);
      console.log([
        route.params.nama,
        parseInt(route.params.umur),
        parseInt(beratBadan),
        parseInt(tinggiBadan),
        parseFloat(HB),
        periodeMens,
        polaMakan,
        konsumsiObatFE,
        new Date(Date.now()),
      ]);
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO user (nama,umur,berat_badan,tinggi_badan,hb,periode_mens,pola_makan,konsumsi_obat,date) VALUES (?,?,?,?,?,?,?,?,?);',
          [
            route.params.nama,
            parseInt(route.params.umur),
            parseInt(beratBadan),
            parseInt(tinggiBadan),
            parseFloat(HB.replace(/,/g, '.')),
            periodeMens,
            polaMakan,
            konsumsiObatFE,
            new Date(Date.now()).toDateString(),
          ],
          (txn, res) => {
            if (res.rowsAffected > 0) {
              //   let newListData = listData;
              let insertID = res.insertId;
              console.log(insertID);
              //   newListData.push({
              //     id_transaksi: insertID, //memanfaatkan ID unique dari column user_id
              //     date: date,
              //     nominal: nominal,
              //     keterangan: keterangan,
              //     tipe: 'pemasukan',
              //   });

              //   setListData(newListData);
              //   Alert.alert('Info', `insert id : ${insertID}`);
              // setNominal('');
              // setKeterangan('');
              // Alert.alert('Info', `Data Berhasil Ditambahkan`);
              setTimeout(() => {
                setIsLoading(false);
                navigation.navigate('Result', {id: insertID});
              }, 3000);
            }
          },
          err => {
            console.log(err);
          },
        );
      });
    }
  };

  const handleOnChangePeriodeMens = value => {
    setPeriodeMens(value);

    if (value === '4 Hari Lebih') {
      setcheck1(true);
      setcheck2(false);
    } else {
      setcheck1(false);
      setcheck2(true);
    }
  };

  const handleOnChangePolaMakan = value => {
    setPolaMakan(value);

    if (value === 'Iya') {
      setcheck3(true);
      setcheck4(false);
    } else {
      setcheck3(false);
      setcheck4(true);
    }
  };

  const handleOnChangeKonsumsiObatFE = value => {
    setkonsumsiObatFE(value);

    if (value === 'Iya') {
      setcheck5(true);
      setcheck6(false);
    } else {
      setcheck5(false);
      setcheck6(true);
    }
  };

  const toastEmptyForm = () => {
    ToastAndroid.show('Mohon Lengkapi Form!!!', ToastAndroid.SHORT);
  };

  return (
    <ScrollView>
      {/* Config Status Bar */}
      <StatusBar backgroundColor={'#f2f2f2'} barStyle="dark-content" />

      {/* Loading Spinner */}
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            // top: 0,
            left: 0,
            right: 0,
            bottom: height / 7.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#047857" />
        </View>
      )}

      <View
        style={{
          height: height,
          paddingHorizontal: '5%',
          paddingVertical: '10%',
        }}>
        <View style={{marginBottom: 20}}>
          <Text style={{color: '#282828', marginBottom: 5}}>Berat Badan</Text>
          <TextInput
            value={beratBadan}
            onChangeText={text => setBeratBadan(text.replace(/[^0-9]/g, ''))}
            style={{
              borderWidth: 1,
              borderRadius: 7,
              color: '#282828',
              paddingLeft: 10,
            }}
            placeholder="Masukan Berat Badan"
            placeholderTextColor={'gray'}
          />
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={{color: '#282828', marginBottom: 5}}>Tinggi Badan</Text>
          <TextInput
            value={tinggiBadan}
            onChangeText={text => setTinggiBadan(text.replace(/[^0-9]/g, ''))}
            style={{
              borderWidth: 1,
              borderRadius: 7,
              color: '#282828',
              paddingLeft: 10,
            }}
            placeholder="Masukan Tinggi Badan"
            placeholderTextColor={'gray'}
          />
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={{color: '#282828', marginBottom: 5}}>HB saat ini</Text>
          <TextInput
            value={HB}
            onChangeText={text => setHB(text.replace(/[^0-9,]/g, ''))}
            style={{
              borderWidth: 1,
              borderRadius: 7,
              color: '#282828',
              paddingLeft: 10,
            }}
            placeholder="Masukan HB saat ini"
            placeholderTextColor={'gray'}
          />
        </View>

        <View style={{marginBottom: 10}}>
          <Text style={{color: '#282828', marginBottom: 5}}>
            Periode Menstruasi
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <View
              style={{
                width: width / 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <CheckBox
                style={{padding: 10}}
                onClick={() => handleOnChangePeriodeMens('4 Hari Lebih')}
                isChecked={check1}
                checkBoxColor="#047857"
              />
              <Text style={{color: '#282828'}}>4 Hari Lebih</Text>
            </View>
            <View
              style={{
                width: width / 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <CheckBox
                style={{padding: 10}}
                onClick={() => handleOnChangePeriodeMens('Kurang 7 Hari')}
                isChecked={check2}
                checkBoxColor="#047857"
              />
              <Text style={{color: '#282828'}}>Kurang 7 Hari</Text>
            </View>
          </View>
        </View>

        <View style={{marginBottom: 10}}>
          <Text style={{color: '#282828', marginBottom: 5}}>
            Pola Makan (3 kali sehari)
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <View
              style={{
                width: width / 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <CheckBox
                style={{padding: 10}}
                onClick={() => handleOnChangePolaMakan('Iya')}
                isChecked={check3}
                checkBoxColor="#047857"
              />
              <Text style={{color: '#282828'}}>Ya</Text>
            </View>
            <View
              style={{
                width: width / 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <CheckBox
                style={{padding: 10}}
                onClick={() => handleOnChangePolaMakan('Tidak')}
                isChecked={check4}
                checkBoxColor="#047857"
              />
              <Text style={{color: '#282828'}}>Tidak</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={{color: '#282828', marginBottom: 5}}>
            Apakah Pernah Mengkonsumsi Obat FE
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <View
              style={{
                width: width / 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <CheckBox
                style={{padding: 10}}
                onClick={() => handleOnChangeKonsumsiObatFE('Iya')}
                isChecked={check5}
                checkBoxColor="#047857"
              />
              <Text style={{color: '#282828'}}>Ya</Text>
            </View>
            <View
              style={{
                width: width / 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <CheckBox
                style={{padding: 10}}
                onClick={() => handleOnChangeKonsumsiObatFE('Tidak')}
                isChecked={check6}
                checkBoxColor="#047857"
              />
              <Text style={{color: '#282828'}}>Tidak</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleAddData()}
          style={{
            width: (width / 10) * 9,
            backgroundColor: '#047857',
            paddingVertical: 15,
            borderRadius: 1000,
            position: 'absolute',
            bottom: 20,
            marginHorizontal: (width / 10) * 0.5,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Calculate</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
