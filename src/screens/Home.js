import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Button from './Button';
import {doc, getDoc, getDocFromCache} from 'firebase/firestore';
import {DataContext} from './Context';
import Card from './Card';
import {db} from '../firebaseConfig';

export default Home = () => {
  const user = useContext(DataContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const docRef = doc(db, 'users', user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const allContacts = docSnap.data().contacts || [];
        console.log('Docs  :' + JSON.stringify(allContacts));
        setFilteredData(allContacts);
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

  useEffect(() => {
    fetchData();
  }, []);

  // function to handle Refresh
  const handleRefresh = () => {
    setSearchInput('');
    fetchData();
  };

  // function to handle SearchInput 
  const handleSearch = () => {
    const searchTerm = searchInput.toLowerCase();
    if(searchTerm.length == 0){
      fetchData();
    }else{
      const filtered = filteredData.filter(contact => {
        return (
          contact.name.toLowerCase().includes(searchTerm) ||
          contact.email.toLowerCase().includes(searchTerm) ||
          contact.contact1.toLowerCase().includes(searchTerm)
          );
        });
        setFilteredData(filtered);
      }

  };

  const handleFilter = () => {};
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/appicon.png')}
          resizeMode="contain"
          style={styles.image}>
          <View style={styles.topNav}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchInput}
              onChangeText={text => setSearchInput(text)}
              onSubmitEditing={handleSearch}
            />
            <Button icon="arrows-rotate" onPress={handleRefresh}></Button>
            <Button icon="filter" onPress={handleFilter} />
          </View>
          {loading ? (
            <Text style={styles.emptyText}>Loading...</Text>
          ) : error ? (
            <Text style={styles.errorText}>Error: {error}</Text>
          ) : filteredData.length > 0 ? (
            <ScrollView style={styles.scrollView} vertical={true}>
              {filteredData.map((contact, index) => (
                <Card
                  key={index}
                  Cname={contact.name}
                  email={contact.email}
                  Contact={contact.contact1}
                />
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
    backgroundColor: '#0004',
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
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
  topNav: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInput: {
    color: 'black',
    width: 250,
    backgroundColor: 'white',
    borderRadius: 12,
  },
});
