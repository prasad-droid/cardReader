import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Share
} from 'react-native';
import {DataContext} from './Context';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../firebaseConfig';
import Button from './Button'; // Assuming Button component is correctly implemented
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function EditScreen({route}) {
  const [userName, setName] = useState('');
  const [job, setJob] = useState('');
  const [website, setWebsite] = useState('');
  const [contact1, setContact1] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useContext(DataContext);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setName(route.params?.name);
    setJob(route.params?.job);
    setWebsite(route.params?.website);
    setContact1(route.params?.contact1);
    setEmail(route.params?.email);
    setAddress(route.params?.address);
  }, [route.params]);

  // fetching Data
  const fetchData = async () => {
    try {
      const docRef = doc(db, 'users', user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const contacts = docSnap.data().contacts;
        const data = contacts.find(
          contact =>
            contact.name === route.params?.name &&
            contact.email === route.params?.email &&
            contact.contact1 === route.params?.contact,
        );

        if (data) {
          const {name, job, website, contact1, email, address} = data;
          setName(name);
          setJob(job);
          setWebsite(website);
          setContact1(contact1);
          setEmail(email);
          setAddress(address);
        }
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };

  // Saving Data
  const saveData = async () => {
    try {
      const docRef = doc(db, 'users', user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const contacts = docSnap.data().contacts;
        // console.log(contacts);
        const upContact =  contacts.map(contact => {
          if (contact.name === route.params?.name && contact.email === route.params?.email && contact.contact1 === route.params?.contact) {
            const updatedContact = {
              name: userName || contact.name, // Use existing value if userName is undefined
              job: job || contact.job,
              website: website || contact.website,
              contact1: contact1 || contact.contact1,
              email: email || contact.email,
              address: address || contact.address,
            };
            return updatedContact;
          }
          return contact;
        });
        console.log(upContact);
        await updateDoc(docRef, {contacts: upContact});
        alert('Data updated successfully!');
        navigation.navigate('CX Card Scan')
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  // function to make call
  const makeCall = (number) => {
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

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Image
          source={require('../assets/profile.png')}
          style={{
            width: 150,
            height: 150,
            alignSelf: 'center',
            objectFit: 'contain',
          }}
        />
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:'#449AE9',fontSize:35,fontFamily:'Poppins'}}>{userName}</Text>
          <Text>{job}</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={()=>{makeCall(contact1)}}
              style={{
                borderRadius: 50,
                backgroundColor: '#FA6E6E',
                padding: 10,
                margin: 15,
              }}>
              <Icon name="phone" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{whatsappMsg(contact1)}}
              style={{
                borderRadius: 50,
                backgroundColor: '#12CD7E',
                padding: 10,
                margin: 15,
              }}>
              <Icon name="whatsapp" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{shareContact(userName, contact1, email)}}
              style={{
                borderRadius: 50,
                backgroundColor: '#144878',
                padding: 10,
                margin: 15,
              }}>
              <Icon name="share-nodes" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{sendEmail(email)}}
              style={{
                borderRadius: 50,
                backgroundColor: '#147872',
                padding: 10,
                margin: 15,
              }}>
              <Icon name="envelope" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Name"
              placeholderTextColor={'#000'}
              style={styles.inputStyle}
              value={userName}
              onChangeText={text => {
                setName(text);
              }}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Job"
              placeholderTextColor={'#000'}
              style={styles.inputStyle}
              value={job}
              onChangeText={text => {
                setJob(text);
              }}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="website "
              placeholderTextColor={'#000'}
              style={styles.inputStyle}
              value={website ? website : ''}
              onChangeText={text => {
                setWebsite(text);
              }}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Contact 1"
              placeholderTextColor={'#000'}
              style={styles.inputStyle}
              value={contact1}
              onChangeText={text => {
                setContact1(text);
              }}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={'#000'}
              style={styles.inputStyle}
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Address"
              placeholderTextColor={'#000'}
              style={styles.inputStyle}
              value={address}
              onChangeText={text => {
                setAddress(text);
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.btnDiv}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Button text="save" icon="save" onPress={saveData} />
            </>
          )}
          <Button
            text="repeat"
            icon="repeat"
            onPress={() => {
              navigation.navigate('Scan');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  inputStyle: {
    color: '#000',
    marginTop: 20,
    marginHorizontal: 10,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#DCDCDC',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    border: 2,
    borderColor: '#494949',
  },
  btnDiv: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  Button: {
    backgroundColor: '#dcdcdc',
    flexDirection: 'row',
    height: 40,
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#449AE9',
    borderRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    objectFit: 'contain',
  },
});
