import React from 'react'
import Native, {View} from 'react-native'
import NavBar from '../../components/NavBar/NavBar';
import Axios from 'axios';
import {Avatar} from 'react-native-paper';
import {Input,Container,Content,Item,Text,Title,Thumbnail,Button } from 'native-base'
import {Image} from "react-native-elements";
import {DrawerActions} from "@react-navigation/native";
import {connect} from 'react-redux'
const Styles = Native.StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {

    },
    add: {

    },
});

class AddFriends extends React.Component  {
    state = {
        user: '',
        userInfo: [],
    }

    async findUser(){
        await Axios.get("http://10.10.12.31:3939/user/"+this.state.user)
            .then(result=>{
                // console.log(result.data)
                this.setState({
                    userInfo:result.data,
                })
            })
    }

    addFriend(){
        console.log(this.state.userInfo.username)
        console.log(this.props.username)
        const post = {
            friend: this.state.userInfo.username,
            user: this.props.username
        }
        Axios.post(`http://10.10.12.31:3939/friends/addFriend`,post)
            .then(res=>{
                if(res.data.id!==null){
                    alert( this.state.userInfo.username+" added to Friend")
                }
            }).catch(err =>{
            alert("cant create group, "+ "reason:"+err)
        })
    }

    render() {
        return (
            <Container>
                <NavBar
                    name="Search for Friends"
                    icon="arrow-back"
                    onLeftElementPress={() => { this.props.navigation.navigate('HomeScreen') }}
                 />

                <Content style={Styles.content}>
                    <Item regular style={{marginTop:"3%",marginLeft:"3%",marginRight:"3%"}}>
                        <Input placeholder="Search by ID"
                               onChangeText={(e) => this.setState({ user: e })}
                               onSubmitEditing={()=>this.findUser()}
                        />
                    </Item>

                    {this.state.userInfo.length!==0 ? (
                        <Content contentContainerStyle={{alignItems:'center',marginTop:"20%"}}>
                            <Avatar.Image size={225} source={{ uri: 'https://start-cons.com/wp-content/uploads/2019/03/person-dummy-e1553259379744.jpg' }}  />
                            <Text style={{fontWeight:'bold',textAlign:'center',margin:"2%"}}>
                                {this.state.userInfo.fullName}
                            </Text>
                            <Button onPress={()=>this.addFriend()}>
                                <Text>
                                    Add to Friend
                                </Text>
                            </Button>
                        </Content>):null
                    }
                </Content>
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        username: state.loginReducer.username,
        fullName: state.loginReducer.fullName,
    }
}
export default connect(mapStateToProps)(AddFriends)

