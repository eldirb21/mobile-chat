import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

export default class DateAndTime extends Component {
    render() {
        return (

            <View style={styles.startEvt} onTouchEnd={this.props.touch}>
                <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 5 }}>
                    <TouchableOpacity onPress={this.props.dateClick}>
                        <Text style={{ fontSize: 20 }}>
                            {this.props.day}, {this.props.date}{" "}
                            {this.props.month} {this.props.year}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                    <TouchableOpacity onPress={this.props.timeClick}>
                        <Text style={{ fontSize: 20 }}>
                            {this.props.hour}:{this.props.min}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    startEvt: {
        flexDirection: "row",
        marginVertical: 10
    },
})
