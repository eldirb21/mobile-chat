import React from 'react';
import Native from 'react-native';
import Axios from "axios";
import {connect} from 'react-redux'
import { Icon } from 'react-native-elements'

import CardChat from "../../components/CardChat/CardChat";
import NavBar from "../../components/NavBar/NavBar";
import fetchAccount from "../../redux/actions/fetchAccount";
import logout from "../../redux/actions/logout";

let stompClient = null;
exports.stompClient = stompClient;

const Styles = Native.StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        alignSelf: "flex-end",
        width: '15%',
        height: '8%',
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderRadius: 100,
    },

});


class HomeScreen extends React.Component{
    state = {
        lastChat: [],
        id: '',
        broadcastMessage:[],
    }
   async componentDidMount(): void {
        await this.props.dispatch(fetchAccount(this.props.username))
        Axios.get('http://10.10.12.31:3939/lastchat/'+this.props.username)
            .then(res => {
                console.log(res.data);
                this.setState({
                    lastChat: res.data,
                });
                // console.log(person);

            }).catch(err => console.log("Couldn't fetch data, Error: " + err)
        )
        // this.connect()
    }


    async fetchData(res){
        if(res.room===null){
            this.props.navigation.navigate('ChatScreen', {res2: res})
        } else {
            this.props.navigation.navigate('ChatGroupScreen', {res2: res})
        }
    }
    async logout(){
        await this.props.dispatch(logout());
        alert("Anda keluar dari Swipes chat!");
        this.props.navigation.navigate('LoginScreen',)
    }

    render() {
        return (
            <React.Fragment>
                <Native.View style={{ flex: 1 }}>
                    <NavBar
                        name="Swipes Chat"
                        icon="view-headline"
                        right="exit-to-app"
                        // onLeftElementPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                        onLeftElementPress={() => this.props.navigation.openDrawer()}
                        // onLeftElementPress={() => {this.props.navigation.openDrawer()}}
                        // onLeftElementPress={()=> this.props.navigation.openDrawer() }
                        // onLeftElementPress={() => {this.props.navigation.dispatch(DrawerActions.toggleDrawer())}}
                        onRightElementPress={() => this.logout()}
                    />
                    <Native.ScrollView>
                        {        this.state.lastChat.map(res => {
                            console.log(res.receiver,"check if user available")
                            return (
                                <CardChat key={new Date()} receiver={this.props.username!=res.receiver ? res.receiver : res.sender} id= {res.id} group={res.room} text={res.content} sender={res.sender}
                                          clicked={() => this.fetchData(res) } />
                            )
                        })}
                    </Native.ScrollView>

                    <Native.TouchableOpacity style={[Styles.button]}
                                      onPress={() => { this.props.navigation.navigate('NewChatScreen',{result:this.props.username}) }}>
                        <Icon raised name='colorize' color='green' />
                    </Native.TouchableOpacity>
                </Native.View>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        username: state.loginReducer.username,
        fullName: state.loginReducer.fullName,
    }
}
export default connect(mapStateToProps)(HomeScreen);
