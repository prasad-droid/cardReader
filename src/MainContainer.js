import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome6';

import {DataProvider} from './screens/Context';
import FirstScreen from './screens/FirstScreen';
import Home from './screens/Home';
import Contact from './screens/Contact';
import Scan from './screens/Scan';
import Login from './screens/login';
import Button from './screens/Button';
import Register from './screens/Register';
import {FIREBASE_AUTH} from './firebaseConfig';
import {onAuthStateChanged} from 'firebase/auth';

const auth = FIREBASE_AUTH;
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const firstScreen = 'first';
const loginScreen = 'Login';
const RegisterScreen = 'Register';
const homeTab = 'Home';
const scanTab = 'Scan';
const contactTab = 'Contact';

export function MainContainer() {
  const [loggedIn, setloggedIn] = useState(false);
  const isLoggedIn = useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, user => {
      console.log(user);
      setloggedIn(user);
    });
  }, []);

  const logout = ()=>{
    alert("User Logged Out")
    FIREBASE_AUTH.signOut()
  }

  const MainApp = () => {
    return (
      <Tab.Navigator
        initialRouteName={homeTab}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size = 28}) => {
            let iconName;
            let rn = route.name;
            if (rn == homeTab) {
              iconName = 'house';
            } else if (rn == scanTab) {
              iconName = 'camera';
            } else if (rn == contactTab) {
              iconName = 'person';
            }
            return <Icon name={iconName} size={size} color="black" />;
          },
          headerRight: () => (
            <Button
              onPress={logout}
              text="Logout"
              color="#fff"
            />
          ),
          // headerShown:false
        })
        
        }>
        <Tab.Screen name={homeTab} component={Home} />
        <Tab.Screen name={scanTab} component={Scan} />
        <Tab.Screen name={contactTab} component={Contact} />
      </Tab.Navigator>
    );
  };
  let Screen;
  {
    loggedIn
      ? (Screen = (
          <Stack.Group>
            <Stack.Screen
              name="main"
              component={MainApp}
              options={{headerShown:false}}
              />
          </Stack.Group>
        ))
      : (Screen = (
          <Stack.Group>
            <Stack.Screen
              name={firstScreen}
              component={FirstScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={loginScreen}
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={RegisterScreen}
              component={Register}
              options={{headerShown: false}}
            />
          </Stack.Group>
        ));
  }

  return (
    <>
      <NavigationContainer>
        <DataProvider>
          <Stack.Navigator>{Screen}</Stack.Navigator>
        </DataProvider>
      </NavigationContainer>
    </>
  );
}
{
  /* <Stack.Screen name=" " component={FirstScreen} options={{ headerShown: false }} />
<Stack.Screen name={login} component={LoginRegister} />
<Stack.Screen name="CX Card Scan" component={MainApp} /> */
}
