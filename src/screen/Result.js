import React from 'react';
import {Text, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase(
  {name: 'tamia.db', createFromLocation: 1},
  () => {
    //   Alert.alert('Info', 'Sukses loading database SQLite');
  },
  err => {
    console.log(err);
  },
);

export default function Result() {
  React.useEffect(() => {
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

            console.log(newListData);

            // Alert.alert('Info', JSON.stringify(newListData));
            // setDataTransaksi(newListData);
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

  return (
    <View>
      <Text>Result</Text>
    </View>
  );
}
