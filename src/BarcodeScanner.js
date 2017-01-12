/**
 * Created by hongty on 2016/11/29.
 */
'use strict';
import React, {Component} from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
  View,
} from 'react-native';

import CommonStyle from './CommonStyle';

import ScanComponent from './ScanComponent';
import BarScanner from 'react-native-barcodescanner';

export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'off',
      cameraType: 'back',
      isBarCodeScann: false,
      scanResult: '',
      id: null,
    };
  }
  _onBack() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  _barcodeReceived(e) {

    let _this = this;
    if (e.data != '') {
      console.log('这下你不嘚瑟了吧', e.data);
      if (this.state.isBarCodeScann) {
        return true;
      } else {
        this.setState({
          isBarCodeScann: true,
        });
        DeviceEventEmitter.emit("changeBarCode", e.data);
        // _this._onBack();
        this.props.navigator.pop();
        console.log('有没有执行');
      }
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
            <Text style={CommonStyle.titleText}>扫一扫</Text>
          </View>
          <View style={CommonStyle.titleRight}>
          </View>
        </View>
        <BarScanner
          onBarCodeRead={(e)=> {
            this._barcodeReceived(e)
          }}
          style={{flex: 1, backgroundColor: 'rgba(0,0,0,.1)'}}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
        />
      </View>
    );
  }
}
