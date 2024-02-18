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
export default function Card({Cname, email, Contact}) {
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    console.log('clicked');
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Editing Contact
  const EditContact = () => {
    
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <Image
            source={require('../assets/Profileicon.png')}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.text}>Name: {Cname}</Text>
            <Text style={styles.text}>Contact: {Contact}</Text>
            <Text style={styles.text}>Email: {email}</Text>
          </View>
          <TouchableOpacity onPress={toggleMenu}>
            <Icon
              name={'ellipsis-vertical'}
              style={{fontSize: 18, padding: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              EditContact();
            }}>
            <Icon name={'pen'} style={{fontSize: 18, padding: 10}} />
          </TouchableOpacity>
          {menuOpen && (
            <View style={styles.menu}>
              <TouchableOpacity onPress={() => makeCall(Contact)}>
                <Text style={styles.menuItem}>Call</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => whatsappMsg(Contact)}>
                <Text style={styles.menuItem}>WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => sendEmail(email)}>
                <Text style={styles.menuItem}>Email</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => shareContact(Cname, Contact, email)}>
                <Text style={styles.menuItem}>Share</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#eee',
    margin: 10,
    borderRadius: 10,
    flexDirection: 'column',
    position: 'relative',
    elevation: -2,
    zIndex: -10,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
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
    color: '#000',
    textTransform: 'capitalize',
  },
});
