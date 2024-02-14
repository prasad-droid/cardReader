import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Text} from 'react-native'

export const Drawer = createDrawerNavigator();

export function SideBar() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Language" component={Feed} />
      <Drawer.Screen name="Rate Us On Google" component={Article} />
      <Drawer.Screen name="Notification" component={Article} />
      <Drawer.Screen name="Feedback" component={Article} />
      <Drawer.Screen name="Contact Us" component={Article} />  
      <Drawer.Screen name="Share With Friends" component={Article} />  
      <Drawer.Screen name="Term of Services" component={Article} />  
      <Drawer.Screen name="Privacy Policy" component={Article} />  
    </Drawer.Navigator>
  );
}