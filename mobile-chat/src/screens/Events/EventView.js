import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import NavBar from "../../components/NavBar/NavBar";
import InputView from "./InputView";
import Entypo from "react-native-vector-icons/Entypo";
import { fetchEventById, deleteEvent } from "../../redux/actions/action";
import { connect } from "react-redux";
import moment from 'moment';
import DateAndTime from "../../components/DateAndTime/DateAndTime";
import { Days, Months } from "../../utils/Contents";
import { StackActions } from '@react-navigation/native';


class EventView extends Component {
    state={
        status: true
    }

    componentDidMount(){
        const { id } = this.props.route.params;
        this.props.fetchEventById(id)
        this.setState({
            status: true
        })
    }

    componentDidUpdate(prevProps, prevState){
        const { id } = this.props.route.params;
        if(id !== this.props.detail.id){
            this.props.fetchEventById(id)
        }
    }

    delete=async() =>{
        const { id } = this.props.route.params;
        this.props.deleteEvent(id);
        console.log("Deleted");
        await this.props.navigation.navigate("Events");

    }
    render() {
        const {detail} = this.props
        // console.log(detail);
        const se = moment(detail.startEvent)
        const ee = moment(detail.endEvent)
        const dateStart = new Date(se)
        const dateEnd = new Date(ee)


        return (
            <View>
                <NavBar
                    name=""
                    icon="arrow-back"
                    right={{
                        menu: {
                            icon: "delete",
                        },
                    }}
                    onLeftElementPress={() => {
                        this.props.navigation.dispatch(
                            StackActions.replace('Events',)
                        )
                    }}

                    onRightElementPress={() => {
                        console.log("haha");

                    }}
                />
                <Button title="delete" onPress={this.delete}/>
                <View style={styles.event}>
                    <View style={styles.lCol}>
                        <Entypo name="calendar" size={30} />

                    </View>
                    <View style={styles.rCol}>
                        <Text style={{fontSize: 25, fontWeight: 'bold'}}>{detail.title}</Text>
                        <Text style={styles.text}>From:</Text>
                        <DateAndTime
                            day={Days[dateStart.getDay()]}
                            date={dateStart.getDate()}
                            month={Months[dateStart.getMonth()]}
                            year={dateStart.getFullYear()}
                            hour={dateStart.getHours()}
                            min={dateStart.getMinutes()}
                        />
                        <Text style={styles.text}>To:</Text>
                        <DateAndTime
                            day={Days[dateEnd.getDay()]}
                            date={dateEnd.getDate()}
                            month={Months[dateEnd.getMonth()]}
                            year={dateEnd.getFullYear()}
                            hour={dateEnd.getHours()}
                            min={dateEnd.getMinutes()}
                        />
                    </View>
                </View>
                <InputView icon="location-pin" textSize={{fontSize: 20}} detail={detail.location}/>
                <InputView icon="text" textSize={{fontSize: 20}} detail={detail.description}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    event:{
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
        // backgroundColor: 'grey',
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
    },
    rCol:{
        flex: 6,
        padding: 5,
        justifyContent: "center",
    },
    text:{
        fontSize: 15
    }
})

const mapStateToProps = (state) => ({
    detail: state.event.detailEvent,
});

export default connect(mapStateToProps, { fetchEventById, deleteEvent })(EventView);
