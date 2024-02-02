import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator
  } from 'react-native';
  
  import {useState} from 'react';
  import {app} from '../firebaseConfig';
  import Button from './Button';
  import { useNavigation } from '@react-navigation/native';
  import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  
  export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
    const navigation = useNavigation();

    const handleSubmit = async ()=>{
        setLoading(true)
        try{
            const response = await createUserWithEmailAndPassword(auth,email,password);
            console.log(response);
            alert('User Created')
        }
        catch (err){
            alert('Sign Up Failed '+err.message)
        }finally{
            setLoading(false)
        }
    }

    return (
      <SafeAreaView>
        <Text style={styles.heading}>Register</Text>
        <Image source={require('../assets/Vector1.png')} style={styles.image} />
        <View style={styles.main}>
        <TextInput
            placeholder="Username"
            style={styles.inputStyle}
            value={username}
            autoCapitalize="none"
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            placeholder="Email ID"
            style={styles.inputStyle}
            value={email}
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            style={styles.inputStyle}
            value={password}
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
          />
  
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Button text={'Register'} onPress={handleSubmit}></Button>
            </>
          )}
          <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
            <Text>Already a User ?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    main: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: 250,
      objectFit: 'contain',
    },
    heading: {
      fontSize: 45,
      color: '#333',
      fontFamily: 'Poppins',
      textAlign: 'center',
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
  });
  