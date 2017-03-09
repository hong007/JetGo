/**
 * Created by hongty on 2016/12/26.
 */
import React, {Component} from 'react';
import{
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker,
  Image,
  TextInput,
  Platform,
  DeviceEventEmitter,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import {toastShort} from './common/ToastUtil';
import ModalPicker from 'react-native-modal-picker'

import NetUtil from './NetUtil';
import Ctrl from './Ctrl';
import ModalComp from './ModalComp';


class PickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airports_status: false,
      airportsData: [],
      airportsEndData: [],
      stationStart: '--请选择--',
      stationEnd: '--请选择--',

      isLoadModalVisible: false,
    };
  }

  componentDidMount() {
    // let url = "http://jieyan.xyitech.com/config/allroute?token=" + token;
    let _this = this;
    _this.setState({
      isLoadModalVisible: true
    });
    _this.timer = setTimeout(
      ()=> {
        _this.setState({
          isLoadModalVisible: false
        });
      }, 25000
    );
    AsyncStorage.getItem("LOGIN_TOKEN", function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        let Token = result;
        // console.log("取得缓存中的Token是  ", Token, "  ");
        let url = "http://jieyan.xyitech.com/spoint/search?token=" + Token;
        NetUtil.postJson(url, (responseText)=> {
          let curdata = JSON.parse(responseText);
          console.log('返回的站点数据是 ', curdata);
          if (curdata.err == '0') {
            // console.log('初始化站点数据');
            let airports = JSON.stringify(curdata.msg);
            airports = JSON.parse(airports);
            // console.log('airports list is ', airports);
            let TempStation = [];
            for (let i = 0; i < airports.length; i++) {
              let singleStation = {};
              singleStation.index = airports[i].id;
              singleStation.label = airports[i].name;
              TempStation.push(singleStation);
              if (i == 0) {
                _this.chooseAirPorts(airports[i].id, airports[i].name)
              }
            }
            // console.log("转换后的数据是  ", TempStation);
            _this.setState({
              airports_status: true,
              airportsData: TempStation,
              isLoadModalVisible: false
            });
          } else {
            _this.setState({
              isLoadModalVisible: false
            });
            toastShort('获取航路失败请重试');
            DeviceEventEmitter.emit("routeChange", false);
          }
        });
      }
    })
  }

  chooseAirPorts(index, value) {
    this.setState({
      stationStart: value,
    });
    // console.log("取得的站点id是", index);
    let _this = this;
    console.log("请求之前打开模态框");
    // if (Platform.OS === "android") {
    // _this.setState({
    //   isLoadModalVisible: true
    // });
    // }
    _this.timer = setTimeout(
      ()=> {
        _this.setState({
          isLoadModalVisible: false
        });
      }, 25000
    );
    AsyncStorage.getItem("LOGIN_TOKEN", function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        let Token = result;
        // console.log("取得缓存中的Token是  ", Token, "  ");
        let url = "http://jieyan.xyitech.com/route/search?sid=" + index + "&token=" + Token;
        NetUtil.postJson(url, (responseText)=> {
          let curdata = JSON.parse(responseText);
          if (curdata.err == '0') {
            let routes = JSON.stringify(curdata.msg);
            routes = JSON.parse(routes);
            console.log('routes list is ', routes, '  ', typeof routes);
            if (routes.length > 0) {
              _this.setState({
                isLoadModalVisible: true
              });
              let TempStation = [];
              for (let i = 0; i < routes.length; i++) {
                let singleStation = {};
                singleStation.index = routes[i].id;
                singleStation.label = routes[i].ename + ' —— ' + routes[i].name;
                TempStation.push(singleStation);
                if (i == 0) {
                  _this.chooseAirPortsEnd(routes[i].id, routes[i].ename + ' —— ' + routes[i].name)
                }
              }
              _this.setState({
                // start_airports_load: true,
                airportsEndData: TempStation,
                // isLoadModalVisible: false,
              });

              console.log("请求成功关闭模态框");
              DeviceEventEmitter.emit("routeChange", true);

            } else {
              _this.timer = setTimeout(
                ()=> {
                  _this.setState({
                    stationEnd: '--请选择--',
                    airportsEndData: [],
                    isLoadModalVisible: false,
                  });
                  toastShort('该站点没有对应航路，请重试');
                  DeviceEventEmitter.emit("routeChange", false);
                }, 1000
              );
            }
          } else {
            _this.timer = setTimeout(
              ()=> {
                _this.setState({
                  airportsEndData: [],
                  isLoadModalVisible: false
                });
                toastShort('获取航路失败请重试');
                DeviceEventEmitter.emit("routeChange", false);
              }, 1000
            );
          }
        });
      }
    });
  }

  chooseAirPortsEnd(index, value) {
    let _this = this;
    _this.timer = setTimeout(
      ()=> {
        _this.setState({
          stationEnd: value,
          isLoadModalVisible: false,
        });
      }, 1000
    );
    AsyncStorage.setItem("ROUTE_ID", index);
    console.log('存储的航路id是', index);
  }

  render() {
    if (this.state.airports_status) {
      return (
        <View style={PickerStyle.Container}>
          <View style={PickerStyle.ModalItem}>
            <ModalPicker
              optionStyle={{height: 60 * Ctrl.pxToDp(), paddingTop: 15}}
              data={this.state.airportsData}
              initValue="--请选择--"
              cancelText="取消"
              cancelStyle={{height: 50 * Ctrl.pxToDp(), paddingTop: 15 * Ctrl.pxToDp()}}
              optionTextStyle={PickerStyle.OptionsText}
              onChange={(option)=> {
                this.chooseAirPorts(option.index, option.label)
              }}>
              <Text
                style={[PickerStyle.pickerText, {
                  borderBottomWidth: 1,
                  borderColor: '#F2F2F2',
                }]}>{this.state.stationStart}</Text>
            </ModalPicker>
            <View style={PickerStyle.bgSPoint}></View>
          </View>
          <View style={PickerStyle.ModalItem}>
            <ModalPicker
              optionStyle={{height: 60 * Ctrl.pxToDp(), paddingTop: 15,}}
              data={this.state.airportsEndData}
              initValue="--请选择--"
              cancelText="取消"
              cancelStyle={{height: 50 * Ctrl.pxToDp(), paddingTop: 15 * Ctrl.pxToDp()}}
              optionTextStyle={PickerStyle.OptionsText}
              onChange={(option)=> {
                this.chooseAirPortsEnd(option.index, option.label)
              }}>
              <Text
                style={PickerStyle.pickerText}>{this.state.stationEnd}</Text>
            </ModalPicker>
            <View style={PickerStyle.bgEPoint}></View>
          </View>
          <ModalComp modalValue={this.state.isLoadModalVisible}/>
        </View>
      )
    } else {
      return (
        <View style={PickerStyle.Container}>
          <View style={PickerStyle.ModalItem}>
            <ModalPicker
              optionStyle={{height: 60 * Ctrl.pxToDp(), paddingTop: 15,}}
              data={this.state.airportsData}
              initValue="--请选择--"
              cancelText="取消"
              cancelStyle={{height: 50 * Ctrl.pxToDp(), paddingTop: 15 * Ctrl.pxToDp()}}
              optionTextStyle={PickerStyle.OptionsText}
              onChange={(option)=> {
                this.chooseAirPorts(option.index, option.label)
              }}>
              <Text
                style={[PickerStyle.pickerText, {
                  borderBottomWidth: 1,
                  borderColor: '#F2F2F2',
                }]}>{this.state.stationStart}</Text>
            </ModalPicker>
            <View style={PickerStyle.bgSPoint}></View>
          </View>
          <View style={PickerStyle.ModalItem}>
            <ModalPicker
              optionStyle={{height: 60 * Ctrl.pxToDp(), paddingTop: 15}}
              data={this.state.airportsEndData}
              initValue="--请选择--"
              cancelText="取消"
              cancelStyle={{height: 50 * Ctrl.pxToDp(), paddingTop: 15 * Ctrl.pxToDp()}}
              optionTextStyle={PickerStyle.OptionsText}
              onChange={(option)=> {
                this.chooseAirPortsEnd(option.index, option.label)
              }}>
              <Text
                style={PickerStyle.pickerText}>{this.state.stationEnd}</Text>
            </ModalPicker>
            <View style={PickerStyle.bgEPoint}></View>
          </View>
          <ModalComp modalValue={this.state.isLoadModalVisible}/>
        </View>
      )
    }
  }
}
const PickerStyle = StyleSheet.create({
  Container: {
    height: 100 * Ctrl.pxToDp(),
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  ModalItem: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  pickerText: {
    padding: 15 * Ctrl.pxToDp(),
    height: 50 * Ctrl.pxToDp(),
    fontSize: 16 * Ctrl.pxToDp(),
    textAlign: 'center',
    color: '#313131',
  },
  OptionsText: {},
  bgSPoint: {
    width: 8 * Ctrl.pxToDp(),
    height: 8 * Ctrl.pxToDp(),
    borderRadius: 4 * Ctrl.pxToDp(),
    backgroundColor: '#3EC556',
    position: 'absolute',
    left: 10,
    top: 21 * Ctrl.pxToDp(),
  },
  bgEPoint: {
    width: 8 * Ctrl.pxToDp(),
    height: 8 * Ctrl.pxToDp(),
    borderRadius: 4 * Ctrl.pxToDp(),
    position: 'absolute',
    left: 10,
    top: 21 * Ctrl.pxToDp(),
    backgroundColor: '#ED684A'
  }
})

export default PickerComponent;