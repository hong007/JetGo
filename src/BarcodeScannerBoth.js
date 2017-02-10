/**
 * Created by Skipper on 2017/2/10.
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  Keyboard,
  StatusBar,
  Platform,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
import CommonStyle from './CommonStyle';

import ScanComponent from './ScanComponent';
import BarScanner from 'react-native-barcodescanner';

export default class BarcodeScannerBoth extends Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      isBarCodeScann: false,
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false,
      scanResult: '',
      id: null,
    };
  }

  componentWillMount () {
    Keyboard.dismiss();
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

  _onBarCodeRead(data) {
    let _this = this;
    if (data.data != '') {
      console.log('这下你不嘚瑟了吧', data.data);
      // 只扫一次
      if (this.state.isBarCodeScann) {
        return true;
      } else {
        this.setState({
          isBarCodeScann: true,
        });
        // alert('扫码结果是',data.data)
        DeviceEventEmitter.emit("changeBarCode", data.data);
        console.log('有没有执行');
        this.props.navigator.pop();
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
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onBarCodeRead={(data)=> {
            this._barcodeReceived(data)
          }}
          defaultTouchToFocus
          mirrorImage={false}
        >
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle}/>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },
});
