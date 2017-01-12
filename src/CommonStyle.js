/**
 * Created by Skipper on 2017/1/12.
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Platform,
} from 'react-native';

const CommonStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f7f7f7',
    paddingTop: (Platform.OS === 'android' ? 0 : 20),
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: 18,
    paddingTop: 5,
    paddingBottom: 5,
    height: (Platform.OS === 'android' ? 42 : 44),
  },
  onbackArea: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  onbackAreaCont: {
    height: 44,
    width: 44,
    paddingTop: 15,
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    color: '#313131',
    fontSize: 18,
  },
  titleRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleRightText:{
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingRight: 18,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
export default CommonStyle

