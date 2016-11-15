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
    TouchableOpacity
} from 'react-native';
import EditView from './EditView';
import Button from './Button';
import LoginSuccess from './LoginSuccess';
import NetUitl from './NetUtil';
export default class LoginActivity extends Component {
    constructor(props) {
        super(props);
        this.userName = "";
        this.password = "";
    }

    render() {
        return (

            <View style={LoginStyles.loginview}>
                <Text style={{fontSize: 22, color: '#fff',}}>用户登录</Text>
                <View style={{
                    flexDirection: 'row',
                    height: 100,
                    marginTop: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}>
                </View>
                <View style={{marginTop: 80,}}>
                    <Text style={{color: '#a09f9f',}}>用户名</Text>
                    <EditView name='' onChangeText={(text) => {
                        this.userName = text;
                    }}/>
                    <Text style={{color: '#a09f9f',}}>密码</Text>
                    <EditView name='' onChangeText={(text) => {
                        this.password = text;
                    }}/>
                    {/*<Button name='登录' onPressCallback={this.onPressCallback}/>*/}
                    <Button name='登录' onPressCallback={()=>this.onPressCallback()}/>
                </View>
            </View>
        )
    }


    // onPressCallback = () => {
    onPressCallback() {
        // const cName=cName;
        let formData = new FormData();
        formData.append("username", this.userName);
        formData.append("password", this.password);
        let url = "http://jieyan.xyitech.com/login";
        NetUitl.postJson(url, formData, (responseText) => {
            // if(responseText.err==0){
            //     alert(cName);
            this.pageJump();
            // }else{
            //     alert(responseText+'  登录错误，请重新登录!');
            // }
        })


    };

    //跳转到第二个页面去
    pageJump() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'LoginSuccess',
                component: LoginSuccess,
            });
        }
    }

}

class loginLineView extends Component {
    render() {
        return (
            <Text >
                没有帐号
            </Text>
        );
    }
}

const LoginStyles = StyleSheet.create({
    loginview: {
        flex: 1,
        padding: 30,
        backgroundColor: '#313131',
    },
});