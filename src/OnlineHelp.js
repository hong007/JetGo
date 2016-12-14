/**
 * Created by hongty on 2016/11/29.
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Platform,
  Vibration,
  View,
  StatusBar,
  BackAndroid,
  ToastAndroid,
  Image,
  TouchableOpacity
} from 'react-native';
export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    StatusBar.setBackgroundColor('#000', true);
    let _this=this;
    BackAndroid.addEventListener('hardwareBackPress', function () {
      if (_this.lastBackPressed && _this.lastBackPressed + 1000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
      }
      _this.lastBackPressed = Date.now();
      //ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      _this.props.navigator.pop();
      return true;
    });
  }
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#f7f7f7',
      }}
      >
        <View style={{
          height: (Platform.OS === 'android' ? 42 : 50),
          backgroundColor: '#fff',
          flexDeriction: 'row',
          alignItem: 'center',
          marginTop: 24,
          paddingTop: 15,
          paddingLeft: 18
        }}>
          <TouchableOpacity
            style={{height: 42, width: 42, top: 0, left: 18, position: 'absolute', zIndex: 999999}}
            onPress={() => this.props.navigator.pop()}
          >
            <Image style={{marginTop: 15,}} source={require('../img/ic_back.png')}/>
          </TouchableOpacity>
          <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>在线帮助</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
          <Text>更多内容敬请期待......</Text>
        </View>
      </View>
    );
  }
}
