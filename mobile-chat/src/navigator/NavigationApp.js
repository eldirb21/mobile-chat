import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from './DrawerContent';
import StackNavigator from "./StackNavigator";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Drawer = createDrawerNavigator();

class NavigationApp extends React.Component {
    render() {
        return (
            <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen name="StackNavigator" component={StackNavigator} />
                <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
            </Drawer.Navigator>
        );
    }
}
export default NavigationApp
