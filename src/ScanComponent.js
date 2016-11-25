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
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import getFlight from './getFlight';
import NetUtil from './NetUtil';
import GridChild from './GridChild';
var Token;
export default class ScanComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scannText: '',
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

      isShowing: false,
      isPackage: false,
    };
    this.fid = '';
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

    AsyncStorage.getItem("ROUTE_ID", function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        let route_id = result;
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
            console.log("存储缓存中的route是  ", JSON.stringify(curdata.route));
            AsyncStorage.setItem("SINGLE_ROUTE", JSON.stringify(curdata.route));
          } else {
            alert("没有该航路，请重试")
          }
        });
        // alert(route_id)
      }
    });
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
        let url = "http://jieyan.xyitech.com/order/create?token=" + Token + "&routeid=" + route_id + "&remark=1&fid=" + _this.fid + "&weight=1" + "&paper=1&letter=1&magzine=1&package=1&other=1";
        console.log("提交的信息是  ", url);
        if (_this.fid == "") {
          alert("飞机id不能为空");
        } else if (!_this.fid) {
          alert("飞机id不存在");
        } else {
          NetUtil.postJson(url, (responseText)=> {
            if (!responseText || responseText == "") {
              alert("提交失败，请重试！")
            } else {
              let curdata = JSON.parse(responseText);
              console.log("返回的信息是  ", curdata, "  数据类型是  ", typeof curdata, "  订单id是 ", curdata.id);
              if (curdata.err == '0') {
                // console.log("存储缓存中的ORDER_ID是  ", JSON.stringify(curdata.id));
                // AsyncStorage.setItem("ORDER_ID", JSON.stringify(curdata.id));
                AsyncStorage.setItem("DETAIL_ID", JSON.stringify(curdata.id));
                _this.pageJump();
              } else {
                alert("错误，请重试")
              }
            }
          })
        }
      }
    });
  }

  pageJump() {
    this.props.navigator.push({
      title: '飞机起飞',
      name: 'getFlight',
      component: getFlight
    });
  }

  showBottomDialog() {
    // if (value == "package") {
    //   return
    // }
    // (value)=> {
    //   this.setState({isShowing: (this.state.isShowing ? false : true)})
    // }
    // let n=value;
    if (this.state.isShowing) {
      alert(1);
      this._isShowUp();
    } else {
      alert(2);
    }
  }

  _isShowUp() {
    if (this.state.isShowing) {
      return (
        <View style={scanStyle.gridContent}>
          <GridChild text="报纸" orderType="paper" initialChecked={this.state.initialChecked}
                     callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
          <GridChild text="信件" orderType="letter" initialChecked={this.state.initialChecked}
                     callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
          <GridChild text="刊物" orderType="magzine" initialChecked={this.state.initialChecked}
                     callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
          <GridChild text="包裹" orderType="package" initialChecked={this.state.initialChecked}
                     callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
        </View>
      )
    } else {
      return null
    }

  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    if (this.state.dataload) {
      if (!this.state.isShowing && !this.state.isPackage) {
        return (
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
                style={{top: 15, left: 18, position: 'absolute', zIndex: 999999}}

                onPress={() => this.props.navigator.pop()}
              >
                <Image source={require('../img/ic_back.png')}/>
              </TouchableOpacity>
              <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>飞机扫码</Text>
            </View>
            <View style={scanStyle.TextInputView}>
              <TextInput style={scanStyle.TextInput}
                         underlineColorAndroid='transparent'
                         placeholder='扫码或输入无人机上的二维码'
                         onChangeText={
                           (scannText) => {
                             this.setState({scannText});
                             this.fid = scannText;
                             AsyncStorage.setItem("FID", scannText);
                           }
                         }
              />
              <Text style={{height: 0,}}>{this.state.scannText}</Text>
            </View>
            <View style={routeStyle.rContianer}>
              {/*<View style={routeStyle.rItem}>*/}
              {/*<Text style={routeStyle.rTextLeft}>无人机编号</Text>*/}
              {/*<Text style={routeStyle.rTextRight}>131231231</Text>*/}
              {/*</View>*/}
              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>无人机行程</Text>
                <Text style={routeStyle.rTextRight}>{this.state.sname}-{this.state.ename}</Text>
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

              <View style={routeStyle.rItem}
              >
                <Text style={routeStyle.rTextLeft}>选择货物</Text>
                <Text style={routeStyle.rTextRight}
                      onPress={()=> {
                        this.setState({isShowing: (this.state.isShowing ? false : true)})
                      }}>包裹</Text>
                <Image style={{marginLeft: 8, marginTop: 2}} source={require('../img/arrow.png')}/>
              </View>

              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>物品重量</Text>
                <Text style={routeStyle.rTextRight} onPress={()=> {
                  this.setState({isPackage: (this.state.isPackage ? false : true)})
                }}>1公斤</Text>
                <Image style={{marginLeft: 8, marginTop: 2}} source={require('../img/arrow.png')}/>

              </View>
            </View>
            <View style={routeStyle.rContianer}></View>
            <TouchableOpacity style={{
              backgroundColor: '#313131',
              marginTop: 10,
              height: 54,
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
              <Text style={{color: '#fff',}}>提交</Text>
            </TouchableOpacity>

          </View>
        )
      } else if (this.state.isShowing) {
        return (
          <View style={{
            flex: 1,
            backgroundColor: '#f7f7f7',
          }}>
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
              <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>飞机扫码</Text>
            </View>
            <View style={scanStyle.TextInputView}>
              <TextInput style={scanStyle.TextInput}
                         underlineColorAndroid='transparent'
                         placeholder='扫码或输入无人机上的二维码'
                         onChangeText={
                           (scannText) => {
                             this.setState({scannText});
                             this.fid = scannText;
                             AsyncStorage.setItem("FID", scannText);
                           }
                         }
              />
              <Text style={{height: 0,}}>{this.state.scannText}</Text>
            </View>
            <View style={routeStyle.rContianer}>
              {/*<View style={routeStyle.rItem}>*/}
              {/*<Text style={routeStyle.rTextLeft}>无人机编号</Text>*/}
              {/*<Text style={routeStyle.rTextRight}>131231231</Text>*/}
              {/*</View>*/}
              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>无人机行程</Text>
                <Text style={routeStyle.rTextRight}>{this.state.sname}-{this.state.ename}</Text>
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

              <View style={routeStyle.rItem}
              >
                <Text style={routeStyle.rTextLeft}>选择货物</Text>
                <Text style={routeStyle.rTextRight}
                      onPress={()=> {
                        this.setState({isPackage: false})
                        this.setState({isShowing: (this.state.isShowing ? false : true)})
                      }}>包裹</Text>
                <Image style={{marginLeft: 8, marginTop: 2}} source={require('../img/arrow.png')}/>

              </View>

              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>物品重量</Text>
                <Text style={routeStyle.rTextRight} onPress={()=> {
                  this.setState({isShowing: false})
                  this.setState({isPackage: (this.state.isPackage ? false : true)})
                }}>1公斤</Text>
                <Image style={{marginLeft: 8, marginTop: 2}} source={require('../img/arrow.png')}/>

              </View>
            </View>
            <View style={routeStyle.rContianer}></View>
            <TouchableOpacity style={{
              backgroundColor: '#313131',
              marginTop: 10,
              height: 54,
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
              <Text style={{color: '#fff',}}>提交</Text>
            </TouchableOpacity>
            <View style={scanStyle.gridContainer}>
              <Text style={scanStyle.gridTitle}>请选择货物类型(多选)</Text>
              <Image style={{position: 'absolute', right: 18, top: 20, zIndex: 999999999}}
                     source={require('../img/close.png')}
                     onPress={()=> {
                       this.setState({isShowing: false})
                     }}
              />
              <View style={scanStyle.gridContent}>
                <GridChild text="报纸" orderType="paper" initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
                <GridChild text="信件" orderType="letter" initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
                <GridChild text="刊物" orderType="magzine" initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
                <GridChild text="包裹" orderType="package" initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
              </View>

              <View style={[scanStyle.gridContent, {marginTop: -15}]}>

                <GridChild text="其他" orderType="other" initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
              </View>
            </View>
          </View>
        )
      } else {
        return (
          <View style={{
            flex: 1,
            backgroundColor: '#f7f7f7',
          }}>
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
              <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>飞机扫码</Text>
            </View>
            <View style={scanStyle.TextInputView}>
              <TextInput style={scanStyle.TextInput}
                         underlineColorAndroid='transparent'
                         placeholder='扫码或输入无人机上的二维码'
                         onChangeText={
                           (scannText) => {
                             this.setState({scannText});
                             this.fid = scannText;
                             AsyncStorage.setItem("FID", scannText);
                           }
                         }
              />
              <Text style={{height: 0,}}>{this.state.scannText}</Text>
            </View>
            <View style={routeStyle.rContianer}>
              {/*<View style={routeStyle.rItem}>*/}
              {/*<Text style={routeStyle.rTextLeft}>无人机编号</Text>*/}
              {/*<Text style={routeStyle.rTextRight}>131231231</Text>*/}
              {/*</View>*/}
              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>无人机行程</Text>
                <Text style={routeStyle.rTextRight}>{this.state.sname}-{this.state.ename}</Text>
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

              <View style={routeStyle.rItem}
              >
                <Text style={routeStyle.rTextLeft}>选择货物</Text>
                <Text style={routeStyle.rTextRight}
                      onPress={()=> {
                        this.setState({isShowing: (this.state.isShowing ? false : true)})
                      }}>包裹</Text>
                <Image style={{marginLeft: 8, marginTop: 2}} source={require('../img/arrow.png')}/>
              </View>

              <View style={routeStyle.rItem}>
                <Text style={routeStyle.rTextLeft}>物品重量</Text>
                <Text style={routeStyle.rTextRight} onPress={()=> {
                  this.setState({isPackage: (this.state.isPackage ? false : true)})
                }}>1公斤</Text>
                <Image style={{marginLeft: 8, marginTop: 2}} source={require('../img/arrow.png')}/>

              </View>
            </View>
            <View style={routeStyle.rContianer}></View>
            <TouchableOpacity style={{
              backgroundColor: '#313131',
              marginTop: 10,
              height: 54,
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
              <Text style={{color: '#fff',}}>提交</Text>
            </TouchableOpacity>
            <View style={scanStyle.gridContainer}>
              <Text style={scanStyle.gridTitle}>请选择货物重量</Text>
              <Image style={{position: 'absolute', right: 18, top: 20, zIndex: 999999999}}
                     source={require('../img/close.png')}
                     onPress={()=> {
                       this.setState({isPackage: false})
                     }}
              />
              <View style={scanStyle.gridContent}>
                <GridChild text="1公斤" orderType="paper" initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
                <GridChild text="1.5公斤" orderType="letter" initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
                <GridChild text="2公斤" orderType="magzine" initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
                <GridChild text="2.5公斤" orderType="package" initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>

              </View>
              <View style={[scanStyle.gridContent, {marginTop: -15}]}>
                <GridChild text="3公斤" orderType="package" initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
                <GridChild text="填其他公斤" orderType="package" initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
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
              onPress={() => this.props.navigator.pop()}
            >
              <Image source={require('../img/ic_back.png')}/>
            </TouchableOpacity>
            <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>飞机扫码</Text>
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
    color: '#E98B21',
  }
})
const scanStyle = StyleSheet.create({
  TextInputView: {
    height: 44,
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#a09f9f',
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#fff',
    marginBottom: 1
  },
  TextInput: {
    height: 44,
  },
  gridContainer: {
    flex: 1,
    // marginTop: 20,
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
    height: 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  gridTitle: {
    fontSize: 16,
    color: '#313131',
    marginBottom: 5,
    marginLeft: 16,
    zIndex: -1,
  },
});
