import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Entypo from "react-native-vector-icons/Entypo";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class Input extends Component {
    render() {
        return (
            <View
                style={styles.placeSet}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Entypo name={this.props.icon} size={30} style={{ marginTop: 20 }} />
                </View>
                <View style={{ flex: 6, marginVertical: 20 }}>
                    <TextInput
                        style={{
                            height: hp('6%'),
                            marginBottom: 10,
                            fontSize: 20,
                            marginLeft: 5,
                        }}
                        placeholder={this.props.placeholder}
                        onChangeText={this.props.onChange}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    placeSet: {
        height: hp('13%'),
        flexDirection: "row",
        borderBottomWidth: 1,
    },
})
