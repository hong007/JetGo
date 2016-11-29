/**
 * Created by hongty on 2016/11/15.
 */
import React from 'react';
import {
  View,
  Navigator,
  ToolbarAndroid,
  Text,
  Image,
  Platform,
  Dimensions,
  ToastAndroid,
  AsyncStorage,
  TouchableOpacity,
  DrawerLayoutAndroid,
  TouchableHighlight
} from 'react-native';
const menu_user = require('../img/menu_user.png');
const menu_order = require('../img/menu_order.png');
const menu_phone = require('../img/menu_phone.png');
const menu_lay = require('../img/menu_lay.png');
const menu_about = require('../img/menu_about.png');


import ScanComponent from './ScanComponent';
import PickerComponent from './PickerComponent';
import Button from './Button';
import LeftMenuList from './LeftMenuList';
import NetUtil from './NetUtil';
import OrderListView from './OrderListView';
import LoginPage from './LoginPage';
import OnlineHelp from './OnlineHelp';
import Lawyer from './Lawyer';
import AboutUS from './AboutUS';

// var token="MiMxNDc5Mzc5MDc3QGppZXlhbi54eWl0ZWNoLmNvbSNvTFdsTTdBR0hqL2tzYlFCd0F1VUtHd2RZNkE9";
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeid: '',
    };
  }

  //回到第一个页面去
  onJump() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  componentDidMount() {
    this.setState({
      loginStatus: false,
    });
    ToastAndroid.show('登录成功', ToastAndroid.SHORT);
  }

  pageJump() {
    this.props.navigator.push({
      title: '订单列表',
      name: 'OrderListView',
      component: OrderListView
    });
  }

  _openPage() {
    this.props.navigator.push({
      title: '飞机扫码',
      name: 'ScanComponent',
      component: ScanComponent
    })
  }

  openDrawer() {
    this.refs.drawerLayout.openDrawer()
  }

  closeDrawer() {
    this.refs.drawerLayout.closeDrawer()
  }

  fatherGetChildData() {
    this.refs.picker.getChildData();
    alert("来来来！")
  }

  _openLeftMenuPage(name) {
    // alert(name);
    let curPage = name;
    if (curPage == "LoginPage") {
      this.props.navigator.push({
        name: "LoginPage",
        component: LoginPage,
      });
    } else if (curPage == "OrderListView") {
      this.props.navigator.push({
        name: "OrderListView",
        component: OrderListView,
      });
    } else if (curPage == "OnlineHelp") {
      this.props.navigator.push({
        name: "OnlineHelp",
        component: OnlineHelp,
      });
    } else if (curPage == "Lawyer") {
      this.props.navigator.push({
        name: "Lawyer",
        component: Lawyer,
      });
    } else if (curPage == "AboutUS") {
      this.props.navigator.push({
        name: "AboutUS",
        component: AboutUS,
      });
    }
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#1b1b1b', paddingTop: 24,}}
            onPress={()=>this.closeDrawer()}
      >
        <LeftMenuList title='犀利哥/登录' pageName="LoginPage" imageSource={menu_user} _leftMenuPress={(pageName)=> {
          this._openLeftMenuPage(pageName)
        }}/>
        <LeftMenuList title='我的订单' pageName="OrderListView" imageSource={menu_order} _leftMenuPress={(pageName)=> {
          this._openLeftMenuPage(pageName)
        }}/>
        <LeftMenuList title='在线帮助' pageName="OnlineHelp" imageSource={menu_phone} _leftMenuPress={(pageName)=> {
          this._openLeftMenuPage(pageName)
        }}/>
        <LeftMenuList title='法律条款' pageName="Lawyer" imageSource={menu_lay} _leftMenuPress={(pageName)=> {
          this._openLeftMenuPage(pageName)
        }}/>
        <LeftMenuList title='关于捷雁' pageName="AboutUS" imageSource={menu_about} _leftMenuPress={(pageName)=> {
          this._openLeftMenuPage(pageName)
        }}/>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        ref={'drawerLayout'}
        drawerBackgroundColor="rgba(188,0,202,0.5)"
        drawerWidth={230}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        onDrawerOpen={()=> {
          console.log('打开了')
        }}
        onDrawerClose={()=> {
          console.log('关闭了')
        }}
        onDrawerSlide={()=>console.log("正在交互......")}
        keyboardDismissMode="on-drag"
        statusBarBackgroundColor='transparent'
      >
        <View style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#FFF'
        }}>

          <View style={{
            backgroundColor: '#fff',
            height: (Platform.OS === 'android' ? 42 : 50)
          }}>
            <TouchableHighlight onPress={()=>this.openDrawer()}
                                style={{paddingLeft: 10, paddingTop: 15, width: 34,}}>
              <Image style={{}} source={require('../img/menu.png')}/>
            </TouchableHighlight>

          </View>
          <TouchableOpacity
            style={{height:42,width:42,top: 0, right: 0, position: 'absolute',}}
            onPress={() => this.pageJump()}
          >
            <Image style={{marginTop:15,}} source={require('../img/icon_order.png')}/>
          </TouchableOpacity>
          <View style={{flex: 1, marginTop: 60, padding: 18,}}>
            <PickerComponent refs="picker"/>
          </View>

          {/*<View style={{zIndex:9999,backgroundColor:'#f10'}}>*/}
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
            zIndex: 9999,
          }} onPress={()=> {
            this._openPage()
          }}>
            <Text style={{color: '#fff',}}>我要寄件</Text>
          </TouchableOpacity>
          {/*</View>*/}
          <Image style={{
            zIndex: -1,
            position: 'absolute',
            top: 34,
            left: 0,
            right: 0,
            bottom: 0,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }} source={require('../img/bg.png')}>
          </Image>

        </View>
      </DrawerLayoutAndroid>
    );
  }
}