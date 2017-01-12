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
import _updateConfig from '../package.json';
import CommonStyle from './CommonStyle';

export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  onBackAndroid = () => {
    let _this = this;
    let curTitle = _this.props.title;
    if (curTitle == 'AboutUS') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
      _this._onBack();
      return true;
    } else {
      return true;
    }
  }

  _onBack() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  componentDidMount() {
    StatusBar.setBackgroundColor('#000', true);
    let _this = this;
  }

  render() {
    return (
      <View style={CommonStyle.container}>
        <View style={CommonStyle.navigationBar}>
          <View style={CommonStyle.onbackArea}>
            <TouchableOpacity style={CommonStyle.onbackAreaCont}
                              onPress={() => this._onBack()}
            >
              <Image source={require('../img/ic_back.png')}/>
            </TouchableOpacity>
          </View>
          <View style={CommonStyle.title}>
            <Text style={CommonStyle.titleText}>关于捷雁</Text>
          </View>
          <View style={CommonStyle.titleRight}>
          </View>
        </View>
        <View style={CommonStyle.content}>
          <Text>当前版本号是：{_updateConfig.version}</Text>
        </View>
      </View>
    );
  }
}

