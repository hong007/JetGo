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
      id:null,
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     id:this.props.id,
  //   })
  //   console.log('执行几次')
  // }

  // _onBack() {
  //   let _this=this;
  //   console.log(this.state.scanResult);
  //   _this.props.changeBarCode(this.state.scanResult);
  //   const {navigator} = this.props;
  //   if (navigator) {
  //     navigator.pop();
  //     return
  //   }
  // }

  _barcodeReceived(e) {

    let _this = this;
    if (e.data != '') {
      // AsyncStorage.setItem("SCANRESULT", e.data);
      console.log('这下你不嘚瑟了吧', e.data);
      if (this.state.isBarCodeScann) {
        return true;
      } else {
        this.setState({
          isBarCodeScann: true,
        });
        DeviceEventEmitter.emit("changeBarCode",e.data);
        // _this._onBack();
        this.props.navigator.pop();
        console.log('有没有执行');
      }
    }

  }


  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f7f7f7',}}>
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
            style={{
              height: 44,
              width: 44,
              top: 0,
              left: 0,
              position: 'absolute',
              zIndex: 999999,
              paddingLeft: 15,
              paddingTop: 18,
            }}
            onPress={() => this.props.navigator.pop()}
          >
            <Image source={require('../img/ic_back.png')}/>
          </TouchableOpacity>
          <Text style={{flex: 1, textAlign: 'center', color: '#313131', fontSize: 18,}}>扫一扫</Text>
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
