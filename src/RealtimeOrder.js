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
  AsyncStorage,
} from 'react-native';
import NetUtil from './NetUtil';

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
    let _this = this;
    AsyncStorage.getItem("DETAIL_ID", function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        let curfid = result;
        _this.getOrderDetail(curfid);
        console.log("取得缓存中的order_detail_id是  ", curfid, "  ");
      }
    });
  }

  getOrderDetail(id) {
    let _this = this;
    let curId = id;
    let url = "http://jieyan.xyitech.com/order/detail?token=MiMxNDc2MjUzOTU4QGppZXlhbi54eWl0ZWNoLmNvbSNiUy9odVhnK1VtUUlsVFNmejdWVXBBa1N0SGM9&id=" + curId;
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

  _openPage() {
    if (this.state.totalChecked == 4) {
      alert('飞机起飞');
    } else {
      alert('你想飞？必须全部点中哦😯！');
    }
    // this.props.navigator.push({
    //     title: 'LeftMenuList',
    //     component: LeftMenuList
    // })
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
              style={{top: 15, left: 18, position: 'absolute', zIndex: 999999}}
              onPress={() => this.props.navigator.pop()}
            >
              <Image source={require('../img/ic_back.png')}/>
            </TouchableOpacity>
            <Text style={{textAlign: 'center'}}>实时运单</Text>
          </View>
          <View style={routeStyle.rContianer}>
            <View style={{flex: 3,}}>
              <Image style={{alignItems: 'center', justifyContent: 'flex-end'}}
                     source={require('../img/orderrealtime.png')}><Text
                style={{textAlign: 'center', color: '#fff', marginBottom: 20,}}>预计<Text>15</Text>分钟后到达</Text></Image>
            </View>

            <View style={[routeStyle.rItem,{marginTop:-30}]}>
              <Text style={routeStyle.rTextLeft}>联系人电话 {this.state.detailData.order.route.airport[1].phone}</Text>
              <Image source={require('../img/phone.png')}/>
            </View>

            <View style={[routeStyle.rItem, {marginBottom: 1,}]}>
              <Text style={routeStyle.rTextLeft}>运单编号:&nbsp;&nbsp;&nbsp;{this.state.detailData.order.id}</Text>
            </View>

            <View style={[routeStyle.rItem,{height:60}]}>
              <Image source={require('../img/flight.png')}/>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={[routeStyle.rItem, {height: 20}]}>
                  <Text style={routeStyle.rTextLeft}>型号:&nbsp;&nbsp;{this.state.detailData.order.fid}</Text>
                </View>
                <View style={[routeStyle.rItem, {height: 16}]}>
                  <Text style={routeStyle.rTextLeft}>{this.state.detailData.order.route.airport[0].name}</Text>
                </View>

                <View style={[routeStyle.rItem, {height: 16}]}>
                  <Text style={routeStyle.rTextLeft}>{this.state.detailData.order.route.airport[1].name}</Text>
                </View>
              </View>
            </View>

            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{alignItems: 'center', justifyContent: 'center'}}
                     source={require('../img/flight02.png')}><Text
                style={{textAlign: 'center'}}>距离投递点<Text>2</Text>公里</Text></Image>
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
            this.orderCreate()
          }}>
            <Text style={{color: '#fff',}}>确认收货</Text>
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
              onPress={() => this.props.navigator.pop()}
            >
              <Image source={require('../img/ic_back.png')}/>
            </TouchableOpacity>
            <Text style={{textAlign: 'center'}}>实时运单</Text>
          </View>
          <Text
            style={{textAlign: 'center', justifyContent: 'center', alignItem: 'center'}}>加载数据中......</Text>
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
});
