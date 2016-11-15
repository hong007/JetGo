/**
 * Created by hongty on 2016/11/14.
 */
/**
 * Created by hongty on 2016/11/14.
 */
import React, {Component} from 'react';
import  {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Switch,
} from 'react-native';
import LeftMenuList from './LeftMenuList';
class getFlight extends React.Component {
    state = {
        trueSwitchIsOn: true,
        falseSwitchIsOn: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            age: null,
        }
    }


    _openPage() {
        this.props.navigator.push({
            title: 'LeftMenuList',
            component: LeftMenuList
        })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFFFFF',padding:18}}>
                <View>
                    <Text>订单编号</Text>
                    <Text>1231231231231</Text>
                </View>
                <View style={{alignItems: 'center', backgroundColor: '#fff'}}>
                    <Image>
                        <Text>erteter</Text>
                        <Text>10公里</Text>
                    </Image>
                </View>
                <View>
                    <Text>联系人电话</Text>
                    <Text>1231231231231</Text>
                    <Image/>
                </View>
                <View>
                    <Text>飞前准备</Text>
                    <Switch
                        onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                        style={{marginBottom: 10, marginTop: 10}}
                        value={this.state.falseSwitchIsOn}/>
                    <Switch
                        onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
                        value={this.state.trueSwitchIsOn}/>
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
export default getFlight;