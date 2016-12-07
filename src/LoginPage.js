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
  BackAndroid,
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
import ModalComp from './ModalComp';


// import LoadingView from './LoadingView';


// import RealtimeOrder from './RealtimeOrder';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadModalVisible: false
    };
    this.userName = "";
    this.password = "";

  }

  componentDidMount() {
    // StatusBar.setBackgroundColor('#000', true);
    Ctrl.setStatusBar();
    let _this = this;
    BackAndroid.addEventListener('hardwareBackPress', function () {
      if (_this.lastBackPressed && _this.lastBackPressed + 1000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
      }
      _this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
    });
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
  onPressCallback() {
    // this.pageJump();

    let _this = this;
    this.setState({
      isLoadModalVisible: true
    });
    let url = "http://jieyan.xyitech.com/login/?username=" + this.userName + "&password=" + this.passWord;

    NetUtil.postJson(url, (responseText)=> {
      let curdata = JSON.parse(responseText);
      if (curdata.err == '0') {
        AsyncStorage.setItem("LOGIN_USERNAME", this.userName);
        AsyncStorage.setItem("LOGIN_USERPWD", this.passWord);
        AsyncStorage.setItem("LOGIN_TOKEN", curdata.token);
        this.timer = setTimeout(
          ()=> {
            ToastAndroid.show('登录成功', ToastAndroid.SHORT);
            _this.setState({
              isLoadModalVisible: false
            });
            _this.pageJump();
          },
          300
        );
      } else {
        _this.setState({
          isLoadModalVisible: false
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

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    return (
      <View style={LoginStyles.loginview}>
        <Text style={{fontSize: 22 * Ctrl.pxToDp(), color: '#fff',}}>用户登录</Text>
        <View style={{paddingTop: 38,}}>
          <Text style={{color: '#a09f9f', marginTop: 20, fontSize: 14 * Ctrl.pxToDp()}}>用户名</Text>
          <EditView name='' onChangeText={(text) => {
            this.userName = text;
          }}/>
          <Text style={{color: '#a09f9f', marginTop: 20, fontSize: 14 * Ctrl.pxToDp()}}>密码</Text>
          <EditView name='password' onChangeText={(text) => {
            this.passWord = text;
          }}/>
          <Button name='登录' onPressCallback={()=>this.onPressCallback()}/>
        </View>
        <ModalComp modalValue={this.state.isLoadModalVisible}/>
      </View>
    )
  }
}

const LoginStyles = StyleSheet.create({
  loginview: {
    flex: 1,
    padding: 30,
    paddingTop: (Platform.OS === 'android' ? 102 : 110),
    backgroundColor: '#313131',
    zIndex: -1,
  },
});