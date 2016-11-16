/**
 * Created by hongty on 2016/11/15.
 */
import React, {Component} from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressCallback} style={LoginStyles.loginTextView}>
                <Text style={LoginStyles.loginText}>
                    {this.props.name}
                </Text>
            </TouchableOpacity>
        );
    }
}
const LoginStyles = StyleSheet.create({
        loginText: {
            color: '#a09f9f',
            fontWeight: 'bold',
            width: 30,
        },
        loginTextView: {
            height: 54,
            borderWidth: 0.3,
            borderColor: '#a09f9f',
            borderRadius: 4,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 18,
            marginTop:16,
        },
    });