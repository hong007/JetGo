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
  Modal,
  AlertIOS,
  BackAndroid,
  ScrollView,
  StatusBar,
  AsyncStorage,
  TouchableWithoutFeedback,
} from 'react-native';
import LeftMenuList from './LeftMenuList';
import {AnimatedCircularProgress}  from 'react-native-circular-progress';
import CommonStyle from './CommonStyle';
import {toastShort} from './common/ToastUtil';

import NetUtil from './NetUtil';
import SwitchComp from './SwitchComp';
import Main from './Main';
import RealtimeOrder from './RealtimeOrder';
import DialPhone from './DialPhone';
import Ctrl from './Ctrl';
import ModalComp from './ModalComp';

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

      isLoadModalVisible: false,
      modalGetFlightCountDown: false,
      planeFlightCount: 10,

      fill: 0,
      flightTimerStatus: false,
      countFull: false,
    }
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  onBackAndroid = () => {
    let _this = this;
    let curTitle = _this.props.title;
    // alert(_this.props.title);
    if (curTitle == 'getFlight') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
      _this.props.navigator.push({
        // title: '',
        name: 'Main',
        component: Main,
        params: {
          title: 'main'
        },
      });
      return true;
    } else {
      return true;
    }
  }

  componentDidMount() {
    // StatusBar.setBackgroundColor('#000', true);
    Ctrl.setStatusBar();
    let _this = this;
    AsyncStorage.multiGet(['LOGIN_TOKEN', 'DETAIL_ID'], function (errs, result) {
      if (!errs) {
        let curdata = result;
        Token = result[0][1];
        let curfid = result[1][1];
        _this.getOrderDetail(curfid);
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


  _orderPressIn() {
    let _this = this;
    if (_this.state.totalChecked == 6) {
      let count = 0;
      if (!_this.state.flightTimerStatus) {
        this.timer = setInterval(
          ()=> {
            count++;
            if (count > 30) {
              _this.setState({
                countFull: true,
                fill: 100,
              })
            } else {
              _this.setState({
                flightTimerStatus: true,
                fill: count * 10 / 3,
              });
            }
            if (count == 30) {
              _this.setState({
                countFull: true,
                fill: 90,
              });
              Alert.alert(
                '温馨提示',
                '您确定要起飞吗？',
                [
                  {text: '取消', onPress: () => _this._canselFlight()},
                  {text: '确定', onPress: ()=>this._confirmPlaneFlight()}
                ]
              );
              // this.CreateOrder()
            }
          }, 100
        );
      }
    } else {
      _this.refs.circularProgress.performLinearAnimation(0, 100);
      _this.setState({
        flightTimerStatus: false,
        countFull: false,
        fill: 0,
      });
      toastShort('你想飞？必须全部点中哦😯！');
    }
  }

  _orderPressOut() {
    if (!this.state.countFull) {
      this.setState({
        fill: 0,
        flightTimerStatus: false,
      });
    }
    clearInterval(this.timer);
  }

  _canselFlight() {
    this.refs.circularProgress.performLinearAnimation(0, 100);
    this.setState({
      flightTimerStatus: false,
      countFull: false,
      fill: 0,
    });
  }

  _confirmPlaneFlight() {
    // let planeCount = value;
    let planeCount = 10;
    let _this = this;
    _this.setState({
      modalGetFlightCountDown: true,
    })
    _this.timer = setInterval(
      ()=> {
        planeCount--;
        _this.setState({
          planeFlightCount: planeCount
        });
        if (planeCount <= 0) {
          clearInterval(_this.timer);
          _this.timer = setTimeout(
            ()=> {
              _this.CreateOrder();
            },1000)
          _this.setState({
            modalGetFlightCountDown: false,
          })
          // alert(12);
          console.log('飞机起飞指令发送！');
          if (Platform.OS === "android") {
            toastShort('飞机起飞指令发送！');
          }
        }
      }, 1000
    )

  }

  CreateOrder() {
    let _this = this;
    // if (Platform.OS === "android") {
      _this.setState({
        isLoadModalVisible: true
      });
    // }
    _this.timer = setTimeout(
      ()=> {
        _this.setState({
          isLoadModalVisible: false
        });
      }, 20000
    );
    let curId = this.state.detailData.order.id;
    let url = "http://jieyan.xyitech.com/order/autoTakeOff?token=" + Token + "&id=" + curId + "&state=2";
    console.log("发送的起飞指令是 ", url)
    NetUtil.postJson(url, (responseText)=> {
        // _this.setState({
        //   isLoadModalVisible: true
        // });
        // if(responseText&&)
        let curdata = JSON.parse(responseText);
        console.log('发送起飞指令返回数据 ', curdata);
        // alert('发送起飞指令返回数据 ' + curdata + ' err  is  ' + JSON.stringify(curdata.err) + ' ' + curdata.err);
        // AlertIOS.alert(
        //   '起飞返回数据',
        //   '当前运单状态错误',
        //   [
        //     {
        //       text: '确定', onPress(){
        //       _this.setState({
        //         isLoadModalVisible: false,
        //         planeFlightCount: 10,
        //
        //         flightTimerStatus: false,
        //         countFull: false,
        //         fill: 0,
        //       });
        //       _this.refs.circularProgress.performLinearAnimation(0, 100);
        //     }
        //     }
        //   ]
        // );
        if (curdata.err == 0) {
          console.log('返回起飞成功 ', curdata);
          if (curdata.state == 2) {
            console.log('起飞成功后，状态更改 ', curdata);
            _this.timer = setTimeout(
              ()=> {
                _this.setState({
                  isLoadModalVisible: false
                });
                _this.pageJump('order');
              }, 1000
            );
          } else {
            AlertIOS.alert(
              '起飞失败',
              '当前运单状态错误',
              [
                {
                  text: '确定', onPress(){
                  _this.setState({
                    isLoadModalVisible: false,
                    planeFlightCount: 10,

                    flightTimerStatus: false,
                    countFull: false,
                    fill: 0,
                  });
                  _this.refs.circularProgress.performLinearAnimation(0, 100);
                }
                }
              ]
            );
          }
        } else if (curdata.err == 5) {
          let planeStatus = curdata.msg;
          if (Platform.OS === 'anroid') {
            Alert.alert(
              '起飞失败',
              planeStatus,
              [
                {
                  text: '确定', onPress(){
                  _this.setState({
                    isLoadModalVisible: false,
                    planeFlightCount: 10,

                    flightTimerStatus: false,
                    countFull: false,
                    fill: 0,
                  });
                  _this.refs.circularProgress.performLinearAnimation(0, 100);
                }
                }
              ]
            );
          } else {
            AlertIOS.alert(
              '起飞失败',
              planeStatus,
              [
                {
                  text: '确定', onPress(){
                  _this.setState({
                    isLoadModalVisible: false,
                    planeFlightCount: 10,

                    flightTimerStatus: false,
                    countFull: false,
                    fill: 0,
                  });
                  _this.refs.circularProgress.performLinearAnimation(0, 100);
                }
                }
              ]
            );
          }
          console.log('起飞失败返回信息是  ', curdata.msg, '  ', curdata.err)
        } else {
          if (Platform.OS === 'anroid') {
            Alert.alert(
              '起飞失败',
              curdata.msg,
              [
                {
                  text: '确定', onPress(){
                  _this.setState({
                    isLoadModalVisible: false,
                    planeFlightCount: 10,

                    flightTimerStatus: false,
                    countFull: false,
                    fill: 0,
                  });
                  _this.refs.circularProgress.performLinearAnimation(0, 100);
                }
                }
              ]
            );
          } else {
            AlertIOS.alert(
              '起飞失败',
              curdata.msg,
              [
                {
                  text: '确定', onPress(){
                  _this.setState({
                    isLoadModalVisible: false,
                    planeFlightCount: 10,

                    flightTimerStatus: false,
                    countFull: false,
                    fill: 0,
                  });
                  _this.refs.circularProgress.performLinearAnimation(0, 100);
                }
                }
              ]
            );
          }
          console.log('起飞失败返回信息是  ', curdata.msg, '  ', curdata.err)
        }
      }
    );
  }

  pageJump(value) {
    let n = value;
    if (n == "order") {
      this.props.navigator.push({
        name: 'RealtimeOrder',
        component: RealtimeOrder,
        params: {
          title: 'RealtimeOrder'
        },
      });
    } else {
      this.props.navigator.push({
        // title: '',
        name: 'Main',
        component: Main,
        params: {
          title: 'Main'
        },
      });
    }
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    var isChecked = this.state.checked ? 'yes' : 'no';
    if (this.state.detailDataLoaded) {
      return (
        <ScrollView style={{backgroundColor: '#f7f7f7'}}>
          <View style={CommonStyle.container}>
            <View style={CommonStyle.navigationBar}>
              <View style={CommonStyle.onbackArea}>
                <TouchableOpacity style={CommonStyle.onbackAreaCont}
                                  onPress={() => this.pageJump()}
                >
                  <Image source={require('../img/ic_back.png')}/>
                </TouchableOpacity>
              </View>
              <View style={CommonStyle.title}>
                <Text style={CommonStyle.titleText}>飞机起飞</Text>
              </View>
              <View style={CommonStyle.titleRight}>
              </View>
            </View>
            <View style={routeStyle.rContianer}>
              <View style={[routeStyle.rItem, {marginBottom: 1, marginTop: 1, height: 44 * Ctrl.pxToDp()}]}>
                <Text style={routeStyle.rTextLeft}>运单编号:&nbsp;&nbsp;&nbsp;{this.state.detailData.order.id}</Text>
              </View>
              <View style={[routeStyle.rItem, {height: 95 * Ctrl.pxToDp()}]}>
                <Image source={require('../img/flight.png')}/>
                <View style={{
                  height: 95 * Ctrl.pxToDp(),
                  flex: 3,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <View style={[routeStyle.rItem, {
                    height: 20,
                    marginBottom: 5 * Ctrl.pxToDp()
                  }]}>
                    <Text style={routeStyle.rTextLeft}>型号:&nbsp;&nbsp;{this.state.detailData.order.fid}</Text>
                    <Text style={routeStyle.rTextRight}><Text
                      style={routeStyle.rTextValue}>{(this.state.detailData.order.route.route.distance / 1000).toFixed(0)}</Text><Text
                      style={routeStyle.rTextName}>公里</Text></Text>
                  </View>
                  <View style={[routeStyle.rItem, {height: 22,}]}>
                    <Image style={{width: 7, height: 11, marginRight: 5,}} source={require('../img/spoint.png')}/>
                    <Text style={routeStyle.rTextLeft}>{this.state.detailData.order.route.airport[0].name}</Text>
                  </View>

                  <View style={[routeStyle.rItem, {height: 22,}]}>
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
                         title={this.state.detailData.order.route.airport[1].contact_name + ' ' + this.state.detailData.order.route.airport[1].phone}/>
              <Text style={routeStyle.rTitle}>飞前准备</Text>
              <SwitchComp text='货物已装载完成'
                          initialChecked={this.state.initialChecked}
                          callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
              <SwitchComp text='电池已安装完成'
                          initialChecked={this.state.initialChecked}
                          callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
              <SwitchComp text='放置起降区中心'
                          initialChecked={this.state.initialChecked}
                          callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
              <SwitchComp text='飞控解锁'
                          initialChecked={this.state.initialChecked}
                          callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
              <SwitchComp text='遥控器自主状态'
                          initialChecked={this.state.initialChecked}
                          callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
              <SwitchComp text='起降区无人进入'
                          initialChecked={this.state.initialChecked}
                          callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>

            </View>
            <View style={{alignItems: 'center', padding: 10,}}>
              <AnimatedCircularProgress
                ref='circularProgress'
                size={120 * Ctrl.pxToDp()}
                width={10}
                fill={this.state.fill}
                tintColor="#EB753A"
                backgroundColor="#313131">
                {
                  (fill) => (
                    <TouchableOpacity style={{
                      position: 'absolute',
                      top: 20 * Ctrl.pxToDp(),
                      left: 20 * Ctrl.pxToDp(),
                      textAlign: 'center',
                      backgroundColor: '#313131',
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
                  )
                }
              </AnimatedCircularProgress>
              <Text style={{
                color: '#313131',
                marginTop: 10,
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>长按3秒</Text>
            </View>
            < Modal
              animationType={"fade"}
              transparent={true}
              visible={this.state.modalGetFlightCountDown
              }
            >
              <View
                style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center',}}>
                <TouchableOpacity style={{
                  backgroundColor: '#313131',
                  marginTop: 20 * Ctrl.pxToDp(),
                  height: 100 * Ctrl.pxToDp(),
                  width: 100 * Ctrl.pxToDp(),
                  borderRadius: 50 * Ctrl.pxToDp(),
                  borderWidth: 0.3,
                  borderColor: '#a09f9f',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#fff',
                }}>
                  <Text style={{color: '#fff', fontSize: 24 * Ctrl.pxToDp()}}>{this.state.planeFlightCount}</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <ModalComp modalValue={this.state.isLoadModalVisible}/>
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View style={CommonStyle.container}>
          <View style={CommonStyle.navigationBar}>
            <View style={CommonStyle.onbackArea}>
              <TouchableOpacity style={CommonStyle.onbackAreaCont}
                                onPress={() => this.pageJump()}
              >
                <Image source={require('../img/ic_back.png')}/>
              </TouchableOpacity>
            </View>
            <View style={CommonStyle.title}>
              <Text style={CommonStyle.titleText}>飞机起飞</Text>
            </View>
            <View style={CommonStyle.titleRight}>
            </View>
          </View>

          <View style={CommonStyle.title}>
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
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 16,
  },
});