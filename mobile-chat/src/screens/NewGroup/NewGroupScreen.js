import React from 'react';
import {Input,Container,Content,Item,Text,Button } from 'native-base'
import Axios from "axios";
import {connect} from 'react-redux'

import NavBar from "../../components/NavBar/NavBar";

class NewGroupScreen extends React.Component{

    state ={
        name:[],
        description:[],
    }

    createGroup(){
        const post = {
            description: this.state.description,
            name: this.state.name,
            username: this.props.username
        }
        Axios.post(`http://10.10.12.31:3939/user/createGroup`,post)
            .then(res=>{
                if(res.data.details=="200"){
                    alert("Group Created")
                }
            }).catch(err =>{
                alert("cant create group, "+ "reason:"+err)
        })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Container>
                <NavBar
                    name="Create Group"
                    icon="arrow-back"
                    onLeftElementPress={() => { this.props.navigation.navigate('HomeScreen') }}
                />
                <Content>
                    <Text style={{fontWeight:'bold',fontSize:25 ,margin:'3%'}}>Name</Text>
                    <Item regular style={{marginLeft:"3%",marginRight:"3%"}}>
                        <Input placeholder="Group Name"
                               onChangeText={(e) => this.setState({ name: e })}
                        />
                    </Item>
                    <Text style={{fontWeight:'bold',fontSize:25 ,margin:'3%'}}>Description</Text>
                    <Item regular style={{marginLeft:"3%",marginRight:"3%"}}>
                        <Input placeholder="About your Group"
                               onChangeText={(e) => this.setState({ description: e })}
                        />
                    </Item>

                    <Button style={{margin:'3%',width:'30%',justifyContent:'center',alignSelf:'center'}} onPress={()=>this.createGroup()}>
                        <Text>
                            Create
                        </Text>
                    </Button>
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
export default connect(mapStateToProps)(NewGroupScreen);
