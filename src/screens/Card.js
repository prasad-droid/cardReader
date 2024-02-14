import {
  View,
  Image,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Button from './Button';

export default function Card({Cname, email, Contact}) {
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

  const whatsappMsg = number => {
    if (typeof number != 'string') {
      number = String(number);
      if (!number.startsWith('+91')) {
        number = '+91' + number;
      }
        const phoneNumber = `whatsapp://send?phone=${number}`;
        Linking.openURL(phoneNumber);
        console.log("Error Occured ", err);
    } else {
      console.error('Contact number is not a valid string');
    }
  };
  return (
    <View style={styles.card}>
      <Image
        source={require('../assets/Profileicon.png')}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.text}>Name : {Cname}</Text>
        <Text style={styles.text}>Contact : {Contact}</Text>
        <Text style={styles.text}>Email : {email}</Text>
      </View>
      <View style={styles.btnDiv}>
        <Button
          icon={'phone'}
          onPress={() => {
            makeCall(Contact);
          }}
        />
        <Button
          icon="whatsapp"
          onPress={() => {
            whatsappMsg(Contact);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#eee',
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    // height:100
  },
  image: {
    width: 80,
    height: 80,
    // backgroundColor:'#f00',
    borderRadius: 10,
  },
  content: {
    flexDirection: 'column',
    padding: 10,
    width: 200,
  },
  btnDiv: {
    padding: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems:"center"
  },
  text: {
    color: '#000',
    textTransform: 'capitalize',
  },
});
