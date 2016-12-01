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
  StatusBar,
  ToastAndroid,
  AsyncStorage,
  ProgressBarAndroid,
  TouchableOpacity
} from 'react-native';
import EditView from './EditView';
import Button from './Button';
import Main from './Main';
import NetUtil from './NetUtil';
import LoadingViewProgress from './LoadingViewProgress';
import Ctrl from './Ctrl';

// import LoadingView from './LoadingView';


// import RealtimeOrder from './RealtimeOrder';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
    };
    this.userName = "";
    this.password = "";

  }

  componentDidMount() {
    // StatusBar.setBackgroundColor('#000', true);
    Ctrl.setStatusBar();
  }
  openDrawer() {
    this.refs.drawerLayout.openDrawer()
  }

  // _showLoading() {
  //   this.setState({
  //     showLoading: true
  //   })
  // }
  //
  // _closeLoading() {
  //   this.setState({
  //     showLoading: false
  //   })
  // }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    if (this.state.loginStatus) {
      return (
          <LoadingViewProgress/>
      )
    }
    return (
      <View style={LoginStyles.loginview}>
        <Text style={{fontSize: 22*Ctrl.pxToDp(), color: '#fff',}}>用户登录</Text>
        <View style={{paddingTop: 38,}}>
          <Text style={{color: '#a09f9f', marginTop: 20,fontSize:14*Ctrl.pxToDp()}}>用户名</Text>
          <EditView name='' onChangeText={(text) => {
            this.userName = text;
          }}/>
          <Text style={{color: '#a09f9f', marginTop: 20,fontSize:14*Ctrl.pxToDp()}}>密码</Text>
          <EditView name='password' onChangeText={(text) => {
            this.passWord = text;
          }}/>
          <Button name='登录' onPressCallback={()=>this.onPressCallback()}/>
        </View>
      </View>
    )
  }

  onPressCallback() {
    // this.pageJump();

    let _this = this;
    this.setState({
      loginStatus: true,
    });
    let url = "http://jieyan.xyitech.com/login/?username=" + this.userName + "&password=" + this.passWord;

    NetUtil.postJson(url, (responseText)=> {
      let curdata = JSON.parse(responseText);
      if (curdata.err == '0') {
        AsyncStorage.setItem("LOGIN_USERNAME", curdata.token);
        AsyncStorage.setItem("LOGIN_USERPWD", curdata.token);
        AsyncStorage.setItem("LOGIN_TOKEN", curdata.token);
        this.timer = setTimeout(
          ()=> {
            _this.pageJump();
          },
          300
        );
      } else {
        this.setState({
          loginStatus: false,
        });
        // alert("用户名或密码错误，请重试");
        ToastAndroid.show('用户名或密码错误，请重试', ToastAndroid.SHORT);
      }
    });
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

// <Button name='test' onPressCallback={()=>this.pageJump2()}/>


  // pageJump2() {
  //   const {navigator} = this.props;
  //   if (navigator) {
  //     navigator.push({
  //       title: '主页',
  //       name: 'RealtimeOrder',
  //       component: RealtimeOrder,
  //     });
  //   }
  // }
}

const LoginStyles = StyleSheet.create({
  loginview: {
    flex: 1,
    padding: 30,
    paddingTop: (Platform.OS === 'android' ? 102 : 110),
    backgroundColor: '#313131',
    zIndex:-1,
  },
});