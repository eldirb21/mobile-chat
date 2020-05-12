import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button, Text } from 'react-native-elements';
import { Switch } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import NavBar from '../../components/NavBar/NavBar'

import Axios from 'axios';
import {DrawerActions} from "react-navigation";

export default class RegistrationScreen extends React.Component  {
    constructor(props) {
        super(props);
        this.state = ({
            fullName: '',
            username: '',
            password: '',
            email: '',
            showPassword: true,
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.fullName == "") {
            alert("Name tidak boleh kosong");
            return;
        }
        if (this.state.username == "") {
            alert("Username tidak boleh kosong");
            return;
        }
        if (this.state.email == "") {
            alert("Email tidak boleh kosong");
            return;
        }
        if (this.state.password == "") {
            alert("Password tidak boleh kosong");
            return;
        }
        const user = {
            email: this.state.email,
            fullName: this.state.fullName,
            username: this.state.username,
            password: this.state.password,

        }
        console.log(user);
        Axios.post(`http://10.10.12.31:3939/user`, user)
            .then(res => {
                if (res.data.details == "200") {
                    alert("akun Anda berhasil dibuat")
                }
            }).catch(err => console.log("Couldn't fetch data. Error: " + err))
    }

    toggleSwitch = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }
    render() {
        return (
            <View style={Styles.container}>
                <NavBar name="Registration" icon="arrow-back"
                        onLeftElementPress={() => () => this.props.navigation.dispatch(DrawerActions.jumpTo('LoginScreen'))
                         } />

                <View style={Styles.card}>
                    <Text style={Styles.textlogin}>Silahkan masukkan data Anda</Text>

                    <Input placeholder='Full name'
                           onChangeText={(e) => this.setState({ fullName: e })} />
                    <Input placeholder='Username'
                           onChangeText={(e) => this.setState({ username: e })} />
                    <Input placeholder='Email'
                           onChangeText={(e) => this.setState({ email: e })} />
                    <Input placeholder="Password"
                           onChangeText={(e) => this.setState({ password: e })}
                           secureTextEntry={this.state.showPassword} />
                    <Switch style={{ alignSelf: "flex-end" }}
                            onValueChange={this.toggleSwitch}
                            value={!this.state.showPassword} />

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Button title="Sign up" onClick={this.handleSubmit}
                                titleStyle={Styles.btitle}
                                buttonStyle={Styles.button}
                                onPress={this.handleSubmit} />
                        <Text style={Styles.agreement}>By signing up, I have read and agreed to Swipes chat privacy policy</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        marginTop: '20%',
        marginLeft: 35,
        marginRight: 35,
    },
    textlogin: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 50,
        marginLeft: 5
    },
    btitle: {
        color: "white",
        fontSize: 25,
        alignItems: 'center'
    },
    button: {
        marginTop: 80,
        borderRadius: 10,
        backgroundColor: "#21bf73",
        width: wp('80%'),
    },

    cardtit: {
        marginBottom: 50,
        fontSize: 35,
        fontWeight: "bold",
        color: "#fff"
    },
    agreement: {
        marginTop: 5,
        fontSize: 15,
        alignSelf: "center"
    },
})
