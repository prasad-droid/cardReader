import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome6';

import {DataProvider} from './screens/Context';
import FirstScreen from './screens/FirstScreen';
import Home from './screens/Home';
import Contact from './screens/Contact';
import Scan from './screens/Scan';
import LoginRegister from './screens/loginRegister';
 
const [isLoggedIn, setIsLoggedIn] = useState(false);
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const firstScreen = 'first';
const login = 'Login';
const homeTab = 'Home';
const scanTab = 'Scan';
const contactTab = 'Contact';

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
      })}>
      <Tab.Screen name={homeTab} component={Home} />
      <Tab.Screen name={scanTab} component={Scan} />
      <Tab.Screen name={contactTab} component={Contact} />
    </Tab.Navigator>
  );
};

export function MainContainer() {
  {isLoggedIn ? 
    Screen = (
    <Stack.Group>
      <Stack.Screen name="main" component={MainApp} />
    </Stack.Group>
  ) : Screen = (
    <Stack.Group>
      <Stack.Screen name={firstScreen} component={FirstScreen} />
      <Stack.Screen name={login} component={LoginRegister} />
    </Stack.Group>
  )}
  return (
    <>
      <NavigationContainer>
        <DataProvider>
          <Stack.Navigator>
            
          </Stack.Navigator>
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
