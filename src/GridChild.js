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
        width: 72,
        height: 36,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 2.4,
        paddingTop: 8,
    },
    gridItemChoosed: {
        width: 72,
        height: 36,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#e98b21',
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 2.4,
        paddingTop: 8,
    },
    gridText: {
        width: 72,
        color: '#a09f9f',
        textAlign: 'center',
    },
    gridTextChoosed: {
        width: 72,
        textAlign: 'center',
        color: '#fff',
    }
})