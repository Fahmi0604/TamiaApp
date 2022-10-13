import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
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

export default function Result() {
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();
    const route = useRoute();
    const [data, setData] = useState({})
    
    useEffect(() => {
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

                        // Alert.alert('Info', JSON.stringify(newListData));
                        setData(newListData.filter(f => f.id_user == route.params.id)[0]);
                    } else {
                        // Alert.alert('Info', 'Tidak ada data');
                    }
                },
                err => {
                    console.log(err);
                },
            );
        });
    }, []);

    const generateTitle = (hb) => {
        if (hb >= 10 && hb <= 13) {
            return('Ringan Sekali')
          } else if (hb >= 8 && hb <= 9.9) {
            return('Ringan')
          } else if (hb >= 6 && hb <= 7.9) {
            return('Sedang')
          } else if (hb < 6) {
            return('Berat')
          }
    }

    return (
        <ScrollView style={{
            paddingHorizontal: '5%',
            paddingVertical: '5%',
        }}>
            <StatusBar backgroundColor={'#f2f2f2'} barStyle="dark-content" />
            <View style={{ backgroundColor: 'rgba(89, 253, 206, 0.17);', paddingHorizontal: '5%', borderRadius: 10, paddingVertical: 30 }}>
                <Text style={{ color: '#282828', fontWeight: '500', fontSize: 24, textAlign: 'center' }}>Hasil Tes</Text>
                <Text style={{ color: '#282828', fontWeight: '400', fontSize: 18, textAlign: 'center', marginTop: 30 }}>Kamu Mengidap</Text>
                <Text style={{ color: '#282828', fontWeight: '600', fontSize: 30, textAlign: 'center', marginTop: 40 }}>Anemia {generateTitle(data?.hb)}</Text>

                {/* <View style={{flexDirection: 'row', marginTop: 50}}>
            <View style={{width: width/10 * 4, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 16, color: '#282828'}}>DATE</Text>
                <Text style={{color: '#282828', marginTop: 10}}>{new Date(data?.date).toLocaleDateString()}</Text>
            </View>
            <View style={{width: width/10 * 4, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 16, color: '#282828'}}>RESULT IN SCORE</Text>
                <Text style={{color: '#282828', marginTop: 10}}>001</Text>
            </View>
        </View> */}

                <View style={{ marginTop: 50 }}>
                    <Text style={{ fontSize: 18, color: '#282828', fontWeight: '600' }}>Tes dilakukan pada tgl : {new Date(data?.date).toLocaleDateString()}</Text>
                    <Text style={{ fontSize: 18, color: '#282828', marginTop: 20 }}>Nama : {data?.nama}</Text>
                    <Text style={{ fontSize: 18, color: '#282828', marginTop: 10 }}>Berat Badan : {data?.berat_badan}</Text>
                    <Text style={{ fontSize: 18, color: '#282828', marginTop: 10 }}>Tinggi Badan : {data?.berat_badan}</Text>
                    <Text style={{ fontSize: 18, color: '#282828', marginTop: 10 }}>HB : {data?.hb}</Text>
                </View>

                <Text style={{ fontSize: 18, color: '#282828', marginTop: 50, textAlign: 'center' }}>
                    Paragraf ini akan berisi
                    saran dan masukan yang akan diberikan kepada pengguna aplikasi tentang bagaimana
                    banyak tablet FE yang perlu dikonsumsi
                    dalam satu hari dan makanan kaya zat besi apa? dianjurkan untuk dikonsumsi.
                </Text>

            </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={{
                        width: (width / 10) * 9,
                        backgroundColor: '#047857',
                        paddingVertical: 15,
                        borderRadius: 1000,
                        marginTop: 20
                    }}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Kembali</Text>
                </TouchableOpacity>
        </ScrollView>
    );
}
