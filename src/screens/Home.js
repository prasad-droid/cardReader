import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import Card from './Card';
import { useData } from './Context';  


export default function Home() {
  
  const { contactData } = useData();
  console.log(contactData);
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/appicon.png')} resizeMode="contain" style={styles.image}>
          <ScrollView style={styles.ScrollView} vertical={true} >
            {
              contactData.map((element)=>{
                return <Card key={element.contact1} Cname={element.name} email={element.email} Contact={element.contact1} all={element}/>
              })
            }
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  main: {
    flexDirection: 'column',
    flex: 1,
  },
  ScrollView:{
    backgroundColor:"#00000070",
    paddingHorizontal: 10,
  },
  Button: {
    padding: 25,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});
