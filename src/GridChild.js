/**
 * Created by hongty on 2016/11/21.
 */
import React, {Component} from 'react';
import  {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Ctrl from './Ctrl';

export default class GridChild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.initialChecked,
        }
    }

    render() {
        return (
            <TouchableOpacity style={this.state.checked == false ? gridStyles.gridItem : gridStyles.gridItemChoosed}
                              value={this.state.checked} onPress={(value)=> {
                this.setState({checked: (this.state.checked ? false : true)});
                this.props.callbackParent(this.state.checked);
                {/*alert(this.state.checked);*/
                }
            }}><Text
                style={this.state.checked == false ? gridStyles.gridText : gridStyles.gridTextChoosed}>{this.props.text}</Text></TouchableOpacity>
        )
    }
}
const gridStyles = StyleSheet.create({
    gridItem: {
        width: 75*Ctrl.pxToDp(),
        height: 38*Ctrl.pxToDp(),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        marginLeft: 10,
        marginTop: 10*Ctrl.pxToDp(),
        borderRadius: 2.4,
        paddingTop: 10*Ctrl.pxToDp(),
        paddingBottom: 10*Ctrl.pxToDp(),
        borderColor:'#ededed',
        borderWidth:1,
    },
    gridItemChoosed: {
        width: 75*Ctrl.pxToDp(),
        height: 38*Ctrl.pxToDp(),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#313131',
        marginLeft: 10,
        marginTop: 10*Ctrl.pxToDp(),
        borderRadius: 2.4,
        paddingTop: 10*Ctrl.pxToDp(),
        paddingBottom: 10*Ctrl.pxToDp(),
    },
    gridText: {
        width: 75*Ctrl.pxToDp(),
        color: '#a09f9f',
        textAlign: 'center',
        backgroundColor:'transparent',
    },
    gridTextChoosed: {
        width: 75*Ctrl.pxToDp(),
        textAlign: 'center',
        color: '#fff',
        backgroundColor:'transparent',
    }
})