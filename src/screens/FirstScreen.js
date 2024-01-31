import {StyleSheet, View, Text, Image} from 'react-native';
import MultiSteps from 'react-native-multi-steps';
import { useNavigation } from '@react-navigation/native';

export default function FirstScreen() {
  const navigation = useNavigation();

  return (  
    <View style={styles.container}>
      <MultiSteps
        containerButtonStyle={styles.containerButtonStyle}
        onMoveNext={function (data) {
          console.log('next', data);
        }}
        onMovePrevious={function (data) {
          console.log('previous', data);
          navigation.navigate('CX Card Scan')
        }}
        onSubmit={function () {
          console.log('Submit');
          navigation.navigate('Login')
        }}>
        <View style={styles.container}>
          <Image
            source={require('../assets/Vector1.png')}
            style={{width: 250, height: 250}}
          />
          <Text
            style={{
              fontSize: 38,
              fontFamily: 'Poppins',
              textAlign: 'center',
              color: '#000',
            }}>
            Welcome to CX Card Scanner
          </Text>
          <Text
            style={{
              fontSize: 23,
              fontFamily: 'poppins',
              textAlign: 'center',
              marginTop: 15,
              color: '#000',
            }}>
            {' '}
            Scan Paper Business Card and convert them into actionable Phone
            Contact
          </Text>
        </View>
        {true && (
          <View style={styles.container}>
            <Image
              source={require('../assets/Vector2.png')}
              style={{width: 250, height: 250}}
            />
            <Text
              style={{
                fontSize: 30,
                fontFamily: 'Poppins',
                textAlign: 'center',
                color: '#000',
                fontWeight: 'bold',
              }}>
              Simple Bussiness Card Management
            </Text>
            <Text
              style={{
                fontSize: 23,
                fontFamily: 'poppins',
                textAlign: 'center',
                marginTop: 15,
                color: '#000',
              }}>
              {' '}
              Organize all your business cards in one place & use whenever you
              need them.
            </Text>
          </View>
        )}

        <View style={styles.container}>
          <Image
            source={require('../assets/Vector3.png')}
            style={{width: 250, height: 250}}
          />
          <Text
            style={{
              fontSize: 38,
              fontFamily: 'Poppins',
              textAlign: 'center',
              color: '#000',
              fontWeight:'bold'
            }}>
            Export & Share
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'poppins',
              textAlign: 'center',
              marginTop: 15,
              color: '#000',
            }}>
            Export your Scanned Cards CSV for outlook and google contacts. Share
            cards digitally with your Business Connections.
          </Text>
        </View>
      </MultiSteps>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  containerButtonStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 10,
    paddingRight: 30,
  },
});
