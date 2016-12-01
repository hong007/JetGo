/**
 * Created by hongty on 2016/11/15.
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Platform,
  Image,
  StatusBar,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  DrawerLayoutAndroid,
} from 'react-native';
import LoginPage from './LoginPage';
import Main from './Main';
import OrderListView from './OrderListView';
import HelloJetGo from './HelloJetGo';
// var appstate;
// import PushyReact from './PushyReact';
export default class navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      defaultName: '',
      defaultComponent:'' ,
      appstate:false,
      // defaultName: 'LoginPage',
      // defaultComponent: LoginPage,
      // defaultName: 'Main',
      // defaultComponent: Main,
      // defaultName: 'PushyReact',
      // defaultComponent: PushyReact,
    };
  }

  componentDidMount() {
    StatusBar.setBackgroundColor('#000', true);
    let _this = this;
    AsyncStorage.getItem("APPSTART", function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        appstate = result;
        if(appstate=="true"){
          _this.setState({
            appstate:true,
            defaultName: 'Main',
            defaultComponent: Main,
          });
          console.log("取得缓存中的APPSTART是  ", appstate, "  ");
        }else{
          _this.setState({
            defaultName: 'HelloJetGo',
            defaultComponent: HelloJetGo,
          });
          AsyncStorage.setItem("APPSTART","true");
          console.log("设置缓存中的Token是  ", "true");
        }
      }
    });
  }

  openDrawer() {
    this.refs.drawerLayout.openDrawer()
  }

  pageJump() {
    this.props.navigator.push({
      title: '订单列表',
      name: 'OrderListView',
      component: OrderListView
    });
  }

  render() {
    if(this.state.appstate=="true"){
      console.log("第一次启动后存储登录信息");
      let defaultName = 'Main';
      let defaultComponent = Main;
      return (
        <Navigator
          initialRoute={{name: 'Main', component: Main}}
          configureScene={(route) => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator}/>
          }}
        />
      );
    }else{
      console.log("第一次启动");
      // let defaultName = this.state.defaultName;
      // let defaultComponent = this.state.defaultComponent;
      let defaultName = 'HelloJetGo';
      let defaultComponent = HelloJetGo;
      // let defaultName = 'Main';
      // let defaultComponent = Main;
      return (
        <Navigator
          initialRoute={{name: defaultName, component: defaultComponent}}
          configureScene={(route) => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator}/>
          }}
        />
      );
    }


  }
};
