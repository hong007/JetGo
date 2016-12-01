/**
 * Created by hongty on 2016/12/1.
 */
import React from 'react';
import {
  Dimensions,
  PixelRatio,
  StatusBar,
  // Platform,
  // BackAndroid,
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
  // 运单详情时间转换
  setOrderStatusDateTime(data, value, type) {
    let item = data;
    let curtimestate = value;
    var curTime = item['' + curtimestate];
    console.log('当前时间是 ', curTime, '  运单t是  ', curtimestate);
    let unixtime = curTime * 1;
    let unixTimestamp = new Date(unixtime * 1000 + 28800000);//东8区时间偏移量为28800000毫秒
    let commonTime = unixTimestamp;
    let nYear = commonTime.getUTCFullYear();
    let nMonth = (commonTime.getUTCMonth() + 1);
    nMonth = nMonth < 10 ? ('0' + nMonth) : nMonth;
    let nDay = commonTime.getUTCDate();
    nDay = nDay < 10 ? ('0' + nDay) : nDay;

    let tDate = nYear + "." + nMonth + "." + nDay;

    let nHour = (commonTime.getUTCHours());
    nHour = nHour < 10 ? ('0' + nHour) : nHour;
    let nMinutes = commonTime.getUTCMinutes();
    nMinutes = nMinutes < 10 ? ('0' + nMinutes) : nMinutes;
    let nSeconds = commonTime.getUTCSeconds();
    nSeconds = nSeconds < 10 ? ('0' + nSeconds) : nSeconds;

    let tTime = nHour + ":" + nMinutes;

    // let newStatusDate = nYear + "/" + nMonth + "/" + nDay + "/" + nHour + ":" + nMinutes + ":" + nSeconds;
    if (type == "date") {
      return nYear + "." + nMonth + "." + nDay;
    } else {
      return nHour + ":" + nMinutes;
    }
  },
  // 判断运单状态
  orderState(state) {
    let n = state;
    // console.log('运单当前状态是 ', n);
    switch (n) {
      case 0:
        return '未起飞';
        break;
      case 1:
        return '已取消';
        break;
      case 2:
        return '运送中';
        break;
      case 3 || 6 || 9:
        return '异常';
        break;
      case 4:
        return '已送达';
        break;
      case 5:
        return '返航中';
        break;
      case 7:
        return '完成';
        break;
      case 8:
        return '返航中';
        break;
      default:
        return '';
    }
  },
  // onBackAndroid(){
  //   if (Platform.OS === 'android') {
  //     BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
  //   }
  // }
}

export default ctrl