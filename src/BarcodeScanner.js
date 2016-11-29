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
  Image,
  TouchableOpacity
} from 'react-native';
import Barcode from 'react-native-barcodescanner';
export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: '',
      cameraType: 'back',
      text: '扫描二维码',
      torchMode: 'off',
      type: '',
    };
  }


  barcodeReceived(e) {
    if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();
    this.setState({
      barcode: e.data,
      text: `${e.data} (${e.type})`,
      type: e.type,
    });
    // const {navigator}=this.props;
    // if (this.props.getUrl) {
    //   let url = this.state.text;
    //   this.props.getUrl(url);
    // }
    // if (navigator) {
    //   navigator.pop({
    //     name: 'barcode'
    //   })
    // }
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
            style={{height:42,width:42,top: 0, right: 0,  position: 'absolute', zIndex: 999999}}
            onPress={() => this.props.navigator.pop()}
          >
            <Image style={{marginTop:15,}} source={require('../img/ic_back.png')}/>
          </TouchableOpacity>
          <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>二维码扫码测试</Text>
        </View>
        <View style={styles.Container}>
          <Barcode
            onBarCodeRead={this.barcodeReceived.bind(this)}
            style={{flex: 1}}
            torchMode={this.state.torchMode}
            cameraType={this.state.cameraType}
          />
          <View style={styles.statusBar}>
            <Text style={styles.statusBarText}>{this.state.text}</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarText: {
    fontSize: 20,
  },
});