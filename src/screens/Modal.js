// FilterModal.js
import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet,TextInput} from 'react-native';

const FilterModal = ({visible, closeModal, applyFilter, uniqueMonths}) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleApplyFilter = () => {
    applyFilter(selectedMonth);
    closeModal();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Month</Text>
          {uniqueMonths.map(month => (
            <TouchableOpacity
              key={month}
              style={styles.monthButton}
              onPress={() => setSelectedMonth(month)}>
              <Text style={styles.monthText}>{month}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyFilter}>
            <Text style={styles.applyText}>Apply Filter</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const AddressModal = ({ isVisible, onClose, onSave,add}) => {
  const [address, setAddress] = useState(add);
  const [temp, setTemp] = useState('');
  
  const handleSave = add => {
    // Validate the add if needed
    // Save the address or perform any other action
    onSave(add);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select Address:</Text>
          {address.map(addressItem => (
            <TouchableOpacity
              key={addressItem}
              style={styles.monthButton}
              onPress={() => setTemp(addressItem)}>
              <Text style={styles.monthText}>{addressItem}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  monthButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  monthText: {
    fontSize: 16,
    color:'#000'
  },
  applyButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  applyText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeText: {
    color: 'red',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});



export {FilterModal,AddressModal};
