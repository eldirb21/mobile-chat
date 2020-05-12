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
    ListItem, Left, Right,Col
} from 'native-base'
import NavBar from "../../components/NavBar/NavBar";
import {fontWeight} from "react-native-material-ui/src/styles/typography";
import Icon from "react-native-vector-icons/FontAwesome5";

class GroupInfo extends React.Component{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const {res} = this.props.route.params;
        return (
            <Container>
                <NavBar
                    name={res.name}
                    icon="arrow-back"
                    onLeftElementPress={() => { this.props.navigation.goBack() }}
                />
                <Card style={{marginLeft:'3%',marginRight:'3%',marginTop:'3%',marginBottom:'3%',padding:"1%"}}>
                    <CardItem header>
                        <Col>
                            <Text style={{fontWeight:'bold'}}>Description</Text>
                        </Col>
                    </CardItem>
                    <CardItem header>
                        <Text>{res.description}</Text>
                    </CardItem>
                </Card>
                <Card style={{marginLeft:'3%',marginRight:'3%',marginTop:'3%',marginBottom:'3%',padding:"1%"}}>
                    <CardItem header>
                        <Col>
                            <Text style={{fontWeight:'bold'}}>Participants</Text>
                        </Col>
                        <Col>
                            <Icon onPress={()=>this.props.navigation.navigate('AddParticipants',{res:res})} style={{flex:1,justifyContent:'flex-end',alignSelf:'flex-end',alignItems:'flex-end'}} name="user-plus" size={25} color="black" />
                        </Col>
                    </CardItem>
                    {res.user.map(result=>(
                        <Native.TouchableOpacity key={result.id}>
                            <ListItem avatar style={{borderBottomWidth: 0}}>
                                <Left>
                                    <Thumbnail source={{ uri: 'https://i.pravatar.cc/100?img='+result.id }} />
                                </Left>
                                <Body style={{borderBottomWidth: 0}}>
                                    <Text>{result.fullName}</Text>
                                    <Text note>Some Status</Text>
                                </Body>
                            </ListItem>
                        </Native.TouchableOpacity>
                    ))}
                </Card>

            </Container>
        );
    }
}
export default GroupInfo;
