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
            <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>扫一扫</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
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
