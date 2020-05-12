import React from 'react';
import Native from 'react-native';
import {Button, TextInput} from "react-native-paper";
import Axios from "axios";
import {connect} from 'react-redux';
import {SearchBar} from "react-native-elements";
import NavBar from "../../components/NavBar/NavBar";
import {sendMessage} from "../../redux/actions/connects";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
import moment from "moment";
import CardMessageSender from "../../components/CardMessage/CardMessageSender";

let currentSubscription;
let stompClient=null;
class ChatGroup extends React.Component{

    state={
        broadcastMessage:[],
        messageInput:[],
        labels: ["Group Info", "Events", "Clear history", "Todos"],
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
        const {res2} = this.props.route.params;
        await Axios.get('http://10.10.12.31:3939/getAllChat/'+res2.room.id)
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
        const {res2} = this.props.route.params;
        if(res2.sender){
            var Stomp = require('stompjs/lib/stomp.js').Stomp;
            var SockJS = require('sockjs-client')
            SockJS = new SockJS('http://10.10.12.31:3939/ws')
            stompClient = Stomp.over(SockJS);
            stompClient.connect({}, this.onConnected, this.onError);
        }
    }

    onConnected = () => {
        const {res2} = this.props.route.params;
        const roomId = res2.room.id;
        cookies.set('roomId', roomId);
        // Subscribing to the private topic
        // stompClient.subscribe('/user/reply', this.onMessageReceived);

        let topic = `/app/chat/group/${roomId}`;


        if (currentSubscription) {
            currentSubscription.unsubscribe();
        }
        currentSubscription = stompClient.subscribe('/topic/messages/group/'+roomId, this.onMessageReceived);

        stompClient.send(`${topic}/addUser`,
            {},
            JSON.stringify({sender: this.state.username, type: 'JOIN'})
        );

    }


    onMessageReceived = (payload) => {
        var message = JSON.parse(payload.body);

        if (message.type === 'CHAT') {
            let copy = this.state.broadcastMessage;
            copy.push({
                content: message.content,
                sender: message.sender,
                dateTime: message.dateTime,
            })
            this.setState({
                broadcastMessage: copy,
            })
        }
        else if (message.type === 'JOIN') {
            // this.fetchHistory();
            this.setState({
                roomNotification: this.state.roomNotification,
                bellRing: true
            })
            let messageCopy = this.state.broadcastMessage
            messageCopy.push({
                content: message.sender + " ~ Joined",
                dateTime: message.dateTime
            })
            this.setState({
                broadcastMessage: messageCopy,
            })

        }

        else if (message.type === 'LEAVE') {
            this.setState({
                ...this.state,
                roomNotification: this.state.roomNotification,
                bellRing: true
            })
        }
    }


    sendMessage = async (type, value) => {
        const {res2} = this.props.route.params;
        if (stompClient) {
            var chatMessage = {
                sender: this.sender(),
                room:res2.room,
                content: value,
                type: type
            };

            // await stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage));
            await stompClient.send('/app/ws/group/' + res2.room.id+"/sendMessageGroup", {}, JSON.stringify(chatMessage));

        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let {res,res2} = this.props.route.params;
        return (
            <React.Fragment>
                <NavBar
                    name={res2.room.name}
                    icon="arrow-back"
                    right={{
                        menu: {
                            icon: "more-vert",
                            labels: this.state.labels,
                        },
                    }}

                    // onLeftElementPress={() => this.props.navigation.replace('HomeScreen') }
                    onLeftElementPress={() => this.props.navigation.dispatch(
                        StackActions.replace('HomeScreen',)
                    ) }
                    onRightElementPress={(label) => {
                        this.props.navigation.navigate(this.state.labels[label.index],{res:res2.room});
                    }}

                />

                <Native.ScrollView contentContainerStyle={{ flexDirection: 'column', justifyContent: 'flex-start'}}
                                   ref={(ref) => (this.scrollView = ref)}
                                   onContentSizeChange={(contentWidth, contentHeight) => {
                                       this.scrollView.scrollResponderScrollToEnd({animated: true});
                                   }}>
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
                            ):(
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
export default connect(mapStateToProps)(ChatGroup);
