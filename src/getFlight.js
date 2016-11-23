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
  AsyncStorage,
} from 'react-native';
import LeftMenuList from './LeftMenuList';
import ChildCompontent from './ChildCompontent';

export default class getFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      age: null,
      initialChecked: false,
      totalChecked: 0,
      orderId: '',

      fid: '',

      sname: '',
      ename: '',
      distance: '',
      duration: '',
    }
  }

  componentDidMount() {
    let _this = this;
    AsyncStorage.getItem("FID", function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        let curfid = result;
        _this.setState({
          fid: curfid,
        });
        console.log("取得缓存中的orderid是  ", curfid, "  ");
      }
    });
    AsyncStorage.getItem("ORDER_ID", function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        let order_id = result;
        _this.setState({
          orderId: order_id,
        });
        console.log("取得缓存中的orderid是  ", order_id, "  ");
      }
    });
    AsyncStorage.getItem("SINGLE_ROUTE", function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        let single_route = JSON.parse(result);
        console.log("取得缓存中的route是  ", single_route);
        _this.setState({
          sname: single_route.sname,
          ename: single_route.ename,
          distance: (single_route.distance / 1000).toFixed(0),
          duration: (single_route.duration / 60).toFixed(0),
        });
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
    return (
      <View style={{flex: 1, backgroundColor: '#f7f7f7',}}>
        <View style={{
          height: (Platform.OS === 'android' ? 42 : 50),
          backgroundColor: '#fff',
          flexDeriction: 'row',
          alignItem: 'center',
          paddingTop: 15,
          paddingLeft: 18
        }}>
          <TouchableOpacity
            style={{top: 15, left: 18, position: 'absolute', zIndex: 999999}}

            onPress={() => this.props.navigator.pop()}
          >
            <Image source={require('../img/ic_back.png')}/>
          </TouchableOpacity>
          <Text style={{textAlign: 'center'}}>飞机起飞</Text>
        </View>
        <View style={routeStyle.rContianer}>
          <View style={[routeStyle.rItem, {marginBottom: 1, height: 50}]}>
            <Text style={routeStyle.rTextLeft}>订单编号:{this.state.orderId}</Text>
          </View>
          <View style={[routeStyle.rItem, {height: 95}]}>
            <Image source={require('../img/flight.png')}/>

            <View style={{height: 95, flex: 3, flexDirection: 'column'}}>
              <View style={[routeStyle.rItem, {height: 20}]}>
                <Text style={routeStyle.rTextLeft}>{this.state.fid}</Text>
                <Text style={routeStyle.rTextRight}><Text style={routeStyle.rTextValue}>10</Text><Text
                  style={routeStyle.rTextName}>公里</Text></Text>
              </View>
              <View style={[routeStyle.rItem, {height: 16}]}>
                <Text style={routeStyle.rTextLeft}>杭垓</Text>
              </View>

              <View style={[routeStyle.rItem, {height: 16}]}>
                <Text style={routeStyle.rTextLeft}>七管</Text>
                <Text style={routeStyle.rTextRight}><Text
                  style={[routeStyle.rTextValue, {fontSize: 22}]}>15</Text><Text
                  style={routeStyle.rTextName}>分钟</Text></Text>
              </View>
            </View>

          </View>
          {/*<Text style={scanStyle.gridTitle}>How many are checked:{this.state.totalChecked}</Text>*/}
          <Text style={scanStyle.gridTitle}>飞前准备</Text>
          <ChildCompontent text='货物已装载完成'
                           initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
          <ChildCompontent text='电池已安装完成'
                           initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
          <ChildCompontent text='放置起降区中心' initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>
          <ChildCompontent text='起降区无人进入' initialChecked={this.state.initialChecked}
                           callbackParent={(initialChecked)=>this.onChildChanged(initialChecked)}/>

        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={{
            backgroundColor: '#E98B21',
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
          }} onPress={this._openPage.bind(this)}>
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
  rLeftView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rRightView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
  }
});
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
    marginBottom: 30,
  },
  TextInput: {
    height: 44,
  },
  gridContainer: {
    flex: 1,
    marginTop: 20,
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
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 16,
  },
  gridItem: {
    width: 72,
    height: 36,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    color: '#a09f9f',
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 2.4,
    paddingTop: 8,
  },
  gridText: {
    width: 72,
    textAlign: 'center',
  }
});