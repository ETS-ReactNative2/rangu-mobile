import React from 'react';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, View } from "react-native";

import img1 from '../../assets/images/Profile/FotoPerfil2_Cortada.jpg';
import img2 from '../../assets/images/Profile/40037515.jpg';
import img3 from '../../assets/images/Profile/38963605.jpg';
import img4 from '../../assets/images/Profile/Luiz.jpeg';
import img5 from '../../assets/images/Profile/20191214_8154_iOS.jpg';
import img6 from '../../assets/images/Profile/20191013_00.jpg';
import img7 from '../../assets/images/Profile/20210121_17292.jpg';

const dishes = [
  {
    key: String(Math.random()),
    personProfileImg: img1,
    personName: 'Leonardo',
    dishName: 'Tripple Mother Fucker Hamburger 🍔',
    orderHour: '15:43',
    statusDone: true,
    comment: 'No pickles and more cheese and uma porrada de coisa que eu acho gostoso, tudinho num delicioso lanche bem feitinho delicia 😋!!!',
  },
  {
    key: String(Math.random()),
    personProfileImg: img2,
    personName: 'Gian',
    dishName: 'Macarone',
    orderHour: '15:42',
    statusDone: false,
    comment: 'Extra cheese',
  },
  {
    key: String(Math.random()),
    personProfileImg: img3,
    personName: 'Chinchete',
    dishName: 'Espetinho do seu Correia',
    orderHour: '15:39',
    statusDone: false,
    comment: '',
  },
  {
    key: String(Math.random()),
    personProfileImg: img4,
    personName: 'Luiz',
    dishName: 'Onion Rings',
    orderHour: '15:38',
    statusDone: true,
    comment: '',
  },
  {
    key: String(Math.random()),
    personProfileImg: img5,
    personName: 'Henrrique',
    dishName: 'Hamburger 🍔',
    orderHour: '15:35',
    statusDone: true,
    comment: 'Double bacon',
  },
  {
    key: String(Math.random()),
    personProfileImg: img6,
    personName: 'Ricardo',
    dishName: 'Hamburger 🍔',
    orderHour: '15:32',
    statusDone: false,
    comment: 'Without salad',
  },
  {
    key: String(Math.random()),
    personProfileImg: img7,
    personName: 'Andre',
    dishName: 'Caviar',
    orderHour: '15:32',
    statusDone: true,
    comment: '',
  },
];

export default function RequestedDish() {
  return (
    <ScrollView>
      {dishes.map((dishe) => (
        <View style={styles.container} key={dishe.key}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Image style={styles.profileImage} source={dishe.personProfileImg} />
              <Text style={styles.description}>
                <Text style={styles.bold}>{dishe.personName}</Text> ordered <Text style={styles.bold}>{dishe.dishName}</Text>
              </Text>
            </View>
            {dishe.comment !== '' ?
              <View style={styles.cardBody}>
                <Text style={styles.observation}>{dishe.comment}</Text>
              </View>
              : null}

            <View style={styles.cardFooter}>
              <View style={styles.status}>
                <Text style={styles.textStatus}>Status:</Text>
                {dishe.statusDone == true ?
                  <Text style={[styles.textActualStatus, { color: '#00fc6c', }]}>Ready</Text>
                  :
                  <Text style={[styles.textActualStatus, { color: '#f75175', }]}>Preparing</Text>
                }

              </View>
              <View style={styles.status}>
                <Ionicons name="ios-time-outline" color="#fff" size={18} />
                <Text style={styles.textTime}>{dishe.orderHour}</Text>
              </View>

            </View>

          </View>
        </View>

      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  profileImage: {
    borderRadius: 40,
    height: 80,
    width: 80

  },
  card: {
    backgroundColor: "#1e222b",
    borderRadius: 8,
    marginBottom: 0,
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
    marginRight: 80,
  },
  bold: {
    fontWeight: 'bold',
  },
  cardBody: {
    marginTop: 15,
  },
  observation: {
    color: '#fff',
    fontSize: 18,
  },
  cardFooter: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStatus: {
    color: '#fff',
    fontSize: 16,
  },
  textActualStatus: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,

  },
  textTime: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 15,
  }

});