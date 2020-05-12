import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class CardMessageSender extends Component {
    render() {
        return (
            <View style={styles.all}>

                <View style={styles.container}>
                </View>
                <View style={{alignItems: 'flex-end', position: 'absolute'}}>
                    <View style={styles.after}>
                        <View style={{flex: 4}}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}> {this.props.sender} </Text>
                            <Text style={{ fontSize: 15,marginLeft: '4%' }}>{this.props.message}</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end', flex: 1}}>
                            <Text style={{ fontSize: 10, alignSelf: 'flex-end', marginRight: '4%'}}>{this.props.hour}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const  styles = StyleSheet.create({
    all:{
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: 'flex-end',
        // backgroundColor: 'blue'
    },
    container:{
        borderBottomEndRadius: 90,
        borderBottomLeftRadius: 10,
        borderTopEndRadius: 10,
        width: wp('30%'),
        height: 30,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,


    },
    after: {
        flexDirection: 'row',
        marginRight: 10,
        // marginBottom: 10,
        padding: 5,
        borderRadius: 10,
        width: wp('60%'),
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }

})

export default CardMessageSender;
