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
import RefreshControlComp from './common/RefreshControlComp';

export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    }
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

<<<<<<< HEAD
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

=======
>>>>>>> xydev
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
<<<<<<< HEAD
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
=======
      <View style={CommonStyle.container}>
        <View style={CommonStyle.navigationBar}>
          <View style={CommonStyle.onbackArea}>
            <TouchableOpacity style={CommonStyle.onbackAreaCont}
>>>>>>> xydev
                              onPress={() => this._onBack()}
            >
              <Image source={require('../img/ic_back.png')}/>
            </TouchableOpacity>
          </View>
<<<<<<< HEAD
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>关于捷雁</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
          <Text>当前版本号是：{_updateConfig.version}  运营版</Text>
=======
          <View style={CommonStyle.title}>
            <Text style={CommonStyle.titleText}>关于捷雁</Text>
          </View>
          <View style={CommonStyle.titleRight}>
          </View>
        </View>
        <View style={CommonStyle.content}>
          <RefreshControlComp contentText={'当前版本号是：'+_updateConfig.version}/>
>>>>>>> xydev
        </View>
      </View>
    );
  }
}

