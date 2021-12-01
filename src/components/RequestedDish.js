import React, { useReducer, useRef, useState, useEffect } from 'react';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, View } from "react-native";
import Lottie from 'lottie-react-native';

import apiOrchestrate from '../services/apiOrchestrate.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [TableOrders, setTableOrders] = useState([]);

  let userId = '';

  useEffect(() => {

    AsyncStorage.getItem('token').then(value => {

    })
      .catch(err => {
        console.log(err);
      });

      LoadTableDishes();

  }, []);

  async function LoadTableDishes() {
    try {

      await AsyncStorage.getItem('userid')
        .then(value => {
          userId = value;
          //console.log('UserId: ' + value);

        }).catch(err => {
          console.log(err);

        });


      let response = await apiOrchestrate.get('/tableOrders', { headers: { clientTable: "7f7a37df-b629-41e7-a588-914c3cbdeb7a" } })

      console.log(response.data);
      setTableOrders(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  if (TableOrders.length === 0) {
    return (

      <View style={styles.animContainer} >

        <Lottie source={anim} autoPlay loop />

      </View>
    );
  }
  else {
    return (
      <ScrollView>
        {TableOrders.map((order) => (
          <View style={styles.container} key={order.id}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Image style={styles.profileImage} source={ order.dishes.map((dish,index) => {if(index == 0){return { uri: dish.image}}}) } />
                <Text style={styles.textDescription}>
                  <Text style={styles.bold}>{order.clientName.split(" ")[0]}</Text> ordered <Text style={styles.bold}>{order.dishes.map((dish,index) => {if(index == 0){return dish.name }})}</Text>
                </Text>
              </View>
              {order.comment !== '' ?
                <View style={styles.cardBody}>
                  <Text style={styles.observation}>{order.comment}</Text>
                </View>
                : null}

              <View style={styles.cardFooter}>
                <View style={styles.status}>
                  <Text style={styles.textStatus}>Status:</Text>
                  {order.status == 'DONE' ?
                    <Text style={[styles.textActualStatus, { color: '#00fc6c', }]}>Ready</Text>
                    :
                    order.status == 'PREPARING' ?
                    <Text style={[styles.textActualStatus, { color: '#F5982E', }]}>Preparing</Text>
                    :
                    order.status == 'SUBMITTED' ?
                    <Text style={[styles.textActualStatus, { color: '#F5982E', }]}>Submitted</Text>
                    :
                    order.status == 'TAKING' ?
                    <Text style={[styles.textActualStatus, { color: '#F5982E', }]}>Taking</Text>
                    :
                    order.status == 'CANCEL' ?
                    <Text style={[styles.textActualStatus, { color: '#D7233C', }]}>Cancel</Text>
                    :
                    null
                  }

                </View>
                <View style={styles.status}>
                  <Ionicons name="ios-time-outline" color="#fff" size={18} />
                  <Text style={styles.textTime}>{order.orderHour}</Text>
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