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
  StatusBar,
  Dimensions,
  ToastAndroid,
  BackAndroid,
  AsyncStorage,
  ProgressBarAndroid,
} from 'react-native';
import NetUtil from './NetUtil';
import OrderListView from './OrderListView';
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

      orderCreateTime: '',
      OSTime: '',
      orderArrivalTime: '',

      buttonStatus: false,
      isLoadModalVisible: false
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
    if (curTitle == 'RealtimeOrder') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
      _this.pageJump();
      return true;
    }else{
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

          durationValue: (curdata.order.route.route.duration / 60).toFixed(0),
          distanceValue: (curdata.order.route.route.distance / 1000).toFixed(0),
        });
        if (curdata.order.state == '0') {
          this.setState({
            noFlighting: true,
          })
        } else {
          _this.timeCount(curdata);
        }
      } else {
        // alert("用户名或密码错误，请重试");
      }
    });
  }

  // 运单倒计时
  timeCount(data) {
    let curdata = data;
    console.log("倒计时取得数据是", curdata);
    let orderCreateTime = curdata.order['t2'];
    let duration = this.state.detailData.order.route.route.duration;
    let distance = this.state.detailData.order.route.route.distance;
    let rate = (distance / 1000) / (duration / 60);
    let orderArrivalTime = curdata.order['t2'] + duration;
    let OSTime = curdata.osTime;

    let restTime = orderArrivalTime - OSTime;

    this.setState({
      orderCreateTime: curdata.order['t2'],
      OSTime: curdata.osTime,
      orderArrivalTime: curdata.order['t2'] + duration,

      orderRestTime: restTime,
    });
    console.log("飞机起飞时间s ", orderCreateTime, "  预计飞行时间s ", duration, "  预计到达时间s ", orderArrivalTime, "  服务器返回时间s  ", OSTime, "  剩余时间是  ", restTime);
    this.timer = setInterval(()=> {
      this.setState({
        durationValue: (restTime / 60).toFixed(0),
        distanceValue: (restTime / 60) * rate.toFixed(0),
      });
      // this.orderInterval();
      console.log('A：来来来，和我一起倒计时~~~B：你给我滚！');
      if (restTime <= 0) {
        console.log('A：时间小于0啊！B：你个二货');
        this.setState({
          durationValue: 0,
          distanceValue: 0,
          buttonStatus: true,
        });
        clearInterval(this.timer);
      } else {
        restTime--;
        console.log('A：时光匆匆匆匆流走，也也也不回头！');
        if (restTime % 60 == 0) {
          console.log('A：时间可以整除啦！B：然后呢？');
          this.setState({
            durationValue: (restTime / 60).toFixed(0),
            distanceValue: (restTime / 60) * rate.toFixed(0),
          })
        }
      }
    }, 1000);

  }

  pageJump() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    clearInterval(this.timer);
    this.props.navigator.push({
      name: 'OrderListView',
      component: OrderListView,
      params: {
        title: 'OrderListView'
      },
    });
  }

  orderConfirm() {
    let _this = this;
    // if (this.state.buttonStatus) {
    _this.setState({
      isLoadModalVisible: true,
    });
    let curId = this.state.detailData.order.id;
    let url = "http://jieyan.xyitech.com/order/update?token=" + Token + "&id=" + curId + "&state=4";
    NetUtil.postJson(url, (responseText)=> {
      let curdata = JSON.parse(responseText);
      console.log('发送指令返回数据 ', curdata);
      if (curdata.err == '0') {
        AsyncStorage.setItem("ORDER_CONFIRM", 'true');
        _this.timer = setTimeout(
          ()=> {
            _this.setState({
              isLoadModalVisible: false
            });
            _this.pageJump();
          }, 300
        )
      } else {
        Alert.alert(
          '温馨提示',
          '无法确认收货，请联系客服！',
          [
            {text: '确定',}
          ]
        );
        _this.setState({
          isLoadModalVisible: false,
        });
        // alert("起飞失败，请重试，或联系客服！");
      }
    })
    // } else {
    //   // alert("暂时无法确认，请稍后重试！");
    //   _this.setState({
    //     isLoadModalVisible: false,
    //   });
    //   ToastAndroid.show('暂时无法确认，请稍后重试！', ToastAndroid.SHORT);
    // }
  }


  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    var isChecked = this.state.checked ? 'yes' : 'no';
    if (this.state.detailDataLoaded) {
      return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#f7f7f7'
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#fff',
            paddingLeft: 18,
            paddingTop: 5,
            paddingBottom: 5,
          }}>
            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center',}}>
              <TouchableOpacity style={{
                height: 44,
                width: 44,
                paddingTop: 15,
              }}
                                onPress={() => this.pageJump()}
              >
                <Image source={require('../img/ic_back.png')}/>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
              <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>实时运单</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
            </View>
          </View>
          <View style={routeStyle.rContianer}>
            <View style={{}}>
              <Image style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: Dimensions.get('window').width,
                height: 153 * Ctrl.pxToDp(),
              }}
                     source={require('../img/orderrealtime.png')}><Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  marginBottom: 50 * Ctrl.pxToDp(),
                  fontSize: 14 * Ctrl.pxToDp(),
                  backgroundColor: 'transparent'
                }}>预计<Text
                style={{fontSize: 22 * Ctrl.pxToDp(),}}
                value={this.state.durationValue}>{this.state.durationValue}&nbsp;&nbsp;</Text>分钟后到达</Text></Image>
            </View>
            <View style={{backgroundColor: '#f7f7f7', height: 180 * Ctrl.pxToDp()}}>
              <DialPhone url={'tel:' + this.state.detailData.order.route.airport[1].phone}
                         title={this.state.detailData.order.route.airport[1].contact_name+' '+this.state.detailData.order.route.airport[1].phone}/>
              <View style={[routeStyle.rItem, {marginBottom: 1,}]}>
                <Text
                  style={[routeStyle.rTextLeft, {flex: 2}]}>运单编号:&nbsp;&nbsp;&nbsp;{(this.state.detailData.order.serial_no == '') ? this.state.detailData.order.id : this.state.detailData.order.serial_no}</Text>
                <Text
                  style={[routeStyle.rTextRight, {flex: 1}]}>{Ctrl.orderState(this.state.detailData.order.state)}</Text>
              </View>

              <View style={[routeStyle.rItem, {height: 95 * Ctrl.pxToDp()}]}>
                <Image source={require('../img/flight.png')}/>
                <View style={{
                  flex: 3,
                  height: 95 * Ctrl.pxToDp(),
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <View style={[routeStyle.rItem, {height: 20 * Ctrl.pxToDp()}]}>
                    <Text style={routeStyle.rTextLeft}>型号:&nbsp;&nbsp;{this.state.detailData.order.fid}</Text>
                  </View>
                  <View style={[routeStyle.rItem, {height: 16 * Ctrl.pxToDp()}]}>
                    <Image style={{width: 7, height: 11, marginRight: 5,}} source={require('../img/spoint.png')}/>
                    <Text style={routeStyle.rTextLeft}>{this.state.detailData.order.route.airport[0].name}</Text>
                  </View>

                  <View style={[routeStyle.rItem, {height: 16 * Ctrl.pxToDp()}]}>
                    <Image style={{width: 7, height: 11, marginRight: 5,}} source={require('../img/epoint.png')}/>
                    <Text style={routeStyle.rTextLeft}>{this.state.detailData.order.route.airport[1].name}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', height: 150 * Ctrl.pxToDp(),}}>
              <Image style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 70 * Ctrl.pxToDp(),
                resizeMode: Image.resizeMode.contain
              }}
                     source={require('../img/flight02.png')}><Text
                style={{textAlign: 'center'}}>距离投递点<Text style={{
                fontSize: 22 * Ctrl.pxToDp(),
                color: '#313131',
              }}>{this.state.durationValue}&nbsp;&nbsp;</Text>公里</Text></Image>
            </View>
          </View>

          <TouchableOpacity style={this.state.buttonStatus ? routeStyle.button2 : routeStyle.button1} onPress={()=> {
            this.orderConfirm()
          }}>
            <Text style={{color: '#fff', fontSize: 17 * Ctrl.pxToDp()}}>确认收货</Text>
          </TouchableOpacity>
          <ModalComp modalValue={this.state.isLoadModalVisible}/>
        </View>
      )
    } else {
      return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#f7f7f7'
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#fff',
            paddingLeft: 18,
            paddingTop: 5,
            paddingBottom: 5,
          }}>
            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center',}}>
              <TouchableOpacity style={{
                height: 44,
                width: 44,
                paddingTop: 15,
              }}
                                onPress={() => this.pageJump()}
              >
                <Image source={require('../img/ic_back.png')}/>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
              <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>实时运单</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <Text
              style={{textAlign: 'center', justifyContent: 'center', alignItem: 'center'}}>加载数据中......</Text>
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
    color: '#313131',
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
    color: '#313131',
    textAlign: 'right',
    fontSize: 15 * Ctrl.pxToDp(),
  },
  button1: {
    backgroundColor: '#ddd',
    marginTop: 10,
    height: 54 * Ctrl.pxToDp(),
    borderWidth: 0.3,
    borderColor: '#a09f9f',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17 * Ctrl.pxToDp(),
    color: '#55ACEE',
    margin: 18,
  },
  button2: {
    backgroundColor: '#313131',
    marginTop: 10,
    height: 54 * Ctrl.pxToDp(),
    borderWidth: 0.3,
    borderColor: '#a09f9f',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17 * Ctrl.pxToDp(),
    color: '#55ACEE',
    margin: 18,
  }
});