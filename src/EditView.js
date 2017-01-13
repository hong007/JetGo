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
export default class EditView extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={LoginStyles.TextInputView}>
        <TextInput underlineColorAndroid='transparent'
                   clearButtonMode="unless-editing"
                   autoCapitalize="none"
                   secureTextEntry={this.props.name == "password" ? true : false} style={LoginStyles.TextInput}
                   onChangeText={
                     (text) => {
                       this.setState({text});
                       this.props.onChangeText(text);
                     }
                   }
        />
      </View>
    );
  }
}


const LoginStyles = StyleSheet.create({
  TextInputView: {
    height: 50 * Ctrl.pxToDp(),
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#A09F9F',
  },

  TextInput: {
    height: 54 * Ctrl.pxToDp(),
    color: '#fff',
    fontSize: 22 * Ctrl.pxToDp(),
  },
});