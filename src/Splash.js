import React, {Component} from 'react';
import  {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import ScanComponent from './ScanComponent';
import PickerComponent from './PickerComponent';
class Splash extends React.Component {
    _openPage() {
        this.props.navigator.push({
            title: 'ScanComponent',
            component: ScanComponent
        })
    }
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
                <PickerComponent/>
                <PickerComponent/>
                <TouchableOpacity onPress={this._openPage.bind(this)}>
                    <Text style={{color: '#fff', backgroundColor: '#313131', alignItems: 'center',paddingLeft:10,paddingRight:10}}>我要寄件</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Splash;