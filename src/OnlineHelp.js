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
    let _this = this;
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

  _onBack() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f7f7f7'
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#fff',
          paddingLeft: 18,
          paddingTop: 5,
          paddingBottom: 5,
        }}>
          <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center',}}>
            <TouchableOpacity style={{
              height: 44,
              width: 44,
              paddingTop: 15,
            }}
                              onPress={() => this._onBack()}
            >
              <Image source={require('../img/ic_back.png')}/>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>在线帮助</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
          <Text>更多内容敬请期待......</Text>
        </View>
      </View>
    );
  }
}
