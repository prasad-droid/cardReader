import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { DataContext } from './Context';
import Card from './Card';
import { db } from '../firebaseConfig';

export default  Home = () => {
  const user = useContext(DataContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'users', user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          setData(docSnap.data());
        } else {
          console.log('No such document!');
          setError('No data found in Firestore');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data from Firestore');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/appicon.png')}
          resizeMode="contain"
          style={styles.image}>
          {loading ? (
            <Text style={styles.emptyText}>Loading...</Text>
          ) : error ? (
            <Text style={styles.errorText}>Error: {error}</Text>
          ) : data && data.contacts && data.contacts.length > 0 ? (
            <ScrollView style={styles.scrollView} vertical={true}>
              {data.contacts.map((contact, index) => (
                <Card key={index} Cname={contact.name} email={contact.email} Contact={contact.contact1}  />
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.emptyText}>Empty Directory</Text>
          )}
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  main: {
    flexDirection: 'column',
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#00000070',
    paddingHorizontal: 10,
  },
  emptyText: {
    color: 'black',
    backgroundColor:'#0004',
    fontSize: 18,
    textAlign: 'center',
    padding:10,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
