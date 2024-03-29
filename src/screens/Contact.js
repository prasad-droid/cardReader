import {
  View,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import Button from './Button';
import {collection, doc, getDoc, setDoc, Timestamp} from 'firebase/firestore';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {db} from '../firebaseConfig';
import {DataContext} from './Context';
import {AddressModal} from './Modal';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function Contact({route}) {
  const navigation = useNavigation();
  const [userName, setName] = useState(route.params?.name);
  const [job, setJob] = useState(route.params?.job);
  const [website, setWebsite] = useState(route.params?.website[0]);
  const [contact1, setContact1] = useState(route.params?.contact1);
  const [email, setEmail] = useState(route.params?.email[0]);
  const [address, setAddress] = useState(route.params?.address || []);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const user = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(route.params?.name);
    setJob(route.params?.job);
    setWebsite(route.params?.website[0]);
    setContact1(route.params?.contact1);
    setEmail(route.params?.email[0]);
    setAddress(route.params?.address);
  }, [route.params]);

  const closeModal = () => {
    setAddressModalVisible(false);
  };

  const applyAddress = add => {
    setAddress(add);
    closeModal();
  };

  const SaveData = async () => {
    const userEmail = user.email;
    const docRef = doc(db, 'users', userEmail);

    setLoading(true);

    try {
      const docSnap = await getDoc(docRef);

      let contact = {
        id: uuidv4(),
        name: userName || 'null',
        job: job || 'null',
        website: website || 'null',
        contact1: contact1 || 'null',
        email: email || 'null',
        time: Timestamp.now(),
      };

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data()['contacts']);
        const prevData = docSnap.data()['contacts'];
        await setDoc(doc(collection(db, 'users'), userEmail), {
          contacts: [...prevData, contact],
        });
      } else {
        await setDoc(doc(collection(db, 'users'), userEmail), {
          contacts: [contact],
        });
      }
      console.log('Contact Saved');
      //clear fields
      clearFields();
      navigation.navigate('Home');
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      setLoading(false);
    }
  };
  const clearFields = () => {
    setName('');
    setJob('');
    setWebsite('');
    setContact1('');
    setEmail('');
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Image
          source={require('../assets/profile.png')}
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
            objectFit: 'contain',
          }}
        />
        <ScrollView>
          <View style={styles.inputBox}>
            <Icon name="circle-user" style={styles.Icon} />
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
          {/* <View style={styles.inputBox}>
          <Icon name='building-un' style={styles.Icon} />
            <TextInput
              placeholder="Job"
              placeholderTextColor={'#000'}
              style={styles.inputStyle}
              value={job}
              onChangeText={text => {
                setJob(text);
              }}
            />
          </View> */}
          <View style={styles.inputBox}>
            <Icon name="globe" style={styles.Icon} />
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
            <Icon name="phone" style={styles.Icon} />
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
            <Icon name="envelope" style={styles.Icon} />
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
            <Button
              text="Address Modal"
              onPress={() => setAddressModalVisible(true)}
            />
            <AddressModal
              isVisible={addressModalVisible}
              add={address}
              onClose={closeModal}
              onSave={applyAddress}
            />
          </View>
        </ScrollView>
        <View style={styles.btnDiv}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Button text="save" icon="save" onPress={SaveData} />
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
    backgroundColor:'#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputStyle: {
    color: '#000',
    marginTop: 20,
    marginHorizontal: 10,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#EDEDED',
    borderColor:'#449AE9',
    borderWidth:2
  },
  Icon: {
    fontSize: 20,
    color: '#449AE9',
    marginTop:18
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
});
