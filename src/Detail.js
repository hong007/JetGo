/**
 * Created by hongty on 2016/11/24.
 */
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
  Platform,
  Switch,
  Alert,
  AsyncStorage,
} from 'react-native';
import NetUtil from './NetUtil';
import OrderListView from './OrderListView';
import getFlight from './getFlight';
var Token;
export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDataLoaded: false,
      detailData: null,
      noFlighting: false,
    }
  }

  componentDidMount() {
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

  openOrderItem() {
    // let id = value;
    // AsyncStorage.setItem("DETAIL_ID", id);
    this.props.navigator.push({
      title: 'getFlight',
      component: getFlight
    });
    // alert("想先上车再买票？那你就只能想了~~~");

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
        // this._onBack();
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

  _onBack() {
    // this.props.navigator.push({
    //   // title: '',
    //   name: 'OrderListView',
    //   component: OrderListView
    // });
    const {navigator} = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  orderCansle() {
    Alert.alert(
      '温馨提示',
      '您确定要取消运单吗？',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed!')},
        {text: '确定', onPress: ()=>this.confirmOrderCansel()}
      ]
    );
  }

  confirmOrderCansel() {
    let _this = this;
    let curId = this.state.detailData.order.id;
    let url = "http://jieyan.xyitech.com/order/update?token=" + Token + "&id=" + curId + "&state=1";
    NetUtil.postJson(url, (responseText)=> {
      let curdata = JSON.parse(responseText);
      console.log('返回数据是 ', curdata);
      if (curdata.err == '0') {
        this._onBack();
      } else {
        alert("暂时无法取消，请重试！");
      }
    });
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    if (this.state.detailDataLoaded) {
      if (this.state.noFlighting) {
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
                style={{top: 15, left: 18, position: 'absolute', zIndex: 999999}}
                onPress={() => this._onBack()}
              >
                <Image source={require('../img/ic_back.png')}/>
              </TouchableOpacity>
              <Text style={{flex: 1, textAlign: 'center', color: '#313131', fontSize: 18,}}>运单详情</Text>
              <Text style={{top: 18, right: 18, position: 'absolute', zIndex: 99999999, color: '#313131'}}

                    onPress={()=> {
                      this.orderCansle()
                    }}>取消运单</Text>
            </View>
            <View style={routeStyle.rContianer}>
              <View style={[routeStyle.rItem, {marginBottom: 15}]}>
                <Text style={routeStyle.rTextLeft}>运单编号&nbsp;&nbsp;&nbsp;{this.state.detailData.order.id}</Text>
                <Text style={routeStyle.rTextRight}>{this.orderState(this.state.detailData.order.state)}</Text>
              </View>
              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>无人机编号</Text>
                <Text style={routeStyle.rTextRight}>{this.state.detailData.order.fid}</Text>
              </View>
              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>无人机行程</Text>
                <Text
                  style={routeStyle.rTextRight}>{this.state.detailData.order.route.airport[0].name}-{this.state.detailData.order.route.airport[1].name}</Text>
              </View>
              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>预计飞行距离</Text>
                <Text style={routeStyle.rTextRight}><Text
                  style={routeStyle.rTextValue}>{(this.state.detailData.order.route.route.distance / 1000).toFixed(0)}</Text><Text
                  style={routeStyle.rTextName}>公里</Text></Text>
              </View>
              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>预计飞行时间</Text>
                <Text style={routeStyle.rTextRight}><Text
                  style={routeStyle.rTextValue}>{(this.state.detailData.order.route.route.duration / 60).toFixed(0)}</Text><Text
                  style={routeStyle.rTextName}>分钟</Text></Text>
              </View>
              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>联系人电话 {this.state.detailData.order.route.airport[1].phone}</Text>
                <Image source={require('../img/phone.png')}/>
              </View>
            </View>

            <View style={routeStyle.container}>
              <Text style={routeStyle.gridTitle}>包裹动态</Text>
              <View style={routeStyle.content}>
                <View style={routeStyle.ImageArea}>
                  <Image style={routeStyle.Image1} source={require('../img/detail01.png')}/>
                  <Image style={routeStyle.Image2} source={require('../img/detail03.png')}/>
                </View>
                <View style={routeStyle.Left}>
                  <Text style={[routeStyle.Text, routeStyle.Text1]}>{this.setOrderStatusDateTime('t0', 'date')}</Text>
                  <Text style={[routeStyle.Text, routeStyle.Text2]}>{this.setOrderStatusDateTime('t0', 'time')}</Text>
                </View>
                <View style={routeStyle.Right}>
                  <Text style={routeStyle.Text}>成功创建无人机运单</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={{
              backgroundColor: '#313131',
              marginTop: 10,
              height: 44,
              borderWidth: 0.3,
              borderColor: '#a09f9f',
              borderRadius: 4,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 17,
              color: '#55ACEE',
              margin: 18,
            }} onPress={()=> {
              this.openOrderItem()
            }}>
              <Text style={{color: '#fff',}}>操作起飞</Text>
            </TouchableOpacity>
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
                style={{top: 15, left: 18, position: 'absolute', zIndex: 999999}}
                onPress={() => this._onBack()}
              >
                <Image source={require('../img/ic_back.png')}/>
              </TouchableOpacity>
              <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>运单详情</Text>
            </View>
            <View style={routeStyle.rContianer}>
              <View style={[routeStyle.rItem, {marginBottom: 15}]}>
                <Text style={routeStyle.rTextLeft}>运单编号&nbsp;&nbsp;&nbsp;{this.state.detailData.order.id}</Text>
                <Text style={routeStyle.rTextRight}>{this.orderState(this.state.detailData.order.state)}</Text>
              </View>
              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>无人机编号</Text>
                <Text style={routeStyle.rTextRight}>{this.state.detailData.order.fid}</Text>
              </View>
              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>无人机行程</Text>
                <Text
                  style={routeStyle.rTextRight}>{this.state.detailData.order.route.airport[0].name}-{this.state.detailData.order.route.airport[1].name}</Text>
              </View>
              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>飞行距离</Text>
                <Text style={routeStyle.rTextRight}><Text
                  style={routeStyle.rTextValue}>{(this.state.detailData.order.route.route.distance / 1000).toFixed(0)}</Text><Text
                  style={routeStyle.rTextName}>公里</Text></Text>
              </View>
              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>飞行时间</Text>
                <Text style={routeStyle.rTextRight}><Text
                  style={routeStyle.rTextValue}>{(this.state.detailData.order.route.route.duration / 60).toFixed(0)}</Text><Text
                  style={routeStyle.rTextName}>分钟</Text></Text>
              </View>
              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>联系人电话 {this.state.detailData.order.route.airport[1].phone}</Text>
                <Image source={require('../img/phone.png')}/>
              </View>
            </View>

            <View style={routeStyle.container}>
              <Text style={routeStyle.gridTitle}>包裹动态</Text>
              <View style={routeStyle.content}>
                <View style={routeStyle.ImageArea}>
                  <Image style={routeStyle.Image1} source={require('../img/detail01.png')}/>
                  <Image style={routeStyle.Image2} source={require('../img/detail03.png')}/>
                </View>
                <View style={routeStyle.Left}>
                  <Text style={[routeStyle.Text, routeStyle.Text1]}>{this.setOrderStatusDateTime('t7', 'date')}</Text>
                  <Text style={[routeStyle.Text, routeStyle.Text2]}>{this.setOrderStatusDateTime('t7', 'time')}</Text>
                </View>
                <View style={routeStyle.Right}>
                  <Text style={routeStyle.Text}>您的包裹已确认送达</Text>
                </View>
              </View>
              <View style={routeStyle.content}>
                <View style={routeStyle.ImageArea}>
                  <Image style={routeStyle.Image2} source={require('../img/detail03.png')}/>

                  <Image style={routeStyle.Image1} source={require('../img/detail02.png')}/>
                  <Image style={routeStyle.Image2} source={require('../img/detail03.png')}/>
                </View>
                <View style={routeStyle.Left}>
                  <Text style={[routeStyle.Text, routeStyle.Text1]}>{this.setOrderStatusDateTime('t2', 'date')}</Text>
                  <Text style={[routeStyle.Text, routeStyle.Text2]}>{this.setOrderStatusDateTime('t2', 'time')}</Text>
                </View>
                <View style={routeStyle.Right}>
                  <Text style={routeStyle.Text}>捷雁无人机开始运送您的包裹</Text>
                </View>
              </View>
              <View style={routeStyle.content}>
                <View style={routeStyle.ImageArea}>
                  <Image style={routeStyle.Image2} source={require('../img/detail03.png')}/>

                  <Image style={routeStyle.Image1} source={require('../img/detail02.png')}/>
                  <Image style={routeStyle.Image2} source={require('../img/detail03.png')}/>
                </View>
                <View style={routeStyle.Left}>
                  <Text style={[routeStyle.Text, routeStyle.Text1]}>{this.setOrderStatusDateTime('t0', 'date')}</Text>
                  <Text style={[routeStyle.Text, routeStyle.Text2]}>{this.setOrderStatusDateTime('t0', 'time')}</Text>
                </View>
                <View style={routeStyle.Right}>
                  <Text style={routeStyle.Text}>成功创建无人机运单</Text>
                </View>
              </View>
            </View>
          </View>
        )
      }
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
              style={{top: 15, left: 18, position: 'absolute', zIndex: 999999}}
              onPress={() => this._onBack()}
            >
              <Image source={require('../img/ic_back.png')}/>
            </TouchableOpacity>
            <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>运单详情</Text>
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
    height: 34,
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
  },
  rTextRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
  },
  rTextValue: {
    color: '#E98B21',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 18,
    paddingRight: 18,
    marginBottom: 20,
    backgroundColor: '#f7f7f7'
  },
  content: {
    flex: 2,
    flexDirection: 'row',
  },
  ImageArea: {
    flex: 1,
    // backgroundColor: "#0f2",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    marginLeft: -20,
  },
  Image2: {
    // marginLeft:10,
  },
  Left: {
    flex: 2,
    paddingTop: 10,
    // backgroundColor: "#f00",
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  Right: {
    flex: 4,
    paddingTop: 10,
    // backgroundColor: "#00f",
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  Text: {
    marginBottom: 10,
    fontSize: 15,
    color: '#313131',
    // backgroundColor: '#f15',
  },
  Text1: {
    marginBottom: -2,
    color: '#A09F9F',
    fontSize: 12,
  },
  Text2: {
    fontSize: 18,
  },
  gridTitle: {
    fontSize: 16,
    color: '#313131',
    marginTop: 7,
    marginBottom: 7,
    // marginLeft: 16,
  },
});
