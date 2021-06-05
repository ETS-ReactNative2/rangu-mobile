import React from 'react';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, View } from "react-native";
import Lottie from 'lottie-react-native';

import anim from '../../assets/animations/which-one/healthy-or-junk-food.json';
import img1 from '../../assets/images/Profile/FotoPerfil2_Cortada.jpg';
import img2 from '../../assets/images/Profile/40037515.jpg';
import img3 from '../../assets/images/Profile/38963605.jpg';
import img4 from '../../assets/images/Profile/Luiz.jpeg';
import img5 from '../../assets/images/Profile/20191214_8154_iOS.jpg';
import img6 from '../../assets/images/Profile/20191013_00.jpg';
import img7 from '../../assets/images/Profile/20210121_17292.jpg';
import img8 from '../../assets//images//Profile/Leo.jpeg'

let dishes = [
  {
    key: String(Math.random()),
    personProfileImg: img1,
    personName: 'Leonardo',
    dishName: 'Big Mac',
    orderHour: '15:43',
    statusDone: true,
    comment: 'No pickles and more cheese',
  },
  {
    key: String(Math.random()),
    personProfileImg: img2,
    personName: 'Gian',
    dishName: 'Spaghetti',
    orderHour: '15:42',
    statusDone: false,
    comment: 'Extra cheese',
  },
  {
    key: String(Math.random()),
    personProfileImg: img3,
    personName: 'Chinchete',
    dishName: 'McChicken',
    orderHour: '15:39',
    statusDone: false,
    comment: '',
  },
  {
    key: String(Math.random()),
    personProfileImg: img4,
    personName: 'Luiz',
    dishName: 'Bloomin’ Onion',
    orderHour: '15:38',
    statusDone: true,
    comment: '',
  },
  {
    key: String(Math.random()),
    personProfileImg: img5,
    personName: 'Henrrique',
    dishName: 'Generic Burger',
    orderHour: '15:35',
    statusDone: true,
    comment: 'Double bacon',
  },
  {
    key: String(Math.random()),
    personProfileImg: img6,
    personName: 'Ricardo',
    dishName: 'Big Mac',
    orderHour: '15:32',
    statusDone: false,
    comment: 'Without salad',
  },
  {
    key: String(Math.random()),
    personProfileImg: img7,
    personName: 'Andre',
    dishName: 'Spaghetti',
    orderHour: '15:32',
    statusDone: true,
    comment: '',
  },
  {
    key: String(Math.random()),
    personProfileImg: img8,
    personName: 'Leozinho',
    dishName: 'Hot Dog',
    orderHour: '4:20',
    statusDone: true,
    comment: 'Extremely thick sausages',
  },

];


export default function RequestedDish() {
  if (dishes.length === 0) {
    return (

      <View style={styles.animContainer} >

        <Lottie source={anim} autoPlay loop />

      </View>
    );
  }
  else {
    return (
      <ScrollView>
        {dishes.map((dishe) => (
          <View style={styles.container} key={dishe.key}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Image style={styles.profileImage} source={dishe.personProfileImg} />
                <Text style={styles.textDescription}>
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
                    <Text style={[styles.textActualStatus, { color: '#D7233C', }]}>Preparing</Text>
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


}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
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
  textDescription: {
    color: '#fff',
    fontSize: 17,
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
    fontSize: 14,
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
    fontSize: 14,
  },
  textActualStatus: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,

  },
  textTime: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
  },
  animContainer: {
    flex: 1
  },


});