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
  Image,
  TouchableOpacity
} from 'react-native';
export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    StatusBar.setBackgroundColor('#000', true);
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
            style={{height: 42, width: 42, top: 0, left: 18, position: 'absolute', zIndex: 999999}}
            onPress={() => this.props.navigator.pop()}
          >
            <Image style={{marginTop: 15,}} source={require('../img/ic_back.png')}/>
          </TouchableOpacity>
          <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>关于捷雁</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
          <Text>更多内容敬请期待......</Text>
        </View>
      </View>
    );
  }
}
