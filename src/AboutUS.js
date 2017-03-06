/**
 * Created by hongty on 2016/11/29.
 */
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
            <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>关于捷雁</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
          <Text>当前版本号是：{_updateConfig.version}  运营版</Text>
        </View>
      </View>
    );
  }
}

