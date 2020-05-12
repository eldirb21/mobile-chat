import React, { Component } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import EventCard from "./EventCard";
import NavBar from "../../components/NavBar/NavBar";
import { connect } from "react-redux";
import { fetchDataEvent } from "../../redux/actions/action";
import { Days, Months } from "../../utils/Contents";
import moment from "moment";
import axios from "axios";
import { StackActions } from '@react-navigation/native';
import { fiturAPI } from "../../utils/Contents";

class ListEvent extends Component {

    componentDidMount = () => {
        this.props.fetchDataEvent();
        console.log("fetch");
    };

    componentDidUpdate = (prevProps) => {
        const {event} = this.props
        if (prevProps.event.length !== event.length) {
            if(event){
                this.props.fetchDataEvent();
                console.log("update");
            }
        }
    };

    render() {
        let {res,res2} = this.props.route.params;
        const { event } = this.props;
        // console.log(event);

        const listEvent = event.map((res, index) => {
            const ts = moment(res.startEvent);
            const date = new Date(ts);

            return (
                <EventCard
                    key={index}
                    title={res.title}
                    day={Days[date.getDay()]}
                    cal={date.getDate()}
                    press={() => {
                        this.props.navigation.navigate("Event View", { id: res.id });
                    }}
                />
            );
        });

        const sortedActivities = listEvent
            .slice()
            .sort((a, b) => b.props.cal - a.props.cal);
        // console.log(listEvent);

        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                <NavBar
                    name="List Event"
                    icon="arrow-back"
                    right={{
                        menu: {
                            icon: "add",
                        },
                    }}
                    onLeftElementPress={() => {
                        this.props.navigation.dispatch(
                            StackActions.replace("ChatScreen",{res:res,res2:res2})
                        )
                    }}
                    onRightElementPress={() => {
                      this.props.navigation.navigate("New Event");
                    }}
                />
                {/*<Button*/}
                {/*    title="New"*/}
                {/*    onPress={() => {*/}
                {/*        this.props.navigation.navigate("New Event");*/}
                {/*    }}*/}
                {/*/>*/}
                <ScrollView >
                    {listEvent}
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    event: state.event.events,
});
export default connect(mapStateToProps, { fetchDataEvent })(ListEvent);
