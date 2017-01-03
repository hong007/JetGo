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
