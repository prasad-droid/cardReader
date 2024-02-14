import {
  View,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import Button from './Button';
import {collection,doc, getDoc, setDoc, Timestamp} from 'firebase/firestore';
import {db} from '../firebaseConfig';
import {DataContext} from './Context';

export default function Contact({route}) {
  const navigation = useNavigation();
  const [name, setName] = useState(route.params?.name);
  const [job, setJob] = useState(route.params?.job);
  const [website, setWebsite] = useState(route.params?.website);
  const [contact1, setContact1] = useState(route.params?.contact1);
  const [email, setEmail] = useState(route.params?.email);
  const user = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  const SaveData = async () => {
    const userEmail = user.email;
    const docRef = doc(db, "users", userEmail); // docReference
    setLoading(true)
    try {
      const docSnap = await getDoc(docRef); //getting data
      let contact = {
        "name":name?name:'',
        "job":job?job:'',
        "website":website?website:'',
        "contact1":contact1?contact1:'',
        "email" : email?email:'',
        "time": Timestamp.now()
      }
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data()['contacts']);
        const prevData = docSnap.data()['contacts']
        // setDoc(doc(collection(db,'collectionName'), documentID),{key:value}
        
        console.log(prevData);
        await setDoc(doc(collection(db,'users'), userEmail), {"contacts": [...prevData,contact]})
      } else {
        await setDoc(doc(collection(db,'users'), userEmail), {"contacts": [contact]});
      }
      console.log('Contact Saved');
      //clear fields
      setName('');
      setJob('');
      setWebsite('');
      setContact1('');
      setEmail('');
      navigation.navigate('Home');
    } catch (e) {
      console.error('Error adding document: ', e);
    }finally{
      setLoading(false)
    }
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
              value={name}
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
