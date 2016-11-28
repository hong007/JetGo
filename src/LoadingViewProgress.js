/**
 * Created by hongty on 2016/11/28.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ProgressBarAndroid,
} from 'react-native';
var ProgressBar = require('ProgressBarAndroid');
export default class LoadingViewProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      LoadingStatus: this.props.LoadingStatus,
    }
  }

  componentDidMount() {
    this.timer = setInterval(
      ()=> {
        var progress = (this.state.progress + 0.02) % 1;
        this.setState({progress: progress})
      }, 50
    );
  }

  render() {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#fff'}}>
        <ProgressBar progress={this.state.progress} {...this.props} />
      </View>
    )
  }
}