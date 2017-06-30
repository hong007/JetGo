/**
 * Created by Skipper on 2017/1/13.
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Platform,
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
export default class RefreshControlComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    }
  }

  _onRefresh() {
    console.log('下拉刷新~~~~')
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width:Dimensions.get('window').width,
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="red"
            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
            progressBackgroundColor="gray"
          />
        }>
        <Text>{this.props.contentText}</Text>
      </ScrollView>
    );
  }
}

