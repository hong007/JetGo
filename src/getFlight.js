/**
 * Created by hongty on 2016/11/14.
 */
/**
 * Created by hongty on 2016/11/14.
 */
import React, {Component} from 'react';
import  {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
  Switch,
  BackAndroid,
  StatusBar,
  ToastAndroid,
  AsyncStorage,
  TouchableWithoutFeedback,
} from 'react-native';
import LeftMenuList from './LeftMenuList';
import NetUtil from './NetUtil';
import SwitchComp from './SwitchComp';
import Main from './Main';
import RealtimeOrder from './RealtimeOrder';
import DialPhone from './DialPhone';
import LoadingViewProgress from './LoadingViewProgress';
import Ctrl from './Ctrl';
var Token;

export default class getFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialChecked: false,
      totalChecked: 0,
      detailDataLoaded: false,
      detailData: null,
      noFlighting: false,
    }
  }

  componentDidMount() {
    // StatusBar.setBackgroundColor('#000', true);
    Ctrl.setStatusBar();
    let _this = this;
    BackAndroid.addEventListener('hardwareBackPress', function () {
      if (_this.lastBackPressed && _this.lastBackPressed + 1000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
      }
      _this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      _this.pageJump();
      return true;
    });
    AsyncStorage.multiGet(['LOGIN_TOKEN', 'DETAIL_ID'], function (errs, result) {
      if (!errs) {
        let curdata = result;
        Token = result[0][1];
        let curfid = result[1][1];
        _this.getOrderDetail(curfid);
        // alert("返回数据是  " + curdata + "  " + "  数据类型是  " + typeof curdata + "   token是" + Token + "  DETAIL_ID  是    " + curfid);
      }
    })
  }

  getOrderDetail(id) {
    let _this = this;
    let curId = id;
    let url = "http://jieyan.xyitech.com/order/detail?token=" + Token + "&id=" + curId;
    NetUtil.postJson(url, (responseText)=> {
      let curdata = JSON.parse(responseText);
      console.log('取得的运单详情是 ', curdata);
      if (curdata.err == '0') {
        _this.setState({
          detailDataLoaded: true,
          detailData: curdata,
        });
        if (curdata.order.state == '0') {
          this.setState({
            noFlighting: true,
          })
        }
        // this.pageJump();
      } else {
        // alert("用户名或密码错误，请重试");
      }
    });
  }

  onChildChanged(newState) {
    // alert(newState);
    if (newState == true) {
      newState = -1;
    } else {
      newState = 1;
    }
    // var newTotal = this.state.totalChecked + (newState ? 1 : -1);
    var newTotal = this.state.totalChecked + newState;
    this.setState({
      totalChecked: newTotal,
    });
  }

  _orderPressOut() {
    clearInterval(this.timer);
  }

  _orderPressIn() {
    let count = 0;
    this.timer = setInterval(
      ()=> {
        count++;
        if (count == 3) {
          this.CreateOrder()
        }
      }, 1000
    );
  }

  CreateOrder() {
    if (this.state.totalChecked == 4) {
      // alert('飞机起飞');
      this.setState({
        submitStatus: true,
      });
      let _this = this;
      let curId = this.state.detailData.order.id;
      let url = "http://jieyan.xyitech.com/order/autoTakeOff?token=" + Token + "&id=" + curId + "&state=2";
      NetUtil.postJson(url, (responseText)=> {
        let curdata = JSON.parse(responseText);
        console.log('发送起飞指令返回数据 ', curdata);
        if (curdata.err == '0') {
          if (curdata.state != 2) {
            _this.setState({
              submitStatus: false,
            });
            Alert.alert(
              '温馨提示',
              '起飞失败，请重试，或联系客服！',
              [
                {text: '确定',}
              ]
            );
          } else {
            console.log('起飞成功后 ', curdata);
            this.pageJump('order');
            // Alert.alert(
            //   '温馨提示',
            //   '起飞成功',
            //   [
            //     {text: '确定', onPress: ()=>this.pageJump('order')}
            //   ]
            // );
          }
        } else {
          _this.setState({
            submitStatus: false,
          });
          Alert.alert(
            '温馨提示',
            '起飞故障，请联系客服！',
            [
              {text: '确定',}
            ]
          );
          // alert("起飞失败，请重试，或联系客服！");
        }
      });

    } else {
      // alert('你想飞？必须全部点中哦😯！');
      ToastAndroid.show('你想飞？必须全部点中哦😯！', ToastAndroid.SHORT);
    }
  }

  pageJump(value) {
    let n = value;
    if (n == "order") {
      this.props.navigator.push({
        title: '实时运单',
        name: 'RealtimeOrder',
        component: RealtimeOrder
      });
    } else {
      this.props.navigator.push({
        // title: '',
        name: 'Main',
        component: Main
      });
    }
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    var isChecked = this.state.checked ? 'yes' : 'no';
    if (this.state.submitStatus) {
      return (
        <LoadingViewProgress/>
      )
    }
    if (this.state.detailDataLoaded) {
      return (
        <View style={{flex: 1, backgroundColor: '#f7f7f7',}}>
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
              style={{
                height: 44,
                width: 44,
                top: 0,
                left: 0,
                position: 'absolute',
                zIndex: 999999,
                paddingLeft: 15,
                paddingTop: 18,
              }}
              onPress={() => this.pageJump()}
            >
              <Image source={require('../img/ic_back.png')}/>
            </TouchableOpacity>
            <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>飞机起飞</Text>
          </View>
          <View style={routeStyle.rContianer}>
            <View style={[routeStyle.rItem, {marginBottom: 1, marginTop: 1, height: 44 * Ctrl.pxToDp()}]}>
              <Text style={routeStyle.rTextLeft}>运单编号:&nbsp;&nbsp;&nbsp;{this.state.detailData.order.id}</Text>
            </View>
            <View style={[routeStyle.rItem, {height: 95 * Ctrl.pxToDp()}]}>
              <Image source={require('../img/flight.png')}/>
              <View style={{height: 95 * Ctrl.pxToDp(), flex: 3, flexDirection: 'column'}}>
                <View style={[routeStyle.rItem, {height: 20,}]}>
                  <Text style={routeStyle.rTextLeft}>型号:&nbsp;&nbsp;{this.state.detailData.order.fid}</Text>
                  <Text style={routeStyle.rTextRight}><Text
                    style={routeStyle.rTextValue}>{(this.state.detailData.order.route.route.distance / 1000).toFixed(0)}</Text><Text
                    style={routeStyle.rTextName}>公里</Text></Text>
                </View>
                <View style={[routeStyle.rItem, {height: 16, marginTop: -10,}]}>
                  <Image style={{width: 7, height: 11, marginRight: 5,}} source={require('../img/spoint.png')}/>
                  <Text style={routeStyle.rTextLeft}>{this.state.detailData.order.route.airport[0].name}</Text>
                </View>

                <View style={[routeStyle.rItem, {height: 16, marginTop: -10,}]}>
                  <Image style={{width: 7, height: 11, marginRight: 5,}} source={require('../img/epoint.png')}/>
                  <Text style={routeStyle.rTextLeft}>{this.state.detailData.order.route.airport[1].name}</Text>
                  <Text style={routeStyle.rTextRight}><Text
                    style={[routeStyle.rTextValue, {
                      fontSize: 22,
                      color: '#E98B21'
                    }]}>{(this.state.detailData.order.route.route.duration / 60).toFixed(0)}</Text><Text
                    style={routeStyle.rTextName}>分钟</Text></Text>
                </View>
              </View>

            </View>
            <DialPhone url={'tel:' + this.state.detailData.order.route.airport[1].phone}
                       title={this.state.detailData.order.route.airport[1].phone}/>
            <Text style={routeStyle.rTitle}>飞前准备</Text>
            <SwitchComp text='货物已装载完成'
                        initialChecked={this.state.initialChecked}
                        callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
            <SwitchComp text='电池已安装完成'
                        initialChecked={this.state.initialChecked}
                        callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
            <SwitchComp text='放置起降区中心' initialChecked={this.state.initialChecked}
                        callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
            <SwitchComp text='起降区无人进入' initialChecked={this.state.initialChecked}
                        callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>

          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={{
              backgroundColor: '#313131',
              marginTop: 20,
              height: 80 * Ctrl.pxToDp(),
              width: 80 * Ctrl.pxToDp(),
              borderRadius: 40 * Ctrl.pxToDp(),
              borderWidth: 0.3,
              borderColor: '#a09f9f',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
            }} onPressIn={this._orderPressIn.bind(this)} onPressOut={this._orderPressOut.bind(this)}>
              <Text style={{color: '#fff', fontSize: 17 * Ctrl.pxToDp()}}>起飞</Text>
            </TouchableOpacity>
            <Text style={{
              color: '#313131',
              marginTop: 15,
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>长按3秒</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={{flex: 1, backgroundColor: '#f7f7f7',}}>
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
              style={{
                height: 44,
                width: 44,
                top: 0,
                left: 0,
                position: 'absolute',
                zIndex: 999999,
                paddingLeft: 15,
                paddingTop: 18,
              }}
              onPress={() => this.pageJump()}
            >
              <Image source={require('../img/ic_back.png')}/>
            </TouchableOpacity>
            <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>飞机起飞</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <Text>加载数据中......</Text>
          </View>
        </View>
      )
    }
  }
}

const routeStyle = StyleSheet.create({
  rContianer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  rItem: {
    flex: 1,
    paddingLeft: 18,
    height: 44 * Ctrl.pxToDp(),
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
  },
  rTextRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    color: '#313131',
    fontSize: 15 * Ctrl.pxToDp(),
  },
  rTextValue: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
  },
  rLeftView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#313131',
    fontSize: 15 * Ctrl.pxToDp(),
  },
  rRightView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    color: '#313131',
    fontSize: 15 * Ctrl.pxToDp(),
  },
  rTitle: {
    fontSize: 16 * Ctrl.pxToDp(),
    color: '#313131',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 16,
  },
});