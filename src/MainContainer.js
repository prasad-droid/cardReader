import {useState, useEffect,useContext,createContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {FIREBASE_AUTH} from './firebaseConfig';
import {onAuthStateChanged} from 'firebase/auth';
import {DataContext} from './screens/Context'
// Screens
import FirstScreen from './screens/FirstScreen';
import Home from './screens/Home';
import Contact from './screens/Contact';
import Scan from './screens/Scan';
import Login from './screens/login';
import Button from './screens/Button';
import Register from './screens/Register';


// constructor( initalization )
const auth = FIREBASE_AUTH;
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Screen Names
const firstScreen = 'first';
const loginScreen = 'Login';
const RegisterScreen = 'Register';
const homeTab = 'Home';
const scanTab = 'Scan';
const contactTab = 'Contact';

export function MainContainer() {
  let Screen;
  const [loggedIn, setloggedIn] = useState(false);
  // check wheater user is loggedIn
  const isLoggedIn = useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, user => {
      setloggedIn(user);
    });
  }, []);

  // Log out btn
  const logout = ()=>{
    alert("User Logged Out")
    FIREBASE_AUTH.signOut()
  }

  // Main Application
  const MainApp = ({route}) => {
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
        <Tab.Screen name={homeTab} component={Home}  />
        <Tab.Screen name={scanTab} component={Scan}  />
        <Tab.Screen name={contactTab} component={Contact}  />
      </Tab.Navigator>
    );
  };
  
  // set screen if user is logged in
  {
    loggedIn
      ? (Screen = (
          <Stack.Group>
            <Stack.Screen
              name="main"
              component={MainApp}
              options={{headerShown:false}}
              initialParams={loggedIn}
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
    <DataContext.Provider value={loggedIn}>
      <NavigationContainer>
          <Stack.Navigator>{Screen}</Stack.Navigator>
      </NavigationContainer>
    </DataContext.Provider>
    </>
  );
}

