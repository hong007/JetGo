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
  StatusBar,
  Alert,
  BackAndroid,
  ToastAndroid,
  AsyncStorage,
} from 'react-native';
import NetUtil from './NetUtil';
import OrderListView from './OrderListView';
import getFlight from './getFlight';
import DialPhone from './DialPhone';
import Ctrl from './Ctrl';

var Token;
export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDataLoaded: false,
      detailData: null,
      noFlighting: false,
      isOrderCansle: false,
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
    if (curTitle == 'Detail') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
      _this.props.navigator.pop();
      return true;
    }else{
      return true;
    }
  }

  componentDidMount() {
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

  openOrderItem() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    this.props.navigator.push({
      name: 'getFlight',
      component: getFlight,
      params: {
        title: 'getFlight'
      },
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
        if (curdata.order.state == "1") {
          this.setState({
            isOrderCansle: true,
          })
        }
      } else {
        // alert("用户名或密码错误，请重试");
      }
    });
  }

  _onBack() {
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
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        this.props.navigator.push({
          // title: '',
          name: 'OrderListView',
          component: OrderListView,
          params: {
            title: 'OrderListView'
          },
        });
      } else {
        ToastAndroid.show('暂时无法取消，请重试！', ToastAndroid.SHORT);
      }
    });
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    if (this.state.detailDataLoaded) {
      if (this.state.noFlighting) {
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
                                  onPress={() => this._onBack()}
                >
                  <Image source={require('../img/ic_back.png')}/>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>运单详情</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
                <Text style={{top: 18, right: 18, position: 'absolute', zIndex: 99999999, color: '#313131'}}
                      onPress={()=> {
                        this.orderCansle()
                      }}>取消运单</Text>
              </View>
            </View>
            <View style={routeStyle.rContianer}>
              <View style={[routeStyle.rItem, {marginBottom: 15, marginTop: 1,}]}>
                <Text
                  style={[routeStyle.rTextLeft, {flex: 2}]}>运单编号:&nbsp;&nbsp;&nbsp;{(this.state.detailData.order.serial_no == '') ? this.state.detailData.order.id : this.state.detailData.order.serial_no}</Text>
                <Text
                  style={[routeStyle.rTextRight, {flex: 1}]}>{Ctrl.orderState(this.state.detailData.order.state)}</Text>
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
              <View style={[routeStyle.rItem, {marginBottom: 20,}]}>
                <Text style={routeStyle.rTextLeft}>预计飞行时间</Text>
                <Text style={routeStyle.rTextRight}><Text
                  style={routeStyle.rTextValue}>{(this.state.detailData.order.route.route.duration / 60).toFixed(0)}</Text><Text
                  style={routeStyle.rTextName}>分钟</Text></Text>
              </View>
              <DialPhone url={'tel:' + this.state.detailData.order.route.airport[1].phone}
                         title={this.state.detailData.order.route.airport[1].phone}/>
            </View>

            <View style={routeStyle.container}>
              <Text style={routeStyle.gridTitle}>包裹动态</Text>
              <View style={routeStyle.content}>
                <View style={routeStyle.ImageArea}>
                  <Image style={routeStyle.Image1} source={require('../img/detail01.png')}/>
                  <Image style={routeStyle.Image2} source={require('../img/detail03.png')}/>
                </View>
                <View style={routeStyle.Left}>
                  <Text
                    style={[routeStyle.Text, routeStyle.Text1]}>{Ctrl.setOrderStatusDateTime(this.state.detailData.order, 't0', 'date')}</Text>
                  <Text
                    style={[routeStyle.Text, routeStyle.Text2]}>{Ctrl.setOrderStatusDateTime(this.state.detailData.order, 't0', 'time')}</Text>
                </View>
                <View style={routeStyle.Right}>
                  <Text style={routeStyle.Text}>成功创建无人机运单</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={{
              backgroundColor: '#313131',
              marginTop: 10,
              height: 54 * Ctrl.pxToDp(),
              borderWidth: 0.3,
              borderColor: '#a09f9f',
              borderRadius: 4,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#55ACEE',
              margin: 18,
            }} onPress={()=> {
              this.openOrderItem()
            }}>
              <Text style={{color: '#fff', fontSize: 17 * Ctrl.pxToDp(),}}>操作起飞</Text>
            </TouchableOpacity>
          </View>
        )
      } else {
        if (this.state.isOrderCansle) {
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
                                    onPress={() => this._onBack()}
                  >
                    <Image source={require('../img/ic_back.png')}/>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                  <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>运单详情</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
                </View>
              </View>
              <View style={routeStyle.rContianer}>
                <View style={[routeStyle.rItem, {marginBottom: 15, marginTop: 1,}]}>
                  <Text
                    style={[routeStyle.rTextLeft, {flex: 2}]}>运单编号:&nbsp;&nbsp;&nbsp;{(this.state.detailData.order.serial_no == '') ? this.state.detailData.order.id : this.state.detailData.order.serial_no}</Text>
                  <Text
                    style={[routeStyle.rTextRight, {flex: 1}]}>{Ctrl.orderState(this.state.detailData.order.state)}</Text>
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
                <View style={[routeStyle.rItem, {marginBottom: 20,}]}>
                  <Text style={routeStyle.rTextLeft}>预计飞行时间</Text>
                  <Text style={routeStyle.rTextRight}><Text
                    style={routeStyle.rTextValue}>{(this.state.detailData.order.route.route.duration / 60).toFixed(0)}</Text><Text
                    style={routeStyle.rTextName}>分钟</Text></Text>
                </View>
                <DialPhone url={'tel:' + this.state.detailData.order.route.airport[1].phone}
                           title={this.state.detailData.order.route.airport[1].phone}/>
              </View>

              <View style={routeStyle.container}>
                <Text style={routeStyle.gridTitle}>包裹动态</Text>
                <View style={routeStyle.content}>
                  <View style={routeStyle.ImageArea}>
                    <Image style={routeStyle.Image1} source={require('../img/detail01.png')}/>
                    <Image style={routeStyle.Image2} source={require('../img/detail03.png')}/>
                  </View>
                  <View style={routeStyle.Left}>
                    <Text
                      style={[routeStyle.Text, routeStyle.Text1]}>{Ctrl.setOrderStatusDateTime(this.state.detailData.order, 't1', 'date')}</Text>
                    <Text
                      style={[routeStyle.Text, routeStyle.Text2]}>{Ctrl.setOrderStatusDateTime(this.state.detailData.order, 't1', 'time')}</Text>
                  </View>
                  <View style={routeStyle.Right}>
                    <Text style={routeStyle.Text}>您的运单已取消</Text>
                  </View>
                </View>
                <View style={routeStyle.content}>
                  <View style={routeStyle.ImageArea}>
                    <Image style={routeStyle.Image2} source={require('../img/detail03.png')}/>

                    <Image style={routeStyle.Image1} source={require('../img/detail02.png')}/>
                    <Image style={routeStyle.Image2} source={require('../img/detail03.png')}/>
                  </View>
                  <View style={routeStyle.Left}>
                    <Text
                      style={[routeStyle.Text, routeStyle.Text1]}>{Ctrl.setOrderStatusDateTime(this.state.detailData.order, 't0', 'date')}</Text>
                    <Text
                      style={[routeStyle.Text, routeStyle.Text2]}>{Ctrl.setOrderStatusDateTime(this.state.detailData.order, 't0', 'time')}</Text>
                  </View>
                  <View style={routeStyle.Right}>
                    <Text style={routeStyle.Text}>成功创建无人机运单</Text>
                  </View>
                </View>
              </View>
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
                                    onPress={() => this._onBack()}
                  >
                    <Image source={require('../img/ic_back.png')}/>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                  <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>运单详情</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
                </View>
              </View>
              <View style={routeStyle.rContianer}>
                <View style={[routeStyle.rItem, {marginBottom: 15, marginTop: 1,}]}>
                  <Text
                    style={[routeStyle.rTextLeft, {flex: 2}]}>运单编号:&nbsp;&nbsp;&nbsp;{(this.state.detailData.order.serial_no == '') ? this.state.detailData.order.id : this.state.detailData.order.serial_no}</Text>
                  <Text
                    style={[routeStyle.rTextRight, {flex: 1}]}>{Ctrl.orderState(this.state.detailData.order.state)}</Text>
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
                <View style={[routeStyle.rItem, {marginBottom: 20}]}>
                  <Text style={routeStyle.rTextLeft}>飞行时间</Text>
                  <Text style={routeStyle.rTextRight}><Text
                    style={routeStyle.rTextValue}>{(this.state.detailData.order.route.route.duration / 60).toFixed(0)}</Text><Text
                    style={routeStyle.rTextName}>分钟</Text></Text>
                </View>
                <DialPhone url={'tel:' + this.state.detailData.order.route.airport[1].phone}
                           title={this.state.detailData.order.route.airport[1].phone}/>
              </View>

              <View style={routeStyle.container}>
                <Text style={routeStyle.gridTitle}>包裹动态</Text>
                <View style={routeStyle.content}>
                  <View style={routeStyle.ImageArea}>
                    <Image style={routeStyle.Image1} source={require('../img/detail01.png')}/>
                    <Image style={routeStyle.Image2} source={require('../img/detail03.png')}/>
                  </View>
                  <View style={routeStyle.Left}>
                    <Text
                      style={[routeStyle.Text, routeStyle.Text1]}>{Ctrl.setOrderStatusDateTime(this.state.detailData.order, 't4', 'date')}</Text>
                    <Text
                      style={[routeStyle.Text, routeStyle.Text2]}>{Ctrl.setOrderStatusDateTime(this.state.detailData.order, 't4', 'time')}</Text>
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
                    <Text
                      style={[routeStyle.Text, routeStyle.Text1]}>{Ctrl.setOrderStatusDateTime(this.state.detailData.order, 't2', 'date')}</Text>
                    <Text
                      style={[routeStyle.Text, routeStyle.Text2]}>{Ctrl.setOrderStatusDateTime(this.state.detailData.order, 't2', 'time')}</Text>
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
                    <Text
                      style={[routeStyle.Text, routeStyle.Text1]}>{Ctrl.setOrderStatusDateTime(this.state.detailData.order, 't0', 'date')}</Text>
                    <Text
                      style={[routeStyle.Text, routeStyle.Text2]}>{Ctrl.setOrderStatusDateTime(this.state.detailData.order, 't0', 'time')}</Text>
                  </View>
                  <View style={routeStyle.Right}>
                    <Text style={routeStyle.Text}>成功创建无人机运单</Text>
                  </View>
                </View>
              </View>
            </View>
          )
        }
      }
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
                                onPress={() => this._onBack()}
              >
                <Image source={require('../img/ic_back.png')}/>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
              <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>运单详情</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
            </View>
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
    flex: 3,
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
    fontSize: 15 * Ctrl.pxToDp()
  },
  rTextRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    color: '#313131',
    fontSize: 15 * Ctrl.pxToDp()
  },
  rTextValue: {
    color: '#E98B21',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    fontSize: 22 * Ctrl.pxToDp(),
  },
  container: {
    flex: 2,
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    marginLeft: -20,
  },
  Left: {
    flex: 2,
    paddingTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: '#313131',
  },
  Right: {
    flex: 4,
    paddingTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: '#313131',
  },
  Text: {
    marginBottom: 10,
    fontSize: 15 * Ctrl.pxToDp(),
    color: '#313131',
  },
  Text1: {
    marginBottom: -2,
    color: '#A09F9F',
    fontSize: 12 * Ctrl.pxToDp(),
  },
  Text2: {
    fontSize: 18 * Ctrl.pxToDp(),
    fontWeight: 'bold',
  },
  gridTitle: {
    fontSize: 16 * Ctrl.pxToDp(),
    color: '#313131',
    marginTop: 7,
    marginBottom: 7,
  },
});
