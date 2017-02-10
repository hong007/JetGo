/**
 * Created by hongty on 2016/12/8.
 */
/**
 * Created by hongty on 2016/11/14.
 */
import React, {Component} from 'react';
import  {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Image,
  Picker,
  Modal,
  StatusBar,
  ToastAndroid,
  BackAndroid,
  AsyncStorage,
  Dimensions,
  DeviceEventEmitter,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import ReactNative from 'react-native'
import getFlight from './getFlight';
import Main from './Main';
import NetUtil from './NetUtil';
import GridChild from './GridChild';
import BarcodeScanner from './BarcodeScanner';
import Ctrl from './Ctrl';
import ModalComp from './ModalComp';

var Token;
var orderTypeList = [];
var packagetype = [];
export default class ScanComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scannText: '',
      packageWeight: '1',
      text: '',
      dataload: false,
      sname: '',
      ename: '',
      distance: '',
      duration: '',
      initialChecked: false,
      totalChecked: 0,
      orderType: '',
      orderId: '',
      isPackageType: false,
      setChoosedType: '请选择',
      barcodeResult: '',
      girdModalVisible: false,
      isLoadModalVisible: false,
    };
    this.fid = '';
  }

  componentDidMount() {
    // StatusBar.setBackgroundColor('#000', true);
    Ctrl.setStatusBar();

    let _this = this;
    DeviceEventEmitter.addListener("changeBarCode", (events)=> {
      _this.setState({scannText: events})
    })

    BackAndroid.addEventListener('hardwareBackPress', function () {
      if (_this.lastBackPressed && _this.lastBackPressed + 1000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
      }
      _this.lastBackPressed = Date.now();
      //ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      this.__onBack();
      return true;
    });
    AsyncStorage.multiGet(["LOGIN_TOKEN", "ROUTE_ID"], function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        let curdata = result;
        Token = result[0][1];
        let route_id = result[1][1];
        console.log("获得的单个航路id 是  ", route_id);
        let url = "http://jieyan.xyitech.com/config/route?token=" + Token + "&id=" + route_id;
        NetUtil.postJson(url, (responseText)=> {
          let curdata = JSON.parse(responseText);
          console.log("获得的单个航路信息是  ", curdata);
          if (curdata.err == '0') {
            _this.setState({
              // sname:"121",
              dataload: true,
              sname: curdata.route.sname,
              ename: curdata.route.ename,
              distance: (curdata.route.distance / 1000).toFixed(0),
              duration: (curdata.route.duration / 60).toFixed(0),
            });
            // console.log("存储缓存中的route是  ", JSON.stringify(curdata.route));
            AsyncStorage.setItem("SINGLE_ROUTE", JSON.stringify(curdata.route));
          } else {
            // alert("没有该航路，请重试");
            ToastAndroid.show('没有该航路，请重试', ToastAndroid.SHORT);
          }
        });
        // alert(route_id)
      }
    });
  }

  setModalVisible(visible) {
    this.setState({
      girdModalVisible: visible,
    });
  }

  _modalOpenSetOrderTypeList() {
    this.setState({
      girdModalVisible: true,
      setChoosedType: '请选择'
    });
    orderTypeList = [];
  }

  _onBack() {
    this.props.navigator.push({
      name: 'Main',
      component: Main
    });
  }

  scrollViewTo(e) {
    let target = e.nativeEvent.target;
    let scrollLength = 0;//初始值
    if (target === ReactNative.findNodeHandle(this.refs.hour)) {
      scrollLength = 216;
    }
    this.refs.scroll.scrollTo({y: scrollLength, x: 0});
  }

  onChildChanged(newState, value) {
    // alert(newState);
    console.log('物品种类是否选中，', newState, "  选中的值是 ", value);
    if (newState == true) {
      this.removeByValue(orderTypeList, value);
      newState = -1;
    } else {
      let curItem = value;
      for (var i = 0; i < orderTypeList.length; i++) {
        if (curItem == orderTypeList[i]) {
          return false;
          break;
        }
      }
      orderTypeList.push(curItem);
      console.log('orderTypeList，', orderTypeList);
      newState = 1;
    }
    this._setChoosedType(String(orderTypeList));

    // alert(newState + "" + value+"  "+String(orderTypeList));

    // var newTotal = this.state.totalChecked + (newState ? 1 : -1);
    var newTotal = this.state.totalChecked + newState;
    this.setState({
      totalChecked: newTotal,
    });
  }

  removeByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        // break;
      }
    }
  }

  _setChoosedType(data) {
    let curdata = data;
    if (curdata.length == 0) {
      this.setState({
        setChoosedType: '请选择'
      })
    } else {
      this.setState({
        setChoosedType: curdata
      })
    }

  }

  orderCreate() {
    let _this = this;
    // _this.pageJump();

    AsyncStorage.getItem("ROUTE_ID", function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        // alert("取得的AIRPORTS是" + result);
        // this.initAirPorts(result);
        let route_id = result;
        let pWeight = _this.state.packageWeight;
        let reg = /^([1-9]\d*|0)(\.\d{1,2})?$/;
        if (!reg.test(pWeight)) {
          // alert(123)
          // alert("重量必须为数字，不能含有中英文字符");
          ToastAndroid.show('重量必须为数字，不能含有中英文字符!', ToastAndroid.SHORT);
          return false;
        }
        if (pWeight > 5) {
          // alert("包裹重量不能大于5公斤");
          ToastAndroid.show('包裹重量不能大于5公斤!', ToastAndroid.SHORT);
          return false;
        }
        // if(typeof pWeight!="number"){
        //   alert("重量必须为数字");
        //   return false;
        // }
        if (pWeight == '' || !pWeight) {
          pWeight = 1;
        }
        let curtype = orderTypeList;
        let packageList = '';
        packagetype = [];
        for (let i = 0; i < curtype.length; i++) {
          if (curtype[i] == "报纸") {
            packagetype.push("paper=1");
          }
          if (curtype[i] == "信件") {
            packagetype.push("letter=1");
          }
          if (curtype[i] == "刊物") {
            packagetype.push("magzine=1");
          }
          if (curtype[i] == "包裹") {
            packagetype.push("package=1");
          }
          if (curtype[i] == "其他") {
            packagetype.push("other=1");
          }
        }
        if (packagetype.length == 0) {
          // packageList = "package=1"
          // packageList = null;
        } else {
          packageList = packagetype.join("&");
        }
        // alert(packageList)
        let url = "http://jieyan.xyitech.com/order/create?token=" + Token + "&routeid=" + route_id + "&remark=1&fid=" + _this.state.scannText + "&weight=" + pWeight + "&" + packageList;
        console.log("提交的信息是  ", url);
        // alert("提交的信息是  " + url);
        if (_this.state.scannText == "") {
          // alert("飞机id不能为空");
          ToastAndroid.show('飞机id不能为空!', ToastAndroid.SHORT);
        } else if (!_this.state.scannText) {
          // alert("飞机id不存在");
          ToastAndroid.show('飞机id不存在!', ToastAndroid.SHORT);
        } else {
          _this.setState({
            isLoadModalVisible: true
          });
          _this.timer = setTimeout(
            ()=> {
              _this.setState({
                isLoadModalVisible: false
              });
            }, 10000
          )
          NetUtil.postJson(url, (responseText)=> {
            if (!responseText || responseText == "") {
              // alert("提交失败，请重试！");
              ToastAndroid.show('提交失败，请重试!', ToastAndroid.SHORT);
            } else {
              let curdata = JSON.parse(responseText);
              console.log("返回的信息是  ", curdata, "  数据类型是  ", typeof curdata, "  订单id是 ", curdata.id);
              if (curdata.err == '0') {
                // console.log("存储缓存中的ORDER_ID是  ", JSON.stringify(curdata.id));
                // AsyncStorage.setItem("ORDER_ID", JSON.stringify(curdata.id));
                AsyncStorage.setItem("DETAIL_ID", JSON.stringify(curdata.id));

                _this.timer = setTimeout(
                  ()=> {
                    _this.setState({
                      isLoadModalVisible: false
                    });
                    _this.pageJump();
                  }, 300
                )
              } else {
                // alert("错误，请重试");
                ToastAndroid.show('错误，请重试!', ToastAndroid.SHORT);
              }
            }
          })
        }
      }
    });
  }

  _textInputFocus() {
    this.setState({
      isPackageType: false,
    })
  }

  pageJump() {
    this.props.navigator.push({
      title: '飞机起飞',
      name: 'getFlight',
      component: getFlight
    });
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    if (this.state.dataload) {
      if (!this.state.isPackageType) {
        return (
          <ScrollView ref='scroll' keyboardShouldPersistTaps={true}>
            <View style={{
              flex: 1,
              backgroundColor: '#f7f7f7',
            }} onStartShouldSetResponderCapture={(e) => {
              let target = e.nativeEvent.target;
              if (target !== ReactNative.findNodeHandle(this.refs.hour)) {
                this.refs.hour.blur();
              }
            }}>
              <View style={{
                flex: 1,
                backgroundColor: '#f7f7f7',
              }}
              >
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
                    onPress={() => this._onBack()}
                  >
                    <Image source={require('../img/ic_back.png')}/>
                  </TouchableOpacity>
                  <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>飞机扫码</Text>
                </View>
                <View style={scanStyle.TextInputView}>
                  <TextInput style={scanStyle.TextInput}
                             underlineColorAndroid='transparent'  returnKeyType ='done'
                             placeholder='扫码或输入无人机上的二维码'
                             keyboardType="numeric"
                             clearButtonMode="unless-editing"
                             value={this.state.scannText}
                             onChangeText={
                               (scannText) => {
                                 this.setState({scannText});
                                 this.fid = scannText;
                                 AsyncStorage.setItem("FID", scannText);
                               }
                             }
                  />
                  <Image style={{position: 'absolute', right: 18, top: 10 * Ctrl.pxToDp()}}
                         source={require('../img/scanner.png')}>
                    <Text
                      style={{backgroundColor: 'transparent', height: 44 * Ctrl.pxToDp(), width: 44 * Ctrl.pxToDp()}}
                      onPress={()=> {
                        this.props.navigator.push({
                          name: 'BarcodeScanner',
                          component: BarcodeScanner
                        });
                      }}></Text></Image>
                  <Text style={{height: 0,}}>{this.state.scannText}</Text>
                </View>
                <View style={routeStyle.rContianer}>
                  <View style={routeStyle.rItem}>
                    <Text style={routeStyle.rTextLeft}>无人机行程</Text>
                    <Text style={routeStyle.rTextRight}>{this.state.sname}&nbsp;-&nbsp;{this.state.ename}</Text>
                  </View>
                  <View style={routeStyle.rItem}>
                    <Text style={routeStyle.rTextLeft}>飞行距离</Text>
                    <Text style={routeStyle.rTextRight}><Text
                      style={routeStyle.rTextValue}>{this.state.distance}</Text><Text
                      style={routeStyle.rTextName}>公里</Text></Text>
                  </View>
                  <View style={routeStyle.rItem}>
                    <Text style={routeStyle.rTextLeft}>飞行时间</Text>
                    <Text style={routeStyle.rTextRight}><Text
                      style={routeStyle.rTextValue}>{this.state.duration}</Text><Text
                      style={routeStyle.rTextName}>分钟</Text></Text>
                  </View>

                  <View style={[routeStyle.rItem, {marginTop: 20,}]}>
                    <Text style={routeStyle.rTextLeft}>选择货物</Text>
                    <Text style={[routeStyle.rTextRight, routeStyle.Textgray]}
                          onPress={()=> {
                            this._modalOpenSetOrderTypeList();
                          }}>{this.state.setChoosedType}</Text>
                    <Image style={{marginLeft: 8, marginTop: 2}} source={require('../img/arrow.png')}/>
                  </View>

                  <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.girdModalVisible}
                    onRequestClose={() => {
                      alert("Modal has been closed.")
                    }}
                  >
                    <View style={{
                      flex: 1,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      justifyContent: 'flex-end'
                    }}>
                      <View style={{
                        backgroundColor: '#fff',
                        width: Dimensions.get('window').width,
                        height: 180 * Ctrl.pxToDp(),
                        paddingTop: 16,
                      }}>
                        <Text style={scanStyle.gridTitle}>请选择货物类型(多选)</Text>
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            width: 40,
                            height: 40,
                            paddingRight: 18,
                            paddingTop: 20,
                            alignItems: 'flex-end',
                          }}
                          onPress={()=> {
                            this.setModalVisible(!this.state.girdModalVisible);
                          }}>
                          <Image source={require('../img/close.png')}/>
                        </TouchableOpacity>
                        <View style={scanStyle.gridContent}>
                          <GridChild text="报纸" orderName="报纸" orderType="paper"
                                     initialChecked={this.state.initialChecked}
                                     callbackParent={(initialChecked, orderName, ordertype)=>this.onChildChanged(initialChecked, "报纸", "paper")}/>
                          <GridChild text="信件" orderName="信件" orderType="letter"
                                     initialChecked={this.state.initialChecked}
                                     callbackParent={(initialChecked, orderName, ordertype)=>this.onChildChanged(initialChecked, "信件", "letter")}/>
                          <GridChild text="刊物" orderName="刊物" orderType="magzine"
                                     initialChecked={this.state.initialChecked}
                                     callbackParent={(initialChecked, orderName, ordertype)=>this.onChildChanged(initialChecked, "刊物", "magzine")}/>
                          <GridChild text="包裹" orderName="包裹" orderType="package"
                                     initialChecked={this.state.initialChecked}
                                     callbackParent={(initialChecked, orderName, ordertype)=>this.onChildChanged(initialChecked, "包裹", "package")}/>
                        </View>

                        <View style={[scanStyle.gridContent, {marginTop: -15}]}>

                          <GridChild text="其他" orderName="其他" orderType="other"
                                     initialChecked={this.state.initialChecked}
                                     callbackParent={(initialChecked, orderName, orderType)=>this.onChildChanged(initialChecked, "其他", "other")}/>
                        </View>
                      </View>
                    </View>
                  </Modal>

                  <View style={routeStyle.rItem}>
                    <Text style={routeStyle.rTextLeft}>物品重量</Text>
                    <TextInput
                      style={[scanStyle.TextInput, {marginRight: 10, width: 60 * Ctrl.pxToDp(), textAlign: 'right'}]}
                      underlineColorAndroid='transparent'  returnKeyType ='done'
                      placeholder='1公斤'
                      keyboardType="numeric"
                      clearButtonMode="unless-editing"
                      placeholderTextColor='#a09f9f'
                      onFocus={
                        ()=> {
                          this._textInputFocus();
                          this.scrollViewTo.bind(this)
                        }
                      }
                      onEndEditing={()=> {
                        this.refs.scroll.scrollTo({y: 0, x: 0, animated: true})
                      }}
                      onChangeText={
                        (packageWeight) => {
                          this.setState({packageWeight});
                        }
                      }
                      ref='hour'
                    />
                    <Text style={{height: 0,}}>{this.state.packageWeight}</Text>
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
                  this.orderCreate()
                }}>
                  <Text style={{color: '#fff', fontSize: 17 * Ctrl.pxToDp(),}}>提交</Text>
                </TouchableOpacity>
                <ModalComp modalValue={this.state.isLoadModalVisible}/>
              </View>
            </View>
          </ScrollView>
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
              onPress={() => this._onBack()}
            >
              <Image source={require('../img/ic_back.png')}/>
            </TouchableOpacity>
            <Text style={{textAlign: 'center', color: '#313131', fontSize: 17 * Ctrl.pxToDp(),}}>飞机扫码</Text>
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
    textAlign: 'right',
    color: '#313131',
    fontSize: 15 * Ctrl.pxToDp(),
  },
  Textgray: {
    color: '#A09F9F',
    // backgroundColor: '#f10',
    paddingTop: 10,
    paddingBottom: 10,
  },
  rTextValue: {
    color: '#E98B21',
    fontSize: 22 * Ctrl.pxToDp(),
  }
})
const scanStyle = StyleSheet.create({
  TextInputView: {
    height: 44 * Ctrl.pxToDp(),
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#a09f9f',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 20,
    backgroundColor: '#fff',
    marginBottom: 1
  },
  TextInput: {
    height: 44 * Ctrl.pxToDp(),
    fontSize: 14 * Ctrl.pxToDp(),
  },
  gridContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 9999,
    paddingTop: 18,
  },
  gridContent: {
    flex: 1,
    height: 60 * Ctrl.pxToDp(),
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  gridTitle: {
    fontSize: 16 * Ctrl.pxToDp(),
    color: '#313131',
    marginBottom: 5,
    marginLeft: 16,
    zIndex: -1,
  },
});