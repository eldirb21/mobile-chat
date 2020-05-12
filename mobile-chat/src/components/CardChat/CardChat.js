import React from "react";
import { TouchableOpacity, } from "react-native-gesture-handler";
import {Body, Left, ListItem,  Thumbnail,Text} from "native-base";

export default class CardChat extends React.Component  {

    render() {

        return (
            <TouchableOpacity onPress={this.props.clicked}>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: 'https://i.pravatar.cc/100?img='+ Math.random() }} />
                    </Left>
                    <Body>
                        {this.props.receiver!=null?(
                            <Text>{this.props.receiver}</Text>
                            ) :
                            <Text>{this.props.group.name}</Text>
                        }
                        <Text note>{this.props.text}</Text>
                    </Body>
                </ListItem>
            </TouchableOpacity>
        );
    }
}

