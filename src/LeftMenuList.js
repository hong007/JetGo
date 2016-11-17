/**
 * Created by hongty on 2016/11/15.
 */
import React, {Component}from 'react';
import{
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Platform,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
const homeImg = require('../img/home.png');
export default class LeftMenuList extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <TouchableOpacity style={LeftMenuStyles.menuContainer}>
                <Image
                    style={LeftMenuStyles.menuImage}
                    source={homeImg}
                />
                <Text style={LeftMenuStyles.menuText}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}
const LeftMenuStyles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        backgroundColor:'#1b1b1b',
        marginTop:20,
    },
    menuImage: {
        width: 30,
        height: 30,
        marginLeft: 5,
    },
    menuText: {
        fontSize: 16,
        marginLeft: 15,
        textAlign: 'center',
        color: '#fff',
    },
});


