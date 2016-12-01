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
import Ctrl from './Ctrl';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPressCallback}
                        style={this.props.isTextChange ? LoginStyles.loginTextView1 : LoginStyles.loginTextView2}>
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
    width: 60 * Ctrl.pxToDp(),
    textAlign: 'center',
    fontSize: 17 * Ctrl.pxToDp(),
  },
  loginTextView1: {
    height: 54 * Ctrl.pxToDp(),
    borderWidth: 1,
    borderColor: '#a09f9f',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    backgroundColor: '#fff',
  },
  loginTextView2: {
    height: 54 * Ctrl.pxToDp(),
    borderWidth: 1,
    borderColor: '#a09f9f',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
});