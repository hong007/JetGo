/**
 * Created by hongty on 2016/11/17.
 */
import React, {Component} from 'react';
import  {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import PickerComponent from './PickerComponent';
import ScanComponent from './ScanComponent';


export default class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    _openPage() {
        this.props.navigator.push({
            title: '飞机扫码',
            name: 'ScanComponent',
            component: ScanComponent
        })
    }

    render() {
        return (
            <TouchableOpacity style={{marginTop: 60, padding: 18,}}>
                <View>
                    <PickerComponent/>
                    <PickerComponent/>
                    <TouchableOpacity style={{
                        backgroundColor: '#313131',
                        marginTop: 10,
                        height: 54,
                        borderWidth: 0.3,
                        borderColor: '#a09f9f',
                        borderRadius: 4,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 17,
                    }} onPress={this._openPage.bind(this)}>
                        <Text style={{color: '#fff',}}>我要寄件</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}