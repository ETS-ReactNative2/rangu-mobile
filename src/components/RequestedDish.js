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
    dishName: 'Hamburger 🍔',
    orderHour: '15:32',
    statusDone: false,
  },
  {
    key: String(Math.random()),
    personProfileImg: img2,
    name: 'Gian',
  },
  {
    key: String(Math.random()),
    personProfileImg: img3,
    name: 'Chinchete',
  },
  {
    key: String(Math.random()),
    personProfileImg: img4,
    name: 'Luiz',
  },
  {
    key: String(Math.random()),
    personProfileImg: img5,
    name: 'Henrrique',
  },
  {
    key: String(Math.random()),
    personProfileImg: img6,
    name: 'Ricardo',
  },
  {
    key: String(Math.random()),
    personProfileImg: img7,
    name: 'Andre',
  },
];

export default function RequestedDish() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Image style={styles.profileImage} source={img1} />
            <Text style={styles.description}>
              <Text style={styles.bold}>You</Text> ordered <Text style={styles.bold}>Hambunger</Text>
            </Text>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.observation}>No pickles and more cheese </Text>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.status}>
              <Text style={styles.statusText}>Status:</Text>
              <Text style={styles.actualStatusText}>Preparing</Text>
            </View>
            <View style={styles.status}>
              <Ionicons name="ios-time-outline" color="#fff" size={18} />
              <Text style={styles.time}>15:35</Text>
            </View>

          </View>

        </View>
      </View>
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
    marginBottom: 20,
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
  },
  bold: {
    fontWeight: 'bold',
  },
  cardBody: {
    marginTop: 15,
  },
  observation: {
    color: '#fff',
    fontSize: 20,
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
  statusText: {
    color: '#fff',
    fontSize: 16,
  },
  actualStatusText: {
    //color: '#f75175',
    color: '#00fc6c',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,

  },
  time: {
    color: '#fff',
    marginLeft: 3,
  }

});