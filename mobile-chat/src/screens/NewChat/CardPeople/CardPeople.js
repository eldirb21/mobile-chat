import React from 'react';
import {StyleSheet, Text, } from 'react-native';
import {TouchableOpacity} from "react-native-gesture-handler";
import {Body, Left, ListItem,  Thumbnail} from "native-base";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        backgroundColor: "white",
        marginBottom: "2%",
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});
class CardPeople extends React.Component{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            // <TouchableOpacity style={styles.container} onPress={this.props.clicked}>
            //     <View style={{ marginLeft: 20 }}>
            //         <Avatar.Image source={{ uri: "https://i.pravatar.cc/100?img=4" }} size={65}
            //         />
            //     </View>
            //     <View style={{ marginLeft: 25, textAlign:"center" }}>
            //                 <Text style={{ fontSize: 20, fontWeight: "bold" }}>{this.props.fullName}</Text>
            //     </View>
            // </TouchableOpacity>
            <TouchableOpacity onPress={this.props.clicked}>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: 'https://i.pravatar.cc/100?img='+ Math.random() }} />
                    </Left>
                    <Body>
                        <Text>{this.props.fullName}</Text>
                        <Text note>Status Here</Text>
                    </Body>
                </ListItem>
            </TouchableOpacity>

        );
    } b
}
export default CardPeople
