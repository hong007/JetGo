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
// import Orientation from 'react-native-orientation';

import LoginPage from './LoginPage';
import Main from './Main';
import OrderListView from './OrderListView';
import HelloJetGo from './HelloJetGo';
export default class navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultName: '',
      defaultComponent: '',
    };
  }
  componentWillMount() {
    // // 判断横竖屏幕
    // var initial = Orientation.getInitialOrientation();
    // if (initial === 'PORTRAIT') {
    //   //do stuff
    // } else {
    //   //do other stuff
    // }

    // 只允许竖屏
    // Orientation.lockToPortrait();
    //只允许横屏
    // Orientation.lockToLandscape();
  }

  componentDidMount() {
    StatusBar.setBackgroundColor('#000', true);
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
    // if (this.state.isLogin == true) {
    //   console.log("已经登录再次启动");
    //   let defaultName = 'Main';
    //   let defaultComponent = Main;
    //   return (
    //     <Navigator
    //       initialRoute={{name: 'Main', component: Main}}
    //       configureScene={(route) => {
    //         return Navigator.SceneConfigs.FloatFromRight;
    //       }}
    //       renderScene={(route, navigator) => {
    //         let Component = route.component;
    //         return <Component {...route.params} navigator={navigator}/>
    //       }}
    //     />
    //   );
    // } else {
    console.log("第一次启动");
    let defaultName = 'HelloJetGo';
    let defaultComponent = HelloJetGo;
    // let defaultName = 'Main';
    // let defaultComponent = Main;
    return (
      <Navigator
        initialRoute={{name: defaultName, component: defaultComponent}}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FadeAndroid;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator}/>
        }}
      />
    );
  }
  // }
};
