/**
 * Created by hongty on 2016/11/30.
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Ctrl from './Ctrl';

export default class DialPhone extends React.Component {
  constructor(props) {
    super(props);
  }

  protoTypes: {
    url:React.ProtoTypes.string
  }

  render() {
    return (
      <TouchableOpacity onPress={()=> {
        Linking.canOpenURL(this.props.url).then(supported => {
          if (!supported) {
            console.log('Can\'t handle url: ' + this.props.url);

          } else {
            return Linking.openURL(this.props.url);
          }
        }).catch(err => console.error('An error occurred', err));
      }}>
        <View style={{
          paddingLeft: 18,
          paddingRight: 18,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 1,
          backgroundColor: '#fff',
          height: 40*Ctrl.pxToDp()
        }}>
          <Text style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            color: '#313131',
            fontSize:15*Ctrl.pxToDp(),
          }}>联系人电话:&nbsp;&nbsp;&nbsp;{this.props.title}</Text>
          <Image source={require('../img/phone.png')}/>
        </View>
      </TouchableOpacity>
    )
  }
}