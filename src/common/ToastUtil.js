/**
 * Created by Skipper on 2017/1/12.
 */
import Toast from 'react-native-root-toast';

let toast;
/**
 * 冒一个时间比较短的Toast
 */
export const toastShort = (content) => {
  if (toast !== undefined) {
    Toast.hide(toast);
  }
  toast = Toast.show(content.toString(), {
    duration: Toast.durations.SHORT,//equals to 2000
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
};

/**
 * 冒一个时间比较久的Toast
 */
export const toastLong = (content) => {
  if (toast !== undefined) {
    Toast.hide(toast);
  }
  toast = Toast.show(content.toString(), {
    duration: Toast.durations.LONG,//equals to 3500
    // duration: 10000,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
};