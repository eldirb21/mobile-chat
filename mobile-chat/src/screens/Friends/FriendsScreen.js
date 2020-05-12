import React from 'react';
import Native from 'react-native';
import NavBar from "../../components/NavBar/NavBar";
import {DrawerActions} from "@react-navigation/native";
import {Container,Content,List,ListItem,Thumbnail,Left,Body,Text,Right} from "native-base";
import Axios from "axios";
import {connect} from 'react-redux'
import {StackActions} from "react-navigation";

class FriendsScreen extends React.Component {

    state={
        contactList: [],
    }

    componentDidMount(): void {
        Axios.get("http://10.10.12.31:3939/friends/"+this.props.username)
            .then(result=>{
                this.setState({
                    contactList:result.data
                })
            })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Container>
                <NavBar
                    name="Your Friends"
                    icon="arrow-back"
                    onLeftElementPress={() => { this.props.navigation.goBack() }}
                />
                <Content>
                    <List>
                        {this.state.contactList.map(result=>(
                            <Native.TouchableOpacity key={Math.random()}>
                                <ListItem avatar onPress={() => { this.props.navigation.navigate('ChatScreenNew',{res:result})}}>
                                    <Left>
                                        <Thumbnail source={{ uri: 'https://i.pravatar.cc/100?img='+result.id }} />
                                    </Left>
                                    <Body>
                                        <Text>{result.userTwo.fullName}</Text>
                                        <Text note></Text>
                                    </Body>
                                    <Right>
                                        <Text note></Text>
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
export default connect(mapStateToProps)(FriendsScreen);
