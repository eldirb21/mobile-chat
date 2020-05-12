import React from 'react';
import Native from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { Input, Button, Text } from 'react-native-elements';
import {connect} from "react-redux"

import login from '../../redux/actions/login'
import NavBar from "../../components/NavBar/NavBar";

const css = Native.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
    Rtitle1: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 20
    },
    Rtitle2: {
        color: 'red',
        fontSize: 20
    },
    button: {
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 70,
        height: '30%',
        width: '100%',
    },
    button1: {
        backgroundColor: "transparent",
    },
})

class LoginScreen extends React.Component{

    state={
        username: '',
        password: '',
        showPassword: true
    }

    toggleSwitch = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    async login(){
         await this.props.dispatch(login(this.state.username,this.state.password))
    }

    componentDidUpdate() {
        if(this.props.status === '200'){
            this.props.navigation.navigate("HomeScreen")
        }
    }


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Native.View style={css.container}>
                <NavBar name = "Welcome" />
                <Native.View style={css.card}>
                    <Text style={css.textlogin}> Log in to your account</Text>
                    <Input placeholder='Email Adress / Username'
                           onChangeText={(e) => this.setState({ username: e })} />

                    <Input placeholder="password"
                           onChangeText={(e) => this.setState({ password: e })}
                           secureTextEntry={this.state.showPassword} />
                    <Switch style={{ alignSelf: "flex-end" }}
                            onValueChange={this.toggleSwitch} value={!this.state.showPassword} />
                    {/*fugsi button login*/}
                    <Native.View style={{ marginTop: 50, alignSelf: "center", width: '80%' }}>
                        <Button title="Login"
                                onClick={this.handleSubmit}
                                titleStyle={css.btitle}
                                buttonStyle={css.button}
                                onPress={() => this.login()}
                        />

                        {/**Button navigate to registration and forgot paswword */}
                        <Native.View style={{ flexDirection: "row", marginTop: 2, alignSelf: "center" }}>
                            <Button title="Registration"
                                    titleStyle={css.Rtitle1}
                                    buttonStyle={css.button1}
                                    onPress={() => this.props.navigation.navigate('RegistrationScreen')} />
                        </Native.View>

                    </Native.View>
                </Native.View>
            </Native.View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.loginReducer.status,
    }
}

export default connect(mapStateToProps)(LoginScreen);
