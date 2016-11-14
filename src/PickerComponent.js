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
class PickerComponent extends React.Component {
    state = {
        language: '',
    };

    chooseAirPorts(value) {
        this.setState({language: value});
        alert(value);
    }

    render() {
        return (
            <View>
                <Picker
                    mode={'dropdown'}
                    style={{width:200}}
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
// const styles=StyleSheet.create({
//     container:{
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center',
//     }
// })
export default PickerComponent;