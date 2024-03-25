import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {onAuthStateChanged} from 'firebase/auth';
import {FIREBASE_AUTH} from './firebaseConfig';
import {DataContext} from './screens/Context';

// Screens
import FirstScreen from './screens/FirstScreen';
import Home from './screens/Home';
import Contact from './screens/Contact';
import Scan from './screens/Scan';
import Login from './screens/login';
import Register from './screens/Register';
import EditScreen from './screens/EditScreen';

// constructor( initialization )
const auth = FIREBASE_AUTH;
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Screen Names
const firstScreen = 'first';
const loginScreen = 'Login';
const RegisterScreen = 'Register';
const homeTab = 'Home';
const scanTab = 'Scan';
const contactTab = 'Contact';

export function MainContainer() {
  const [loggedIn, setLoggedIn] = useState(false);

  // check whether the user is loggedIn
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setLoggedIn(user);
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  const logout = () => {
    alert('User Logged Out');
    auth.signOut();
  };

  const MainApp = ({navigation}) => {
    return (
      <Tab.Navigator
        initialRouteName={homeTab}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size = 28}) => {
            let iconName;
            let rn = route.name;
            if (rn === homeTab) {
              iconName = 'house';
            } else if (rn === scanTab) {
              iconName = 'camera';
            } else if (rn === contactTab) {
              iconName = 'person';
            }
            return <Icon name={iconName} size={size} color="#AEAEAE" />;
          },
        })}>
        <Tab.Screen
          name={homeTab}
          component={Home}
          options={{
            headerShown: false,
            tabBarStyle: {backgroundColor: '#E4E4E4'},
          }}
        />
        <Tab.Screen
          name={scanTab}
          component={Scan}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name={contactTab}
          component={Contact}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    );
  };

  const DrawerContent = (props, {navigation}) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label={() => (
            <Text style={{color: '#333', fontSize: 12}}>Settings</Text>
          )}
        />
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => {
            logout();
            // navigation.closeDrawer();
          }}
        />
      </DrawerContentScrollView>
    );
  };
  const drawerOption = {
    headerStyle: {
      backgroundColor: '#449AE9',
    },
    headerTitleStyle: {
      color: '#fff',
    },
  };
  return (
    <DataContext.Provider value={loggedIn}>
      <NavigationContainer>
        {loggedIn ? (
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen
              name="CX Card Scan"
              component={MainApp}
              options={drawerOption}
            />
            <Drawer.Screen
              name="Language"
              component={LanguageScreen}
              options={drawerOption}
            />
            <Drawer.Screen
              name="Rate Us On Google"
              component={RateUsScreen}
              options={drawerOption}
            />
            <Drawer.Screen
              name="Contact us"
              component={LanguageScreen}
              options={drawerOption}
            />
            <Drawer.Screen
              name="Feedback"
              component={LanguageScreen}
              options={drawerOption}
            />
            <Drawer.Screen
              name="Share with Friends"
              component={LanguageScreen}
              options={drawerOption}
            />
            <Drawer.Screen
              name="Edit"
              component={EditScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                headerStyle: {
                  backgroundColor: '#449AE9',
                },
                headerTitleStyle: {
                  color: '#fff',
                },
              }}
            />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator>
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
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </DataContext.Provider>
  );
}

// Placeholder components for drawer screens
const LanguageScreen = () => <Text>Language Screen</Text>;
const RateUsScreen = () => <Text>Rate Us Screen</Text>;
// Add more placeholder components for other drawer screens
