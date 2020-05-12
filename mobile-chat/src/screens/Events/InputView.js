import React, { Component } from 'react'
import Entypo from "react-native-vector-icons/Entypo";
import { View, Text, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class InputView extends Component {
    render() {
        return (
            <View
                style={styles.placeSet}>
                <View style={{ flex: 1, alignItems: "center", borderRightWidth: 1 }}>
                    <Entypo name={this.props.icon} size={30} style={{ marginTop: 20 }} />
                </View>
                <View style={{ flex: 6, justifyContent: 'center', marginLeft: 5 }}>
                    <Text  style={this.props.textSize}>{this.props.detail}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    placeSet: {
        margin: 5,
        height: hp('13%'),
        flexDirection: "row",
        // borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        backgroundColor: 'white'
    },
})
