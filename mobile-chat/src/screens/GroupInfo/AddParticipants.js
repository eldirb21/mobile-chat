import React from 'react';
import Native from 'react-native';
import {
    Input,
    Container,
    Content,
    Item,
    Text,
    Title,
    Thumbnail,
    Button,
    CardItem,
    Card,
    Body,
    ListItem, Left, Right, Col, List
} from 'native-base'
import NavBar from "../../components/NavBar/NavBar";
import Axios from "axios";
import {connect} from 'react-redux';
import Icon from "react-native-vector-icons/FontAwesome5";

class AddParticipants extends React.Component{

    state = {
        contactList:[],
    }

    componentDidMount(): void {
        Axios.get("http://10.10.12.31:3939/friends/"+this.props.username)
            .then(result=>{
                this.setState({
                    contactList:result.data
                })
            })
    }

    addParticipant(asd){
        const {res} = this.props.route.params;
        const post = {
            idGroup: res.id,
            username: asd
        }
        Axios.post(`http://10.10.12.31:3939/group/addUser`,post)
            .then(res=>{
                if(res.data.details=="200"){
                    alert( asd+" added to Group")
                }
            }).catch(err =>{
            alert("cant add to group, "+ "reason:"+err)
        })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Container>
                <NavBar
                    name="Add Participants"
                    icon="arrow-back"
                    onLeftElementPress={() => { this.props.navigation.goBack() }}
                />
                <Content>
                    <List>
                        {this.state.contactList.map(result=>(
                            <Native.TouchableOpacity>
                                <ListItem avatar onPress={() => { this.props.navigation.navigate('ChatScreenNew',{res:result})}}>
                                    <Left style={{borderBottomWidth: 0}}>
                                        <Thumbnail source={{ uri: 'https://i.pravatar.cc/100?img='+result.id }} />
                                    </Left>
                                    <Body style={{borderBottomWidth: 0}}>
                                        <Text>{result.userTwo.fullName}</Text>
                                    </Body>
                                    <Right style={{borderBottomWidth: 0}}>
                                        <Icon onPress={()=>this.addParticipant(result.userTwo.username)} style={{flex:1,justifyContent:'flex-end',alignSelf:'flex-end',alignItems:'flex-end'}} name="user-plus" size={25} color="black" />
                                    </Right>
                                </ListItem>
                            </Native.TouchableOpacity>
                        ))}
                    </List>
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        username: state.loginReducer.username,
        fullName: state.loginReducer.fullName,
    }
}
export default connect(mapStateToProps)(AddParticipants);
