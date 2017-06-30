/**
 * Created by hongty on 2016/11/21.
 */
import React, {Component} from 'react';
import  {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Switch,
} from 'react-native';
import Ctrl from './Ctrl';
export default class ChildCompontent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.initialChecked,
    }
  }

  render() {
    return (
      <View style={switchStyle.rItem}>
        <Text style={switchStyle.rTextLeft}>{this.props.text}</Text>
        <View style={switchStyle.rTextRight}>
          <Switch value={this.state.checked}
                  style={switchStyle.rTextRightValue}
                  onValueChange={(value)=> {
                    this.setState({checked: value});
                    this.props.callbackParent(this.state.checked);
                  }}/>
        </View>

      </View>
    )
  }
}
const switchStyle = StyleSheet.create({
  rItem: {
    flex: 1,
    paddingLeft: 18,
    height: 34 * Ctrl.pxToDp(),
    paddingRight: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
    backgroundColor: '#fff',
  },
  rTextLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#313131',
    fontSize: 15 * Ctrl.pxToDp(),
    // backgroundColor:"#f00",
  },
  rTextRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: 'right',
    // backgroundColor:"#00f",
  },

  rTextRightValue: {
    flex: 1,
    marginTop:2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: 'right',
    color: '#313131',
    fontSize: 15 * Ctrl.pxToDp(),
  },
})
