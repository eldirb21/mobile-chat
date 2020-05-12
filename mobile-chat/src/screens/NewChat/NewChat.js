import React from 'react';
import Native from 'react-native';
import { Icon } from 'react-native-elements';
import Axios from "axios";
import {connect} from 'react-redux';

import NavBar from "../../components/NavBar/NavBar";
import CardPeople from "./CardPeople/CardPeople";

class NewChat extends React.Component{

    state={
        search:'',
        contactList:[],
        groupList:[],
    }

    componentDidMount(): void {
        const {result} =this.props.route.params
        Axios.get("http://10.10.12.31:3939/group/user/"+result)
            .then(result=>{
                this.setState({
                    groupList:result.data
                })
            })
        Axios.get("http://10.10.12.31:3939/friends/"+result)
            .then(result=>{
                this.setState({
                    contactList:result.data
                })
            })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Native.View>
                <NavBar
                    name="New Chat"
                    icon="arrow-back"
                    right="search"

                    onLeftElementPress={() => { this.props.navigation.goBack() }}
                    onRightElementPress={this.state.search}
                />
                {/*<SearchBar style={{ backgroundColor: 'white' }} containerStyle={{ backgroundColor: 'tasparent' }} inputContainerStyle={{ backgroundColor: 'tasparent' }}*/}
                {/*           round*/}
                {/*           searchIcon={{ size: 24 }}*/}
                {/*           onChangeText={text => this.searchFilterFunction(text)}*/}
                {/*           onClear={text => this.searchFilterFunction('')}*/}
                {/*           placeholder="Type Here..."*/}
                {/*           value={this.state.search} />*/}

                <Native.View>
                    <Native.TouchableOpacity style={{ flexDirection: "row", margin: 20 }}
                                      onPress={() => this.props.navigation.navigate('NewGroupScreen')}>
                        <Icon name="people" color='green' />
                        <Native.Text style={{ fontSize: 20, marginLeft: 20 }}>New Group</Native.Text>
                    </Native.TouchableOpacity>
                </Native.View>

                <Native.View>
                    <Native.TouchableOpacity style={{ flexDirection: "row", margin: 20 }}
                                             onPress={() => this.props.navigation.navigate('AddFriendsScreen')}>
                        <Icon name="people" color='green' />
                        <Native.Text style={{ fontSize: 20, marginLeft: 20 }}>Add a Friend</Native.Text>
                    </Native.TouchableOpacity>
                </Native.View>

                <Native.View>
                    <Native.Text style={{marginBottom:"2%",marginLeft:"2%"}}>
                        Your Group
                    </Native.Text>
                    {this.state.groupList.map(result=>(
                        <CardPeople key={new Date()} clicked={() => { this.props.navigation.navigate('ChatGroupNew',{res:result})}} fullName={result.name}/>
                    ))}
                </Native.View>

                <Native.View>
                    <Native.Text style={{marginBottom:"2%",marginLeft:"2%"}}>
                        Your Friends
                    </Native.Text>
                    {this.state.contactList.map(result=>(
                        <CardPeople key={Math.random()} clicked={() => { this.props.navigation.navigate('ChatScreenNew',{res:result})}} fullName={result.userTwo.fullName}/>
                    ))}
                </Native.View>
            </Native.View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        fullName: state.loginReducer.fullName,
    }
}
export default connect(mapStateToProps)(NewChat);
