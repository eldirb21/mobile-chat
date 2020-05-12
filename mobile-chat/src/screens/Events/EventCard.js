import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class EventCard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.lCol}>
                    <Text>{this.props.day}</Text>
                    <Text>{this.props.cal}</Text>
                </View>
                <View style={styles.rCol}>
                    <TouchableOpacity style={styles.event} onPress={this.props.press}>
                        <Text style={{marginLeft: 10}}>{this.props.title}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flexDirection: "row",
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
    lCol: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
    },
    rCol: {
        flex: 6,
        padding: 5,
        justifyContent: "center",
    },
    event: {
        height: 20,
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: "aqua",
    },
});
