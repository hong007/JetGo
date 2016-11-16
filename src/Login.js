import React, {Component} from 'react';
import  {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Navigator from './Navigator';
class Login extends React.Component {
    render() {
        return (
            <Navigator/>
        )
    }
}
AppRegistry.registerComponent('JetGo', () => Login);
