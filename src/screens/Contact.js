import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import Button from './Button';
import {collection, addDoc} from 'firebase/firestore';

export default function Contact({route}) {
  const navigation = useNavigation();

  const [name, setName] = useState(null);
  const [job, setJob] = useState(null);
  const [website, setWebsite] = useState(null);
  const [contact1, setContact1] = useState(null);
  const [email, setEmail] = useState(null);
  const {addContact} = useData();

  console.log('test website', route.params);

  const SaveData = async () => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        name: name,
        job: job,
        website: website,
        contact1: contact1,
        email: email,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    addContact(contactDetails);
    setName('');
    setJob('');
    setWebsite('');
    setContact1('');
    setEmail('');
    alert('Contact Saved ');
    navigation.navigate('Home');
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
            <TextInput
              placeholder="Name"
              style={styles.inputStyle}
              value={name ? name : ''}
              onChangeText={text => {
                setName(text);
              }}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Job"
              style={styles.inputStyle}
              value={job ? job : ''}
              onChangeText={text => {
                setJob(text);
              }}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="website "
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
              style={styles.inputStyle}
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.btnDiv}>
          <Button text="save" icon="save" onPress={SaveData} />
          <Button
            text="repeat"
            icon="repeat"
            onPress={() => {
              navigation.navigate('Scan');
            }}
          />
          {/* <Button iconName={'save'} style={styles.Button} size={20}></Button>
          <Button iconName={'repeat'} style={styles.Button} size={20}></Button>  */}
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
});
