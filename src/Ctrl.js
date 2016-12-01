/**
 * Created by hongty on 2016/12/1.
 */
import React from 'react';
import {
  Dimensions,
  PixelRatio,
  StatusBar,
} from 'react-native';
const deviceWidthDp = Dimensions.get('window').height;
const uiWidthPx = 667;

let ctrl = {
  pxToDp() {
    const pxToDp = deviceWidthDp / uiWidthPx;
    return deviceWidthDp / uiWidthPx;
  },
  setStatusBar(){
    StatusBar.setBackgroundColor('#000', true);
  },
}

export default ctrl