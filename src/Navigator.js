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
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  DrawerLayoutAndroid,
} from 'react-native';
import LoginPage from './LoginPage';
import Main from './Main';
import OrderListView from './OrderListView';
import HelloJetGo from './HelloJetGo';
// import PushyReact from './PushyReact';
export default class navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin:false,
      // defaultName: 'HelloJetGo',
      // defaultComponent: HelloJetGo,
      // defaultName: 'LoginPage',
      // defaultComponent: LoginPage,
      defaultName: 'Main',
      defaultComponent: Main,
      // defaultName: 'PushyReact',
      // defaultComponent: PushyReact,
    };
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
    if(this.state.isLogin){
      return (
        <Navigator
          initialRoute={{name: "Main", component: Main}}
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
    let defaultName = this.state.defaultName;
    let defaultComponent = this.state.defaultComponent;
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

};
