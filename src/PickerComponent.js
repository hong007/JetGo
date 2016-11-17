/**
 * Created by hongty on 2016/11/14.
 */

import React, {Component} from 'react';
import{
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Picker,
} from 'react-native';
var pickerdata = [
    {title: '1', v: '1'},
    {title: '2', v: '2'},
    {title: '3', v: '3'},
    {title: '4', v: '4'}

];

class PickerComponent extends React.Component {
    constructor(props){
        super(props)
    }
    state = {
        language: '',
    };

    chooseAirPorts(value) {
        this.setState({language: value});
        alert(value);
    }

    // initPicker(title, v) {
    //     return <Picker.Item label={title} value={v}/>
    // }
// {pickerdata.map((title, v) => this.initPicker(title, v))}


render() {
        return (
            <View>
                <Picker
                    mode={'dropdown'}
                    style={{}}
                    selectedValue={this.state.language}
                    onValueChange={(value) => this.chooseAirPorts(value)}>
                    <Picker.Item label="杭垓" value="杭垓"/>
                    <Picker.Item label="七管" value="七管"/>

                </Picker>
                {/*<Text>当前选择的是:{this.state.language}</Text>*/}
            </View>
        );
    }
}
export default PickerComponent;