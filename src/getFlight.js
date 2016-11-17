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
    Platform,
    Switch,
} from 'react-native';
import LeftMenuList from './LeftMenuList';
class getFlight extends React.Component {
    state = {
        trueSwitchIsOn: true,
        falseSwitchIsOn: false,
        falseSwitchIsOn1: false,
        falseSwitchIsOn2: false,
        falseSwitchIsOn3: false,
        falseSwitchIsOn4: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            age: null,
        }
    }


    _openPage() {
        alert('飞机起飞');
        // this.props.navigator.push({
        //     title: 'LeftMenuList',
        //     component: LeftMenuList
        // })
    }

    render() {
        console.disableYellowBox = true;
        console.warn('YellowBox is disabled.');
        return (
            <View style={{flex: 1, backgroundColor: '#f7f7f7',marginTop:(Platform.OS==='android'?66:74)}}>
                <View style={routeStyle.rContianer}>
                    <View style={[routeStyle.rItem, {marginBottom: 1, height: 50}]}>
                        <Text style={routeStyle.rTextLeft}>订单编号</Text>
                        <Text style={routeStyle.rTextRight}>131231231</Text>
                    </View>
                    <View style={[routeStyle.rItem, {height: 95}]}>
                        <Image source={require('../img/flight.png')}/>

                        <View style={{height: 95, flex: 3, flexDirection: 'column'}}>
                            <View style={[routeStyle.rItem,{height:20}]}>
                                <Text style={routeStyle.rTextLeft}>TR-5737</Text>
                                <Text style={routeStyle.rTextRight}><Text style={routeStyle.rTextValue}>10</Text><Text
                                    style={routeStyle.rTextName}>公里</Text></Text>
                            </View>
                            <View style={[routeStyle.rItem,{height:16}]}>
                                <Text style={routeStyle.rTextLeft}>杭垓</Text>
                            </View>

                            <View style={[routeStyle.rItem,{height:16}]}>
                                <Text style={routeStyle.rTextLeft}>七管</Text>
                                <Text style={routeStyle.rTextRight}><Text style={[routeStyle.rTextValue,{fontSize:22}]}>15</Text><Text
                                    style={routeStyle.rTextName}>分钟</Text></Text>
                            </View>
                        </View>

                    </View>

                    <View style={routeStyle.rItem}>
                        <Text style={routeStyle.rTextLeft}>联系人电话:</Text>
                        <Text style={routeStyle.rTextLeft}>136-1233-1234</Text>
                        <Image style={{}} source={require('../img/phone.png')}/>
                    </View>


                    <Text style={scanStyle.gridTitle}>飞前准备</Text>
                    <View style={routeStyle.rItem}>
                        <Text style={routeStyle.rTextLeft}>货物已装载完成</Text>
                        <Switch
                            onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                            style={routeStyle.rTextRight}
                            value={this.state.falseSwitchIsOn}/>
                    </View>
                    <View style={routeStyle.rItem}>
                        <Text style={routeStyle.rTextLeft}>电池已安装完成</Text>
                        <Switch
                            onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                            style={routeStyle.rTextRight}
                            value={this.state.falseSwitchIsOn1}/>
                    </View>
                    <View style={routeStyle.rItem}>
                        <Text style={routeStyle.rTextLeft}>放置起降区中心</Text>
                        <Switch
                            onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                            style={routeStyle.rTextRight}
                            value={this.state.falseSwitchIsOn2}/>
                    </View>
                    <View style={routeStyle.rItem}>
                        <Text style={routeStyle.rTextLeft}>起降区无人进入</Text>
                        <Switch
                            onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                            style={routeStyle.rTextRight}
                            value={this.state.falseSwitchIsOn3}/>
                    </View>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: '#E98B21',
                    marginTop: 10,
                    height: 80,
                    width: 80,
                    borderRadius: 60,
                    borderWidth: 0.3,
                    borderColor: '#a09f9f',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 22,
                    color: '#fff',
                }} onPress={this._openPage.bind(this)}>
                    <Text style={{color: '#fff',}}>起飞</Text>
                </TouchableOpacity>
                <Text style={{
                    color: '#313131',
                    marginTop: 20,
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>长安3秒</Text>
            </View>
        )
    }
}
const routeStyle = StyleSheet.create({
    rContianer: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
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
    rTextValue: {
        color: '#E98B21',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'right',
    },
    rLeftView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rRightView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'right',
    }
});
const scanStyle = StyleSheet.create({
    TextInputView: {
        height: 44,
        flexDirection: 'column',
        justifyContent: 'center',
        color: '#a09f9f',
        fontSize: 14,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#fff',
        marginBottom: 30,
    },
    TextInput: {
        height: 44,
    },
    gridContainer: {
        flex: 1,
        marginTop: 20,
    },
    gridContent: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 10,
    },
    gridTitle: {
        fontSize: 16,
        color: '#313131',
        marginTop:7,
        marginBottom: 7,
        marginLeft: 16,
    },
    gridItem: {
        width: 72,
        height: 36,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        color: '#a09f9f',
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 2.4,
        paddingTop: 8,
    },
    gridText: {
        width: 72,
        textAlign: 'center',
    }
})
export default getFlight;