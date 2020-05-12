import Axios from 'axios';

export const innitialState = {
    username:'',
    messageInput:'',
    currentTime:'',
    isLogin:false,
    connecting:true,
    chatMessage: '',
    roomNotification: [],
    broadcastMessage: [],
    error: '',
    bottom: false,
    openNotifications: false,
    channelConnected: false,
    bellRing: false,
    inputRoom:'',
}

const connectReducer =(state=innitialState,action)=>{
    if(action.type==='CONNECT'){
        console.log(action.data)
        return{
            ...state,
            username: action.data,
            channelConnected: true
        }
    }
    if(action.type==='ON_MESSAGE_RECEIVED'){
        console.log("message type")
        console.log(action.message.type)
        if (action.message.type === 'JOIN') {
            // this.fetchHistory();
            Axios.get("http://10.10.12.31:3939/historyPrivate/"+this.state.inputRoom)
                .then(result=>{
                    console.log(result.data)
                    result.data.map(hasil=>{
                        let messageCopy = this.state.broadcastMessage
                        messageCopy.push({
                            // id:result.data.id,
                            message: hasil.content,
                            sender: hasil.sender,
                            dateTime: hasil.date
                        })
                        this.setState({
                            broadcastMessage: messageCopy,
                        })
                    })
                })
            // if(this.state.roomNotification!=null){
            //     this.state.roomNotification.push({ sender: action.message.sender + " ~ joined", status: 'online', dateTime: action.message.dateTime })
            // }
            // this.setState({
            //     roomNotification: this.state.roomNotification,
            //     bellRing: true
            // })

            let messageCopy = this.state.broadcastMessage
            messageCopy.push({
                message: action.message.sender + " ~ Joined",
                dateTime: action.message.dateTime
            })
            this.setState({
                broadcastMessage: messageCopy,
            })

        }
        else if (action.message.type === 'LEAVE') {
            this.state.roomNotification.map((notification, i) => {
                if (notification.sender === action.message.sender + " ~ joined") {
                    notification.status = "offline";
                    notification.sender = action.message.sender + " ~ left";
                    notification.dateTime = action.message.dateTime;
                }
            })
            this.setState({
                roomNotification: this.state.roomNotification,
                bellRing: true
            })
        }
        else if (action.message.type === 'TYPING') {

            this.state.roomNotification.map((notification, i) => {
                if (notification.sender === action.message.sender + " ~ joined") {
                    if (action.message.content)
                        notification.status = "typing...";
                    else
                        notification.status = "online";
                }

            })
            this.setState({
                roomNotification: this.state.roomNotification
            })
        }
        else if (action.message.type === 'CHAT') {

            this.state.roomNotification.map((notification, i) => {
                if (notification.sender === action.message.sender + " ~ joined") {
                    notification.status = "online";
                }
            })
            this.state.broadcastMessage.push({
                message: action.message.content,
                sender: action.message.sender,
                dateTime: action.message.dateTime
            })
            this.setState({
                broadcastMessage: this.state.broadcastMessage,

            })
        }
        else {
            // do nothing...
        }
    }
    return state;
}
export default connectReducer;

