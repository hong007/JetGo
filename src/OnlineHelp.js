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
import CommonStyle from './CommonStyle';
import RefreshControlComp from './common/RefreshControlComp';

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
    if (curTitle == 'OnlineHelp') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
      _this._onBack();
      return true;
    } else {
      return true;
    }
  }

  componentDidMount() {
    StatusBar.setBackgroundColor('#000', true);
  }

  _onBack() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.pop();
    }
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
            <Text style={CommonStyle.titleText}>在线帮助</Text>
          </View>
          <View style={CommonStyle.titleRight}>
          </View>
        </View>
        <View style={CommonStyle.content}>
          <RefreshControlComp contentText='更多内容敬请期待......'/>
        </View>
      </View>
    );
  }
}

