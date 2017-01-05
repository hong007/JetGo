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
  Alert,
  Linking,
  StatusBar,
  BackAndroid,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  DrawerLayoutAndroid,
} from 'react-native';

import LoginPage from './LoginPage';
import Main from './Main';
import OrderListView from './OrderListView';
import APPStart from './APPStart';
import HelloJetGo from './HelloJetGo';
import NetUtil from './NetUtil';

import SplashScreen from 'react-native-splash-screen';
import _updateConfig from '../package.json';


export default class navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultName: '',
      defaultComponent: '',
    };
  }

  componentWillMount() {
    this._checkIfUpdate();
  }

  componentDidMount() {
    StatusBar.setBackgroundColor('#000', true);
    SplashScreen.hide();
  }

  // 检查是否更新
  _checkIfUpdate() {
    let _this = this;
    let url = 'http://jieyan.xyitech.com/static/metadata.android.json';
    NetUtil.postJson(url, (responseText)=> {
      let curdata = JSON.parse(responseText);
      let localVesion = _updateConfig.version;
      console.log('检查版本返回的JSON数据是  ', curdata, ' 服务器版本 ', curdata.version, '  当前版本 ', localVesion);
      if (curdata.version != localVesion) {
        _this.setState({
          isLoadModalVisible: true
        });
        let linkUrl = 'http://jieyan.xyitech.com/static/app-release-v' + curdata.version + '.apk';
        BackAndroid.exitApp()
        Linking.openURL(linkUrl)
          .catch((err)=> {
            console.log('An error occurred', err);
          })
        // Alert.alert(
        //   '温馨提示',
        //   '已有最新版本，请前往下载！',
        //   [
        //     {text: '取消', onPress: () => BackAndroid.exitApp()},
        //     {
        //       text: '确定', onPress: ()=> {
        //       BackAndroid.exitApp()
        //       Linking.openURL(linkUrl)
        //         .catch((err)=> {
        //           console.log('An error occurred', err);
        //         })
        //
        //     }
        //     }
        //   ]
        // );

        console.log('检查是否更新，有可更新版本')
      } else {
        console.log('检查是否更新，没有可更新版本')
      }
    });
  }

  openDrawer() {
    this.refs.drawerLayout.openDrawer()
  }

  render() {
    if (Platform.OS != "android") {
      let defaultName = 'APPStart';
      let defaultComponent = APPStart;
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
    } else {
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
  }
};
