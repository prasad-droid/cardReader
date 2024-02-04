import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [contactData, setContactData] = useState([]);

  // Load data from AsyncStorage when the component mounts
  useEffect(() => {
    const loadContactData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('contactData');
        if (storedData) {
          setContactData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error loading  data from AsyncStorage: ', error);
      }
    };

    loadContactData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Save data to AsyncStorage whenever contactData changes
  useEffect(() => {
    const saveContactData = async () => {
      try {
        await AsyncStorage.setItem('contactData', JSON.stringify(contactData));
      } catch (error) {
        console.error('Error saving data to AsyncStorage: ', error);
      }
    };

    saveContactData();
  }, [contactData]);

  const addContact = (contact) => {
    setContactData((prevData) => [...prevData, contact]);
  };

  return (
    <DataContext.Provider value={{ contactData, addContact }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
