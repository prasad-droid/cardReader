// FilterModal.js
import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

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
});

export default FilterModal;
