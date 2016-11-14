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
// import getFlight from './getFlight';
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
            component: 'getFlight'
        })
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
                <View>
                    <Text>订单编号</Text>
                    <Text>1231231231231</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
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

                <TouchableOpacity onPress={this._openPage.bind(this)}>
                    <Text style={{color: '#55ACEE'}}>提交</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default getFlight;