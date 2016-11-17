/**
 * Created by hongty on 2016/11/14.
 */
import React, {Component} from 'react';
import  {
    View,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import getFlight from './getFlight';
import NetUtil from './NetUtil';

class ScanComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            age: null,
            text: '',
        };
        this.scancode = "";
    }
    componentWillMount(){
        // alert("取得的token是"+123);

        // var token = AsyncStorage.getItem(LOGIN_TOKEN);
        // alert(token);
        // let url = "http://jieyan.xyitech.com/config/allroute?token?"+token;
        // NetUtil.postJson(url,(responseText)=>{
        //     alert(responseText);
        //     let curdata=JSON.parse(responseText);
        //     if (curdata.err == '0') {
        //         this.pageJump();
        //         this._saveValue_One("LOGIN_TOKEN",curdata.token);
        //     } else {
        //         alert("用户名或密码错误，请重试")
        //     }
        // });
    }
    // //初始化数据-默认从AsyncStorage中获取数据
    // async _loadInitialState() {
    //     try {
    //         var value = await AsyncStorage.getItem(LOGIN_TOKEN);
    //         if (value != null) {
    //             this._appendMessage('从存储中获取到数据为:' + value);
    //         } else {
    //             this._appendMessage('存储中无数据,初始化为空数据');
    //         }
    //     } catch (error) {
    //         // this._appendMessage('AsyncStorage错误' + error.message);
    //     }
    // }

    _openPage() {
        this.props.navigator.push({
            title: '飞机起飞',
            name: 'getFlight',
            component: getFlight
        })
    }

    render() {
        console.disableYellowBox = true;
        console.warn('YellowBox is disabled.');
        return (
            <View style={{flex: 1, backgroundColor: '#f7f7f7', paddingTop: 12,marginTop:(Platform.OS==='android'?66:74)}}>
                <View style={scanStyle.TextInputView}>
                    <TextInput style={scanStyle.TextInput}
                               placeholder='扫码无人机上的二维码'
                               onChangeText={
                                   (text) => {
                                       this.setState({text});
                                       this.props.onChangeText(text);
                                   }
                               }
                    />
                </View>
                <View style={routeStyle.rContianer}>
                    <View style={routeStyle.rItem}>
                        <Text style={routeStyle.rTextLeft}>无人机编号</Text>
                        <Text style={routeStyle.rTextRight}>131231231</Text>
                    </View>
                    <View style={routeStyle.rItem}>
                        <Text style={routeStyle.rTextLeft}>无人机行程</Text>
                        <Text style={routeStyle.rTextRight}>杭垓-七管</Text>
                    </View>
                    <View style={routeStyle.rItem}>
                        <Text style={routeStyle.rTextLeft}>飞行距离</Text>
                        <Text style={routeStyle.rTextRight}><Text style={routeStyle.rTextValue}>10</Text><Text
                            style={routeStyle.rTextName}>公里</Text></Text>
                    </View>
                    <View style={routeStyle.rItem}>
                        <Text style={routeStyle.rTextLeft}>飞行时间</Text>
                        <Text style={routeStyle.rTextRight}><Text style={routeStyle.rTextValue}>15</Text><Text
                            style={routeStyle.rTextName}>分钟</Text></Text>
                    </View>
                </View>

                <View style={[scanStyle.gridContainer,{flex:1,}]}>
                    <Text style={scanStyle.gridTitle}>请选择货物类型(多选)</Text>
                    <View style={scanStyle.gridContent}>
                        <TouchableOpacity style={scanStyle.gridItem}><Text
                            style={scanStyle.gridText}>报纸</Text></TouchableOpacity>
                        <TouchableOpacity style={scanStyle.gridItem}><Text
                            style={scanStyle.gridText}>信件</Text></TouchableOpacity>
                        <TouchableOpacity style={scanStyle.gridItem}><Text
                            style={scanStyle.gridText}>刊物</Text></TouchableOpacity>
                        <TouchableOpacity style={scanStyle.gridItem}><Text
                            style={scanStyle.gridText}>包裹</Text></TouchableOpacity>
                        <TouchableOpacity style={scanStyle.gridItem}><Text
                            style={scanStyle.gridText}>其他</Text></TouchableOpacity>
                    </View>
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
                    margin: 18,
                }} onPress={this._openPage.bind(this)}>
                    <Text style={{color: '#fff',}}>提交</Text>
                </TouchableOpacity>
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
    }
})
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
        marginBottom: 14,
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
export default ScanComponent;
