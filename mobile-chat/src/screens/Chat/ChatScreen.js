import React from 'react';
import Native from 'react-native';
import {Button, TextInput} from "react-native-paper";
import Axios from "axios";
import {connect} from 'react-redux';
import {SearchBar} from "react-native-elements";
import NavBar from "../../components/NavBar/NavBar";
import {sendMessage} from "../../redux/actions/connects";
import moment from 'moment';

const css = Native.StyleSheet.create({
    input : {
        width: '100%',
        height:50
    }
})

// import * as NavigationActions from "react-navigation";

import { StackActions } from '@react-navigation/native';

import { CommonActions } from '@react-navigation/native';

import CardMessage from "../../components/CardMessage/CardMessage";
import {log} from "react-native-reanimated";
import CardMessageSender from "../../components/CardMessage/CardMessageSender";

let stompClient=null;
class ChatScreen extends React.Component{



    state={
        broadcastMessage:[],
        labels: ["Search", "Mute", "Events", "Clear history", "Todos"],
        messageInput:[],
    }

    sender(){
        const {res2} = this.props.route.params;
        if (res2.sender!=this.props.username){
            return res2.receiver;
        } else return res2.sender;
    }

    receiver(){
        const {res2} = this.props.route.params;
        if (res2.receiver!=this.props.username){
            return res2.receiver;
        } else return res2.sender;
    }

    async componentDidMount() {
        await Axios.get('http://10.10.12.31:3939/historyPrivate/' + this.sender() + '/' + this.receiver() + '/')
            .then(res => {
                console.log(res.data);
                this.setState({
                    broadcastMessage: res.data,
                });
            }).catch(err => console.log("Couldn't fetch data, Error: " + err)
        )
        this.connect();
    }

    connect(){
        if(this.sender()){
            var Stomp = require('stompjs/lib/stomp.js').Stomp;
            var SockJS = require('sockjs-client')
            SockJS = new SockJS('http://10.10.12.31:3939/ws/')
            stompClient = Stomp.over(SockJS);
            if(stompClient.status !== 'CONNECTED') {
                console.log("connecting now")
                stompClient.connect({}, this.onConnected, this.onError);
            }
        }
    }

    onConnected = () => {
        // Subscribing to the private topic
        // stompClient.subscribe('/user/reply', this.onMessageReceived);
        stompClient.subscribe("/topic/messages/" + this.sender(), this.onMessageReceived);

        // Registering user to server as a private chat user
        stompClient.send('/app/addPrivateUser', {}, JSON.stringify({sender: this.sender(), type: 'JOIN'}))
    }


    onMessageReceived = (payload) => {
        var message = JSON.parse(payload.body);
        if (message.type === 'CHAT') {
            // console.log(message,"test chat push")
            let copy = this.state.broadcastMessage;
            copy.push({
                content: message.content,
                sender: message.sender,
                receiver:message.receiver,
                dateTime: message.dateTime
            })
            this.setState({
                ...this.state,
                broadcastMessage:copy,
            })
            // PushNotification.localNotification({
            //     /* iOS and Android properties */
            //     title: message.sender, // (optional)
            //     message: message.content, // (required)
            // });
        }
        else if (message.type === 'LEAVE') {
            this.state.roomNotification.map((notification, i) => {
                if (notification.sender === message.sender + " ~ joined") {
                    notification.status = "offline";
                    notification.sender = message.sender + " ~ left";
                    notification.dateTime = message.dateTime;
                }
            })
            this.setState({
                ...this.state,
                roomNotification: this.state.roomNotification,
                bellRing: true
            })
        }
    }


    sendMessage = async (type, value) => {
        if (stompClient) {
            var chatMessage = {
                sender: this.sender(),
                receiver: this.receiver(),
                content: value,
                type: type
            };

            // await stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage));
            await stompClient.send('/app/ws/' + this.receiver(), {}, JSON.stringify(chatMessage));

            let copy = this.state.broadcastMessage;
            copy.push(chatMessage);
            this.setState({
                broadcastMesssage:copy
            })

        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let {res,res2} = this.props.route.params;
        return (
            <React.Fragment>
                <NavBar
                    name={this.receiver()}
                    icon="arrow-back"
                    right={{
                        menu: {
                            icon: "more-vert",
                            labels: this.state.labels,
                        },
                    }}
                    onLeftElementPress={() => this.props.navigation.dispatch(
                        StackActions.replace('HomeScreen',)
                    ) }
                    onRightElementPress={(label) => {
                        this.props.navigation.navigate(this.state.labels[label.index],{res:res,res2:res2});
                    }}

                />

                <Native.ScrollView contentContainerStyle={{ flexDirection: 'column', justifyContent: 'flex-start'}}
                                   ref={(ref) => (this.scrollView = ref)}
                                   onContentSizeChange={(contentWidth, contentHeight) => {
                                       this.scrollView.scrollResponderScrollToEnd({animated: true});
                                   }}
                >
                    {/*{console.log(this.state.broadcastMessage,"check udah masuk state apa nggga")}*/}
                    {this.state.broadcastMessage.map(result=>(
                        // const date = new Date(res)

                        <>
                        {result.sender!==this.props.username?(
                            <>
                                <Native.View
                                    key={result.id}
                                    style={{alignSelf: 'flex-start', marginVertical: '3%'}}>
                                    <CardMessage
                                        key={result.id}
                                        sender={result.sender}
                                        hour={
                                            new Date(moment(result.dateTime)).getHours() +
                                            ':' +
                                            new Date(moment(result.dateTime)).getMinutes()
                                        }
                                        message={result.content}
                                    />
                                </Native.View>
                            </>
                        ) : (
                            <>
                                <Native.View
                                    key={result.id}
                                    style={{alignSelf: 'flex-end', marginVertical: '3%'}}>
                                    <CardMessageSender
                                        key={result.id}
                                          sender={result.sender}
                                        hour={
                                            new Date(moment(result.dateTime)).getHours() +
                                            ':' +
                                            new Date(moment(result.dateTime)).getMinutes()
                                        }
                                        message={result.content}
                                    />
                                </Native.View>
                            </>
                        )}

                        </>
                    ))}
                </Native.ScrollView>
                <Native.View style={{
                    justifyContent: 'flex-end',
                }}>
                    <TextInput
                        style={css.input}
                        label='Text Message'
                        onChangeText={text => this.setState({ messageInput:text })}
                    />
                    <Button onPress={event => this.sendMessage("CHAT",this.state.messageInput)}>
                        Send
                    </Button>
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
export default connect(mapStateToProps)(ChatScreen);
