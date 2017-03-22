/**
 * Created by Skipper on 2017/3/22.
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  Image,
  Alert,
  StatusBar,
  AsyncStorage,
  BackAndroid,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import MapView from 'react-native-maps';
import MARKER_BLUE_SRC from '../img/assets/mark_blue.png'
import flagFlightImg from '../img/assets/flight.png';
import CustomCallout from './CustomCallout';
import RealtimeOrder from './RealtimeOrder';

import NetUtil from './NetUtil';
import Ctrl from './Ctrl';
import CommonStyle from './CommonStyle';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 30.27760124206543;
const LONGITUDE = 120.00386047363281;
const LATITUDE_DELTA = 0.0922;

var Token;

const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let ws = new WebSocket('ws://jieyan.xyitech.com/control/create');
class PolylineCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0.02,
        longitudeDelta: 0.002,
      },
      flightposition: [
        {
          "longitude": "120.00386047363281",
          "latitude": "30.27760124206543"
        }
      ],
      polylines: [
        {
          "longitude": "120.00386047363281",
          "latitude": "30.27760124206543"
        }
      ],
      editing: null,

      showCallout: false,
    };
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    Ctrl.setStatusBar();

    let _this = this;
    AsyncStorage.multiGet(['LOGIN_TOKEN', 'DETAIL_ID'], function (errs, result) {
      if (!errs) {
        let curdata = result;
        Token = result[0][1];
        let curfid = result[1][1];
        _this._drawFlightPicture(curfid);
        _this._drawFlightLine(curfid);
        // alert("返回数据是  " + curdata + "  " + "  数据类型是  " + typeof curdata + "   token是" + Token + "  DETAIL_ID  是    " + curfid);
      }
    })
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    ws = null;
  }

  onBackAndroid = () => {
    let _this = this;
    let curTitle = _this.props.title;
    if (curTitle == 'RealtimeOrder') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
      _this.pageJump();
      return true;
    } else {
      return true;
    }
  }

  pageJump() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    clearInterval(this.timer);
    this.props.navigator.push({
      name: 'RealtimeOrder',
      component: RealtimeOrder,
      params: {
        title: 'RealtimeOrder'
      },
    });
  }

  _drawFlightLine(id) {
    console.log('ASPECT_RATIO is ', ASPECT_RATIO, '  region is ', this.state.region)
    // console.log(LNGLAT, typeof LNGLAT, '  ', typeof (JSON.stringify(LNGLAT)), '数组对象还是普通对象,isArray()方法', Array.isArray(LNGLAT), '  instanceof 方法', LNGLAT instanceof Array)
    let _this = this;
    let curId = id;
    let url = "http://jieyan.xyitech.com/order/detail?token=" + Token + "&id=" + curId;
    NetUtil.postJson(url, (responseText)=> {
      let curdata = JSON.parse(responseText);
      var Lnglat = [];
      // console.log("取得的数据是  ", curdata, curdata.err);
      if (curdata.err == 0) {
        let routeDetail = JSON.parse(curdata.order.route.route.detail);
        // let routeDetail = curdata.order.route.route.detail;
        for (var lnglat in routeDetail) {
          let TempLnglat = {
            longitude: routeDetail['' + lnglat].lng,
            latitude: routeDetail['' + lnglat].lat
          }
          Lnglat.push(TempLnglat);
        }
        _this.setState({
          polylines: Lnglat,
          region: {
            latitude: Lnglat[0].latitude,
            longitude: Lnglat[0].longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.002,
          },
          flightposition: Lnglat[0],
        })
        console.log('Lnglat  is ', Lnglat, ' this.state.polylines  is ', this.state.polylines, this.state.flightposition)
      } else {
        alert("请求数据失败！")
      }
    });
  }

  _drawFlightPicture(id) {
    let _this = this;
    ws.binaryType = "arraybuffer";
    ws.onopen = function () {
      console.log('websocket connected');
    };
    ws.onerror = function (error) {
      console.log("websocket error", error, '  ', error.message);
    };
    ws.onmessage = function (res) {
      if (res.data == 'undefined') {
        return;
      }
      let flightId = id;
      let gettype = Object.prototype.toString;
      let resdt, msgid;
      let flight = [];
      // console.info('新协议数据是 ', res.data, ' 数据类型是  ', typeof res.data, '  ', gettype.call(res.data),'  数据内存长度是（字节数） ');
      let begin = 0;
      if (gettype.call(res.data) == '[object ArrayBuffer]') {
        resdt = new DataView(res.data);
        msgid = resdt.getUint8(begin);
      } else {
        resdt = JSON.parse(res.data);
        msgid = resdt[begin];
      }
      // console.log('新协议数据是 ', res.data, ' 数据类型是  ', typeof res.data, '  ', gettype.call(res.data), '  ');
      console.log('msgid is ', msgid);
      if (msgid == 5) {
        begin += 1;
        let uid = resdt[begin];
        if (uid == flightId) {
          begin += 1;
          let infos = {};
          infos['time_std_s'] = resdt[begin];
          begin += 1;
          infos['fix_type'] = resdt[begin];
          begin += 1;
          let lat = parseFloat(resdt[begin]);
          infos['lat_gps'] = lat;
          begin += 1;
          let lon = parseFloat(resdt[begin]);
          infos['lon_gps'] = lon;
          begin += 1;
          let alt = parseFloat(resdt[begin]);
          infos['alt_gps'] = alt;
          begin += 1;
          infos['eph'] = resdt[begin];
          begin += 1;
          infos['epv'] = resdt[begin];
          begin += 1;
          infos['vel_gps'] = resdt[begin];
          begin += 1;
          infos['cog'] = resdt[begin];
          begin += 1;
          infos['satellites_visible'] = resdt[begin];
          begin += 1;
          // flight[uid]['gps_raw'] = infos;
          // console.log('有GPS返回 重新定位了飞机')
          _this.setState({
            flightposition: [
              {
                "longitude": infos['lon_gps'],
                "latitude": infos['lat_gps']
              }
            ],
          })
        }
      } else {
        return;
      }
      ws.onclose = function () {
        console.log('websocket disconnected, prepare reconnect');
        setTimeout(_this._drawFlightPicture(), 100);
      }
    }
  }

  _markerPress() {
    if (!this.state.showCallout) {
      this.marker1.showCallout();
      this.setState({
        showCallout: true,
      })
    } else {
      this.marker1.hideCallout();
      this.setState({
        showCallout: false,
      })
    }
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#f7f7f7'}}>
        <View style={[CommonStyle.container, {zIndex: 1}]}>
          <View style={[CommonStyle.navigationBar, {zIndex: 1,backgroundColor:'transparent'}]}>
            <View style={CommonStyle.onbackArea}>
              <TouchableOpacity style={CommonStyle.onbackAreaCont}
                                onPress={() => this.pageJump()}
              >
                <Image source={require('../img/ic_back.png')}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <MapView
              provider={this.props.provider}
              style={styles.map}
              region={this.state.region}
              scrollEnabled={false}
            >
              <MapView.Polyline
                coordinates={this.state.polylines}
                strokeColor="#f00"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={1}
              />
              {this.state.polylines.map(marker=>(
                <MapView.Marker
                  coordinate={marker}
                  key={marker.key}
                  pinColor="#00f"
                  centerOffset={{x: -0, y: -6}}
                  image={MARKER_BLUE_SRC}
                >
                </MapView.Marker>
              ))}

              <MapView.Marker
                ref={ref=> {
                  this.marker1 = ref
                }}
                coordinate={this.state.flightposition[0]}
                image={flagFlightImg}
                onPress={()=> {
                  this._markerPress()
                }}
              >
                <MapView.Callout tooltip style={styles.customView}>
                  <CustomCallout>
                    <Text>捷雁无人机正在配送中</Text>
                  </CustomCallout>
                </MapView.Callout>
              </MapView.Marker>
            </MapView>
            <View style={styles.buttonContainer}>
              {this.state.editing && (
                <TouchableOpacity
                  onPress={() => this.finish()}
                  style={[styles.bubble, styles.button]}
                >
                  <Text>Finish</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

PolylineCreator.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height:Dimensions.get('window').height,
    width:Dimensions.get('window').width,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  customView: {
    width: 110,
    height: 60,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

module.exports = PolylineCreator;
