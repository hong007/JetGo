/**
 * Created by hongty on 2016/11/15.
 */
import React, {Component} from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Platform,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import EditView from './EditView';
import Button from './Button';
import Main from './Main';
import NetUtil from './NetUtil';

var LOGIN_USERNAME = 'username:""';
var LOGIN_PASSWORD = 'password:""';
var LOGIN_TOKEN = 'token:""';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.userName = "";
        this.password = "";
    }

    //组件挂载之后回调方法
    // componentDidMount() {
    //     // this._loadInitialState().done();
    //     // alert("取得的token是"+'123');
    // }

    //初始化数据-默认从AsyncStorage中获取数据
    // async _loadInitialState() {
    //     try {
    //         var value = await AsyncStorage.getItem(LOGIN_USERNAME);
    //         if (value != null) {
    //             this._appendMessage('从存储中获取到数据为:' + value);
    //         } else {
    //             this._appendMessage('存储中无数据,初始化为空数据');
    //         }
    //     } catch (error) {
    //         // this._appendMessage('AsyncStorage错误' + error.message);
    //     }
    // }

    //进行储存数据_ONE
    async _saveValue_One(n,v) {
        // alert('保存到存储的数据为:' + n+' '+v);
        try {
            await AsyncStorage.setItem(n, v);
            // alert('保存到存储的数据为:' + n+' '+v);
            // this._appendMessage('保存到存储的数据为:' + '我是老王');
        } catch (error) {
            this._appendMessage('AsyncStorage错误' + error.message);
        }
    }

    // //进行存储数据删除_ONE
    // async _removeValue_One() {
    //     try {
    //         await AsyncStorage.removeItem(LOGIN_USERNAME);
    //         this._appendMessage('数据删除成功...');
    //     } catch (error) {
    //         this._appendMessage('AsyncStorage错误' + error.message);
    //     }
    // }

    //进行把message信息添加到messages数组中
    // _appendMessage(message) {
    //     this.setState({messages: this.state.messages.concat(message)});
    // }


    openDrawer() {
        this.refs.drawerLayout.openDrawer()
    }

    render() {
        console.disableYellowBox = true;
        console.warn('YellowBox is disabled.');
        return (
            <View style={LoginStyles.loginview}>
                <Text style={{fontSize: 22, color: '#fff',}}>用户登录</Text>
                <View style={{paddingTop: 38,}}>
                    <Text style={{color: '#a09f9f',}}>用户名</Text>
                    <EditView name='' onChangeText={(text) => {
                        this.userName = text;
                    }}/>
                    <Text style={{color: '#a09f9f',}}>密码</Text>
                    <EditView name='' onChangeText={(text) => {
                        this.passWord = text;
                    }}/>
                    <Button name='登录' onPressCallback={()=>this.onPressCallback()}/>
                </View>
            </View>
        )
    }

    onPressCallback() {
        this.pageJump();


        // let url = "http://jieyan.xyitech.com/login/?username=" + this.userName + "&password=" + this.passWord;
        // NetUtil.postJson(url,(responseText)=>{
        //     let curdata=JSON.parse(responseText);
        //     if (curdata.err == '0') {
        //         this.pageJump();
        //         this._saveValue_One("LOGIN_TOKEN",curdata.token);
        //     } else {
        //         alert("用户名或密码错误，请重试")
        //     }
        // });
    };

    //跳转到第二个页面去
    pageJump() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                title: '主页',
                name: 'Main',
                component: Main,
            });
        }
    }
}

const LoginStyles = StyleSheet.create({
    loginview: {
        flex: 1,
        padding: 30,
        paddingTop: (Platform.OS === 'android' ? 102 : 110),
        backgroundColor: '#313131',
    },
});