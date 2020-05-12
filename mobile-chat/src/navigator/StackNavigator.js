import React from 'react';

import LoginScreen from "../screens/Login/LoginScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ChatScreen from "../screens/Chat/ChatScreen";
import NewChat from "../screens/NewChat/NewChat";
import ChatScreenNew from "../screens/NewChat/ChatScreenNew";
import RegistrationScreen from "../screens/Registration/RegistrationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import AddFriends from "../screens/AddFriends/AddFriends";
import ChatGroup from "../screens/ChatGroup/ChatGroup";
import ChatGroupNew from "../screens/NewChat/ChatGroupNew";
import ListEvent from "../screens/Events/ListEvent";
import EventScreen from "../screens/Events/EventScreen";
import EventView from "../screens/Events/EventView";
import FriendsScreen from "../screens/Friends/FriendsScreen";
import NewGroupScreen from "../screens/NewGroup/NewGroupScreen";
import GroupInfo from "../screens/GroupInfo/GroupInfo";
import AddParticipants from "../screens/GroupInfo/AddParticipants";

const Stack = createStackNavigator();

class StackNavigator extends React.Component {
    render() {
        return (
            <Stack.Navigator headerMode="none">

                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
                <Stack.Screen name="NewChatScreen" component={NewChat} />
                <Stack.Screen name="ChatScreenNew" component={ChatScreenNew} />
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="AddFriendsScreen" component={AddFriends} />
                <Stack.Screen name="ChatGroupScreen" component={ChatGroup} />
                <Stack.Screen name="ChatGroupNew" component={ChatGroupNew} />
                <Stack.Screen name="Events" component={ListEvent} />
                <Stack.Screen name="New Event" component={EventScreen} />
                <Stack.Screen name="Event View" component={EventView} />
                <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
                <Stack.Screen name="NewGroupScreen" component={NewGroupScreen} />
                <Stack.Screen name="Group Info" component={GroupInfo} />
                <Stack.Screen name="AddParticipants" component={AddParticipants} />
            </Stack.Navigator>
        );
    }
}
export default StackNavigator
