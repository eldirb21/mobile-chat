import React, { Component } from "react";
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateAndTime from "../../components/DateAndTime/DateAndTime";
import AntDesign from "react-native-vector-icons/AntDesign";
import NavBar from "../../components/NavBar/NavBar";
import { connect } from "react-redux";
import { Days, Months } from "../../utils/Contents";
import { postEvent } from "../../redux/actions/action";
import Input from "./Input";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StackActions } from '@react-navigation/native';


class EventScreen extends Component {
    state = {
        events: [],

        title: "",
        date: new Date(),
        dateEnd: new Date(),
        location: "",
        description: "",

        mode: "date",
        show: false,
        status: 0,
    };

    setDateStart = (event, date) => {
        this.setState({
            show: Platform.OS === "ios" ? true : false,
            date: date,
            status: 0,
        });
    };
    setDateEnd = (event, dateEnd) => {
        this.setState({
            show: Platform.OS === "ios" ? true : false,
            dateEnd: dateEnd,
            status: 1,
        });
    };

    show = (mode) => {
        this.setState({
            show: true,
            mode: mode,
        });
    };

    datePicker = () => {
        this.show("date");
    };
    timePicker = () => {
        this.show("time");
    };
    saveBtn = () => {
        let post = {
            title: this.state.title,
            startEvent: this.state.date,
            endEvent: this.state.dateEnd,
            location: this.state.location,
            description: this.state.description,
            user: {id: 1}
        };
        this.props.postEvent(post);
        // this.props.navigation.navigate('Events')
        // dispatch(
        //                     StackActions.replace('Events',)
        //                     )

    };
    render() {
        const { mode, show, events, date, dateEnd } = this.state;
        // console.log("date before ", date, " date after ", dateEnd);

        return (
            <View
                style={{
                    // backgroundColor: '#525252',
                    width: "100%",
                    height: "100%",
                }}
            >
                <NavBar
                    name="Events"
                    icon="arrow-back"
                    right={{
                        menu: {
                            icon: "save",
                        },
                    }}
                    onLeftElementPress={() => {
                        this.props.navigation.dispatch(
                            StackActions.replace('Events',)
                        )
                    }}
                    onRightElementPress={this.saveBtn}
                />
                <View style={{ marginHorizontal: 10 }}>
                    {/* tittle */}
                    <Input
                        placeholder="Add Title"
                        onChange={(text) => {
                            this.setState({
                                title: text,
                            });
                        }}
                    />

                    <View style={styles.eventSet}>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <AntDesign name="calendar" size={30} style={{ marginTop: 20 }} />
                        </View>
                        <View style={{ flex: 6, marginVertical: 10 }}>
                            {/* Start Event */}
                            <DateAndTime
                                touch={() => this.setState({ status: 0 })}
                                dateClick={this.datePicker}
                                timeClick={this.timePicker}
                                day={Days[date.getDay()]}
                                date={date.getDate()}
                                month={Months[date.getMonth()]}
                                year={date.getFullYear()}
                                hour={date.getHours()}
                                min={date.getMinutes()}
                            />

                            {/* Event Over */}
                            <DateAndTime
                                touch={() => this.setState({ status: 1 })}
                                dateClick={this.datePicker}
                                timeClick={this.timePicker}
                                day={Days[dateEnd.getDay()]}
                                date={dateEnd.getDate()}
                                month={Months[dateEnd.getMonth()]}
                                year={dateEnd.getFullYear()}
                                hour={dateEnd.getHours()}
                                min={dateEnd.getMinutes()}
                            />
                        </View>
                    </View>

                    {/* set Place */}
                    <Input
                        icon="location-pin"
                        placeholder="Add Location"
                        onChange={(text) => {
                            this.setState({
                                location: text,
                            });
                        }}
                    />

                    {/* set Description */}
                    <Input
                        icon="text"
                        placeholder="Add Description"
                        onChange={(text) => {
                            this.setState({
                                description: text,
                            });
                        }}
                    />

                    {show &&
                    (this.state.status === 0 ? (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.setDateStart}
                        />
                    ) : (
                        <DateTimePicker
                            testID="dateTime"
                            value={dateEnd}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.setDateEnd}
                        />
                    ))}
                </View>
            </View>
        );
    }
}
const dark = "#525252";
const styles = StyleSheet.create({
    head: {
        height: hp("10%"),
        // backgroundColor: "grey",
        borderBottomWidth: 1,
        flexDirection: "row",
    },
    headColLeft: {
        flex: 1,
        // backgroundColor: dark,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    headColRight: {
        flex: 1,
        // backgroundColor: dark,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    eventSet: {
        height: hp("30%"),
        flexDirection: "row",
        // backgroundColor: 'grey',
        borderBottomWidth: 1,
    },
});

const mapStateToProps = (state) => ({
    username:state.loginReducer.username,
    event: state.event.events,
});

export default connect(mapStateToProps, { postEvent })(EventScreen);
