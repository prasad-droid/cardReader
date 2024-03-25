import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Linking,
  Share,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

export default function Card({Cname, email, Contact}) {
  
  const navigation = useNavigation();
  // function to make call
  const makeCall = number => {
    if (typeof number != 'string') {
      number = String(number);
    }
    if (!number.startsWith('+91')) {
      number = '+91' + number;
    }
    const phoneNumber = `tel:${number}`;
    Linking.openURL(phoneNumber);
  };

  // function to message on WhatsApp
  const whatsappMsg = number => {
    try {
      const phoneNumber = `whatsapp://send?phone=${number}`;
      Linking.openURL(phoneNumber);
    } catch (err) {
      alert('Error Occured ', err);
    }
  };

  // Function to send an email
  const sendEmail = emailAddress => {
    emailAddress = emailAddress.toLowerCase();
    const mailtoUrl = `mailto:${emailAddress}`;
    Linking.openURL(mailtoUrl);
  };

  // Function to share contacts
  const shareContact = (Cname, Contact, email) => {
    Share.share({
      title: 'Contact Information',
      message: `Name: ${Cname}\nContact: ${Contact}\nEmail: ${email}`,
    });
  };

  const Edit = ()=>{
    navigation.navigate("Edit",{name:Cname,contact:Contact,email:email})
  }
  return (
    <TouchableWithoutFeedback onPress={Edit}>
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          {/* details Container */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../assets/Profileicon.png')}
              style={styles.image}
            />
            <View style={styles.content}>
              <Text style={styles.text}>Name: {Cname}</Text>
              <Text style={styles.text}>Contact: {Contact}</Text>
              <Text style={styles.text}>Email: {email}</Text>
            </View>
          </View>
          {/* buttons Container */}
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity
              onPress={()=>{makeCall(Contact)}}
              style={{
                borderRadius: 50,
                backgroundColor: '#FA6E6E',
                padding: 5,
                marginBottom: 5,
              }}>
              <Icon name="phone" size={10} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{whatsappMsg(Contact)}}
              style={{
                borderRadius: 50,
                backgroundColor: '#12CD7E',
                padding: 5,
                marginBottom: 5,
              }}>
              <Icon name="whatsapp" size={10} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{shareContact(Cname, Contact, email)}}
              style={{
                borderRadius: 50,
                backgroundColor: '#144878',
                padding: 5,
                marginBottom: 5,
              }}>
              <Icon name="share-nodes" size={10} color="white" />
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#E4E4E4',
    margin: 10,
    borderRadius: 10,
    flexDirection: 'column',
    position: 'relative',
    elevation: -2,
    zIndex: -10,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  content: {
    flexDirection: 'column',
    padding: 10,
    width: 200,
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    zIndex: 5,
  },
  menuItem: {
    marginBottom: 5,
    color: '#333',
  },
  text: {
    color: 'black',
    flex:1,
    textTransform: 'capitalize',
  },
});
