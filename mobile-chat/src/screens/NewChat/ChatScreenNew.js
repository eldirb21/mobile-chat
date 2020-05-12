import React from 'react';
import Native from 'react-native';
import {Button, TextInput} from "react-native-paper";
import Axios from "axios";
import {connect} from 'react-redux';
import NavBar from "../../components/NavBar/NavBar";

const css = Native.StyleSheet.create({
    input : {
        width: '100%',
        height:50
    }
})

// import * as NavigationActions from "react-navigation";


import {CommonActions, StackActions} from '@react-navigation/native';
import CardMessage from "../../components/CardMessage/CardMessage";
import {log} from "react-native-reanimated";
import moment from "moment";
import CardMessageSender from "../../components/CardMessage/CardMessageSender";


let stompClient=null;
class ChatScreenNew extends React.Component{

    state={
        broadcastMessage:[],
        messageInput:[],
    }


    async componentDidMount() {
        const {res} = this.props.route.params;
        await Axios.get('http://10.10.12.31:3939/historyPrivate/' + res.userOne.username + '/' + res.userTwo.username + '/')
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
        const {res} = this.props.route.params;
        if(res.userOne.username){
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
        const {res} = this.props.route.params;

        // Subscribing to the private topic
        // stompClient.subscribe('/user/queue/reply', this.onMessageReceived);
        stompClient.subscribe("/topic/messages/" + res.userOne.username, this.onMessageReceived);

        // Registering user to server as a private chat user
        stompClient.send('/app/addPrivateUser', {}, JSON.stringify({sender: res.userOne.username, type: 'JOIN'}));



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
        const {res} = this.props.route.params;
        if (stompClient) {
            var chatMessage = {
                sender: res.userOne.username,
                receiver: res.userTwo.username,
                content: value,
                type: type
            };

            // await stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage));
            await stompClient.send('/app/ws/' + res.userTwo.username, {}, JSON.stringify(chatMessage));

            let copy = this.state.broadcastMessage;
            copy.push(chatMessage);
            this.setState({
                broadcastMesssage:copy
            })

        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const {res} = this.props.route.params;
        return (
            <React.Fragment>
                <NavBar
                    name={res.userTwo.username}
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
                        this.props.navigation.navigate(this.state.labels[label.index],{res:res,res2:res});
                    }}
                />
                <Native.ScrollView style={{height:'80%'}}
                                   ref={(ref) => (this.scrollView = ref)}
                                   onContentSizeChange={(contentWidth, contentHeight) => {
                                       this.scrollView.scrollResponderScrollToEnd({animated: true});
                                   }}>
                    {this.state.broadcastMessage.map(result=>(
                        // const date = new Date(res)

                        // mung nambahi tampilan chat, data.ne rung
                        // sender receiver jg rung,
                        // pas login beda akun, chat.e rung metu
                        // jam 5.30

                        <>
                        {result.sender==this.props.username?(
                            <>

                            {/*<Native.Text style={{fontWeight:"bold",textAlign:"right"}}>{result.sender}</Native.Text>*/}
                            {/*<Native.Text style={{textAlign:"right", fontWeight: 'bold', backgroundColor: 'grey'}}>date: {new Date(result.dateTime)}</Native.Text>*/}
                            {/*<CardMessage key={result.id} sender={result.sender} message={result.content} styles={{margin: 20}}/>*/}
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
                                {/*<CardMessage sender={result.sender}*/}
                                {/*             message={result.content}*/}
                                {/*             styles={{margin: 20}}/>*/}

                                {/*<Native.Text style={{fontWeight:"bold"}}>{result.sender}</Native.Text>*/}
                                {/*<Native.Text>{result.content}</Native.Text>*/}
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
                    <Button onPress={()=>this.sendMessage("CHAT",this.state.messageInput)}>
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
export default connect(mapStateToProps)(ChatScreenNew);
