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
  StatusBar,
  ToastAndroid,
  AsyncStorage,
} from 'react-native';
import LeftMenuList from './LeftMenuList';
import NetUtil from './NetUtil';
import SwitchComp from './SwitchComp';
import Main from './Main';
import RealtimeOrder from './RealtimeOrder';
import DialPhone from './DialPhone';

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
    StatusBar.setBackgroundColor('#000', true);
    let _this = this;
    AsyncStorage.getItem("LOGIN_TOKEN", function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        // let Token = result;
        Token = result;
        console.log("取得缓存中的Token是  ", Token, "  ");
      }
    });
    AsyncStorage.getItem("DETAIL_ID", function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        let curfid = result;
        // _this.setState({
        //   fid: curfid,
        // });
        _this.getOrderDetail(curfid);
        console.log("取得缓存中的order_detail_id是  ", curfid, "  ");

      }
    });
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
        // AsyncStorage.setItem("LOGIN_TOKEN", curdata.token);
        // this.pageJump();
      } else {
        // alert("用户名或密码错误，请重试");
      }
    });
  }

// 判断运单状态
  orderState(state) {
    let n = state;
    // alert(n)
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
  }

  // 运单时间转换
  setOrderStatusDateTime(value, type) {
    let item = this.state.detailData.order;
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

  CreateOrder() {
    if (this.state.totalChecked == 4) {
      // alert('飞机起飞');
      let _this = this;
      let curId = this.state.detailData.order.id;
      let url = "http://jieyan.xyitech.com/order/autoTakeOff?token=" + Token + "&id=" + curId + "&state=2";
      NetUtil.postJson(url, (responseText)=> {
        let curdata = JSON.parse(responseText);
        console.log('发送起飞指令返回数据 ', curdata);
        if (curdata.err == '0') {
          if (curdata.state != 2) {
            Alert.alert(
              '温馨提示',
              '起飞失败，请重试，或联系客服！',
              [
                {text: '确定',}
              ]
            );
          } else {
            console.log('起飞成功后 ', curdata);
            Alert.alert(
              '温馨提示',
              '起飞成功',
              [
                {text: '确定', onPress: ()=>this.pageJump('order')}
              ]
            );
          }
        } else {
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
              style={{height: 42, width: 42, top: 0, left: 18, position: 'absolute', zIndex: 999999}}
              onPress={() => this.pageJump()}
            >
              <Image style={{marginTop: 15,}} source={require('../img/ic_back.png')}/>
            </TouchableOpacity>
            <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>飞机起飞</Text>
          </View>
          <View style={routeStyle.rContianer}>
            <View style={[routeStyle.rItem, {marginBottom: 1, marginTop: 1, height: 40}]}>
              <Text style={routeStyle.rTextLeft}>运单编号:&nbsp;&nbsp;&nbsp;{this.state.detailData.order.id}</Text>
            </View>
            <View style={[routeStyle.rItem, {height: 95}]}>
              <Image source={require('../img/flight.png')}/>
              <View style={{height: 95, flex: 3, flexDirection: 'column'}}>
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

                <View style={[routeStyle.rItem, {height: 16, marginTop: -15,}]}>
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
              height: 80,
              width: 80,
              borderRadius: 40,
              borderWidth: 0.3,
              borderColor: '#a09f9f',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 22,
              color: '#fff',
            }} onPress={this.CreateOrder.bind(this)}>
              <Text style={{color: '#fff',}}>起飞</Text>
            </TouchableOpacity>
            <Text style={{
              color: '#313131',
              marginTop: 20,
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>长安3秒</Text>
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
              style={{height: 42, width: 42, top: 0, left: 18, position: 'absolute', zIndex: 999999}}
              onPress={() => this.pageJump()}
            >
              <Image style={{marginTop: 15,}} source={require('../img/ic_back.png')}/>
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
    height: 44,
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
  },
  rTextRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    color: '#313131',
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
  },
  rRightView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    color: '#313131',
  },
  rTitle: {
    fontSize: 16,
    color: '#313131',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 16,
  },
});