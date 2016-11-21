/**
 * Created by hongty on 2016/11/21.
 */
import React, {Component} from 'react';
import  {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Platform,
    Switch,
} from 'react-native';
export default class ChildCompontent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.initialChecked,
        }
    }

    render() {
        return (
            <View style={switchStyle.rItem}>
                <Text style={switchStyle.rTextLeft}>{this.props.text}</Text>
                <Switch value={this.state.checked}
                        style={switchStyle.rTextRight}
                        onValueChange={(value)=> {
                            this.setState({checked: value});
                            this.props.callbackParent(this.state.checked);
                        }}/>
            </View>
        )
    }
}
const switchStyle = StyleSheet.create({
    rItem: {
        flex: 1,
        paddingLeft: 18,
        height: 44,
        paddingRight: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#313131',
        marginBottom: 1,
        backgroundColor: '#fff',

    },
    rTextLeft: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rTextRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'right',
    },
})
