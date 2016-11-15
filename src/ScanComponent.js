/**
 * Created by hongty on 2016/11/14.
 */
import React, {Component} from 'react';
import  {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import getFlight from './getFlight';
import EditView from './EditView';
class ScanComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            age: null,
        };
        this.scancode="";
    }

    _openPage() {
        this.props.navigator.push({
            title: '飞机起飞',
            component: getFlight
        })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFFFFF',padding:30,}}>
                <Text>飞机扫码</Text>
                <EditView name='扫码无人机上的二维码' onChangeText={(text) => {
                    this.scancode = text;
                }}/>
                {/*<TextInput*/}
                    {/*value={this.state.name}*/}
                    {/*onChangeText={name => this.setState({name})}*/}
                    {/*placeholder={'扫码无人机上的二维码'}*/}
                    {/*style={{height: 40, width: 200}}/>*/}


                <View style={{flex: 1, flexDirection:'row',justifyContent:'space-between', backgroundColor: '#fff'}}>
                    <Text>请选择货物类型(多选)</Text>
                    <Text style={{width:72,height:34,alignItems: 'center', backgroundColor: '#fff'}}>报纸</Text>
                    <Text style={{width:72,height:34,alignItems: 'center', backgroundColor: '#fff'}}>信件</Text>
                    <Text style={{width:72,height:34,alignItems: 'center', backgroundColor: '#fff'}}>刊物</Text>
                    <Text style={{width:72,height:34,alignItems: 'center', backgroundColor: '#fff'}}>包裹</Text>
                    <Text style={{width:72,height:34,alignItems: 'center', backgroundColor: '#fff'}}>其他</Text>
                </View>

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
                    color: '#55ACEE',
                }} onPress={this._openPage.bind(this)}>
                    <Text style={{color: '#fff',}}>提交</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default ScanComponent;