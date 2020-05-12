import React from 'react';
import Native from 'react-native';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { DrawerItem } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import {connect} from 'react-redux'
import { DrawerActions, } from '@react-navigation/native';

const styles = Native.StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        backgroundColor: '#363062'
    },
    userInfo: {
        marginTop: 40,
        marginBottom: 25,
        alignSelf: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 25,
        marginTop: 10,
        fontWeight: 'bold',
        color: "#fff"
    },
    caption: {
        fontSize: 14,
        color: "#fff",

    },
    drawerSection: {
        marginTop: 10,
        marginLeft: 5,
    },
});

class DrawerContent extends React.Component{
    async componentDidMount(){

    }

render(){
            return (
                <Native.View {...this.props}>
                    <Native.View style={styles.userInfoSection}>
                        <Native.View style={styles.userInfo}>
                            <Avatar.Image source={{ uri: "https://i.pravatar.cc/100?img=2" }} size={100} />
                            <Title style={styles.title}>{this.props.fullName}</Title>
                            <Caption style={styles.caption}>{this.props.username}</Caption>
                        </Native.View>
                    </Native.View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem label="Profile" icon={() => (<Icon name="person" />)}
                                    onPress={() =>  this.props.navigation.dispatch(DrawerActions.jumpTo('ProfileScreen', )) }/>

                        <DrawerItem label="Friends" icon={() => (<Icon name="group" />)}
                                    onPress={() => this.props.navigation.navigate('FriendsScreen', )} />

                        <DrawerItem label="New Chat" icon={() => (<Icon name="chat-bubble-outline" />)}
                                    onPress={() => this.props.navigation.navigate('NewChatScreen',{result:this.props.username})} />

                        <DrawerItem label="Add Friends" icon={() => (<Icon name="person-add" />)}
                                    onPress={() => this.props.navigation.navigate('AddFriendsScreen', )} />

                        <DrawerItem label="Settings" icon={() => (<Icon name="settings" />)}
                                    onPress={() => { this.props.navigation.navigate('SettingsScreen') }} />

                        <DrawerItem label="Help" icon={() => (<Icon name="live-help" />)}
                                    onPress={() => { this.props.navigation.navigate('HelpScreen') }} />
                    </Drawer.Section>
                </Native.View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.loginReducer.username,
        fullName: state.loginReducer.fullName,
    }
}
export default connect(mapStateToProps)(DrawerContent);
