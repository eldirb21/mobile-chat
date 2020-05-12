import React from 'react'
import { StyleSheet, } from 'react-native'
import { connect } from 'react-redux';
import { Avatar, } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { Container, Content, Text, CardItem, Card } from 'native-base'

import NavBar from '../../components/NavBar/NavBar';

class ProfileScreen extends React.Component {
    state = {
        persons: [],
    }
    render() {
        const { persons, value } = this.state;
        return (
            <Container>
                <NavBar
                    name="Profil"
                    icon="arrow-back"
                    onLeftElementPress={() => { this.props.navigation.goBack() }} />
                <Content>
                    <Avatar.Image style={{ alignSelf: 'center', margin: '3%' }} source={{ uri: "https://i.pravatar.cc/100?img=4" }} size={180} />
                    <Card style={{ marginLeft: '3%', marginRight: '3%', marginTop: '3%', marginBottom: '3%', padding: "1%" }}>
                        <CardItem>
                            <Text style={{ fontWeight: 'bold' }}>Name : </Text>
                            <Text icon={() => (<Icon name="persons" />)}>{this.props.fullName}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontWeight: 'bold' }}>Email : </Text>
                            <Text icon={() => (<Icon name="error-outline" />)}>{this.props.email}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontWeight: 'bold' }}>Username : </Text>
                            <Text icon={() => (<Icon name="phone" />)}>{this.props.username}</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconCover: {
        flex: 1,
        marginTop: "86%",
        marginRight: "10%",
    },
    icon: {
        backgroundColor: "#363062",
        color: 'white',
        padding: 18,
        borderRadius: 100,
        alignSelf: "flex-end",
    },
    user: {
        alignSelf: "center",
        margin: 20,
    },
});
const mapStateToProps = (state) => {
    return {
        username: state.loginReducer.username,
        fullName: state.loginReducer.fullName,
        email: state.loginReducer.email,
    }
}
export default connect(mapStateToProps)(ProfileScreen)
