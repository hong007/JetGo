/**
 * Created by hongty on 2016/11/15.
 */
import React from 'react';
import {
  View,
  Navigator,
  StyleSheet,
  ToolbarAndroid,
  Text,
  Image,
  Platform,
  Dimensions,
  StatusBar,
  Modal,
  Linking,
  BackAndroid,
  AsyncStorage,
  ScrollView,
  DeviceEventEmitter,
  TouchableOpacity,
  DrawerLayoutAndroid,
  TouchableHighlight
} from 'react-native';
import {toastShort} from './common/ToastUtil';
import SideMenu from 'react-native-side-menu';
const menu_user = require('../img/menu_user.png');
const menu_order = require('../img/menu_order.png');
const menu_phone = require('../img/menu_phone.png');
const menu_lay = require('../img/menu_lay.png');
const menu_about = require('../img/menu_about.png');
const menu_quit = require('../img/menu_quit.png');

import CommonStyle from './CommonStyle';

import ScanComponent from './ScanComponent';
import PickerComponent from './ModalPicker';
import Button from './Button';
import LeftMenuList from './LeftMenuList';
import NetUtil from './NetUtil';
import OrderListView from './OrderListView';
import LoginPage from './LoginPage';
import OnlineHelp from './OnlineHelp';
import Lawyer from './Lawyer';
import AboutUS from './AboutUS';
import Ctrl from './Ctrl';
import ModalComp from './ModalComp';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeid: '',
      loginName: '犀利哥',
      isLogin: true,
      showLeadingModal: false,
      isRouteTrue: false,
    };
  }

  //回到第一个页面去
  onJump() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  componentWillMount() {
    // StatusBar.setBackgroundColor('#f00', true);
    Ctrl.setStatusBar();
    let _this = this;
    _this.setState({
      loginStatus: false,
    });

    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);

    DeviceEventEmitter.addListener("routeChange", (events)=> {
      _this.setState({isRouteTrue: events})
    });
    AsyncStorage.multiGet(["LOGIN_TOKEN", "LOGIN_USERNAME"], function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        // let Token = result;
        let curdata = result;
        let curToken = result[0][1];
        let curUsername = result[1][1];
        if (curToken && curToken != '' && curUsername && curUsername != '') {
          if (curToken.length > 60 && curUsername.length >= 1) {
            _this.setState({
              loginName: curUsername,
              isLogin: true,
            })
          } else {
            _this.setState({
              loginName: "登录"
            })
          }
        }
        // console.log("取得缓存中的Token是  ", curToken, "  长度是  ",curToken.lenght);
        // alert("取得缓存中的result是  " + curToken + "  长度是  " + curToken.length+"   "+ "curUsername  "+curUsername+"  长度是  " + curUsername.length+"   ");
      }
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  onBackAndroid = () => {
    const nav = this.props.navigator;
    const routers = nav.getCurrentRoutes();
    let curTitle = this.props.title;
    // alert(this.state.routeTitle);
    if (curTitle == 'main') {
      if (this.lastBackPressed && this.lastBackPressed + 500 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
      }
      this.lastBackPressed = Date.now();
      return true;
    }
  }

  pageJump() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    this.props.navigator.push({
      name: 'OrderListView',
      component: OrderListView,
      params: {
        title: 'OrderListView'
      },
    });
  }

  _openPage() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    this.setState({showLeadingModal: false});
    this.props.navigator.push({
      name: 'ScanComponent',
      component: ScanComponent,
      params: {
        title: 'ScanComponent'
      },
    })
  }

  _sideMunuToggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({isOpen,});
  }

  // openDrawer() {
  //   this.refs.drawerLayout.openDrawer()
  // }
  //
  // closeDrawer() {
  //   this.refs.drawerLayout.closeDrawer()
  // }

  _isLoadedRoute() {
    if (this.state.isRouteTrue) {
      this.setState({
        showLeadingModal: true
      })
    } else {
      toastShort('没有选择航路，请先选择航路')
    }
  }

  _openLeftMenuPage(name) {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    let curPage = name;
    if (curPage == "LoginPage") {
      if (this.state.loginName == "登录") {
        this.props.navigator.push({
          name: "LoginPage",
          component: LoginPage,
          params: {
            title: 'LoginPage'
          },
        });
      } else {
        return
      }

    } else if (curPage == "OrderListView") {
      this.props.navigator.push({
        name: "OrderListView",
        component: OrderListView,
        params: {
          title: 'OrderListView'
        },
      });
    } else if (curPage == "OnlineHelp") {
      this.props.navigator.push({
        name: "OnlineHelp",
        component: OnlineHelp,
        params: {
          title: 'OnlineHelp'
        },
      });
    } else if (curPage == "Lawyer") {
      this.props.navigator.push({
        name: "Lawyer",
        component: Lawyer,
        params: {
          title: 'Lawyer'
        },
      });
    } else if (curPage == "AboutUS") {
      this.props.navigator.push({
        name: "AboutUS",
        component: AboutUS,
        params: {
          title: 'AboutUS'
        },
      });
    } else if (curPage == "QuitLogin") {
      AsyncStorage.setItem("LOGIN_USERNAME", '');
      AsyncStorage.setItem("LOGIN_USERPWD", '');
      AsyncStorage.setItem("LOGIN_TOKEN", '');
      this.props.navigator.push({
        name: "LoginPage",
        component: LoginPage,
      });
    }
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    if (this.state.isLogin) {
      var navigationView = (
        <View style={{backgroundColor: '#1b1b1b', paddingTop: 24, height: Dimensions.get('window').height,}}
              onPress={()=>this.closeDrawer()}
        >
          <LeftMenuList title={this.state.loginName} pageName="LoginPage" imageSource={menu_user}
                        _leftMenuPress={(pageName)=> {
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
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: 40,
            width: Dimensions.get('window').width,
            position: 'absolute',
            top: Dimensions.get('window').height - 74 * Ctrl.pxToDp(),
            bottom: 30,
            left: 30,
            right: 0,
          }} onPress={(value)=> {
            this._openLeftMenuPage('QuitLogin')
          }}>
            <Image
              style={{
                resizeMode: Image.resizeMode.strech,
                marginLeft: 5,
              }}
              source={menu_quit}
            />
            <Text style={{
              fontSize: 16 * Ctrl.pxToDp(),
              marginLeft: 15,
              textAlign: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              退出
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      var navigationView = (
        <View style={{flex: 1, backgroundColor: '#1b1b1b', paddingTop: 24, height: Dimensions.get('window').height,}}
              onPress={()=>this.closeDrawer()}
        >
          <LeftMenuList title={this.state.loginName} pageName="LoginPage" imageSource={menu_user}
                        _leftMenuPress={(pageName)=> {
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
    }

    if (Platform.OS === 'android') {
      return (
        <SideMenu
          menu={navigationView}
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenuState(isOpen)}>
          <View style={CommonStyle.container}>
            <View style={CommonStyle.navigationBar}>
              <View style={CommonStyle.onbackArea}>
                <TouchableOpacity style={CommonStyle.onbackAreaCont}
                                  onPress={()=>this._sideMunuToggle()}>
                  <Image style={{}} source={require('../img/menu.png')}/>
                </TouchableOpacity>
              </View>
              <View style={CommonStyle.title}>
                <Image source={require('../img/jy_logo.png')}/>
              </View>
              <View style={CommonStyle.titleRight}>
                <TouchableOpacity style={CommonStyle.titleRightText} onPress={() => this.pageJump()}>
                  <Image source={require('../img/icon_order.png')}/>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flex: 4, marginTop: 20, padding: 18,}}>
              <PickerComponent refs="picker"/>
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
              zIndex: 9999,
            }} onPress={()=> {
              this._isLoadedRoute()
            }}>
              <Text style={{color: '#fff', fontSize: 17 * Ctrl.pxToDp(),}}>我要寄件</Text>
            </TouchableOpacity>
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
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.showLeadingModal}
            onRequestClose={() => {
              {/*alert("Modal has been closed.")*/
              }
            }}
          >
            <View style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.8)',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{
                flex: 3, justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}>
                <Text style={LeadingStyle.title}>
                  操作提示——
                </Text>
                <Text style={LeadingStyle.item}>1. 将待运送货物装载至无人机</Text>
                <Text style={LeadingStyle.item}>2. 为无人机安装好满电电池</Text>
                <Text style={LeadingStyle.item}>3. 将无人机放置在起降区中心</Text>
                <Text style={LeadingStyle.item}>4. 开启无人机电源</Text>
                <Text style={LeadingStyle.item}>5. 确保起降区无人员进入</Text>
              </View>
              <View style={{flex: 2, justifyContent: 'flex-end', padding: 18, width: Dimensions.get('window').width}}>
                <TouchableOpacity style={{
                  backgroundColor: '#fff',
                  marginTop: 10,
                  height: 54 * Ctrl.pxToDp(),
                  borderRadius: 4,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 9999,
                }} onPress={()=> {
                  this._openPage()
                }}>
                  <Text style={{color: '#313131', fontSize: 17 * Ctrl.pxToDp(),}}>完成</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 0,
                  top: (Platform.OS === 'android' ? 0 : 20),
                  width: 40,
                  height: 40,
                  paddingRight: 18,
                  paddingTop: 15,
                  alignItems: 'flex-end',
                }}
                onPress={()=> {
                  this.setState({showLeadingModal: false});
                }}>
                <Image source={require('../img/mainclose.png')}/>
              </TouchableOpacity>

            </View>
          </Modal>
        </SideMenu>
      )
    } else {
      return (
        <ScrollView style={{backgroundColor: '#1b1b1b',}}>
          <SideMenu
            menu={navigationView}
            isOpen={this.state.isOpen}
            onChange={(isOpen) => this.updateMenuState(isOpen)}>
            <View style={[CommonStyle.container, {zIndex: 99999}]}>
              <View style={CommonStyle.navigationBar}>
                <View style={CommonStyle.onbackArea}>
                  <TouchableOpacity style={CommonStyle.onbackAreaCont}
                                    onPress={()=>this._sideMunuToggle()}>
                    <Image style={{}} source={require('../img/menu.png')}/>
                  </TouchableOpacity>
                </View>
                <View style={CommonStyle.title}>
                  <Image source={require('../img/jy_logo.png')}/>
                </View>
                <View style={CommonStyle.titleRight}>
                  <TouchableOpacity style={CommonStyle.titleRightText} onPress={() => this.pageJump()}>
                    <Image source={require('../img/icon_order.png')}/>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flex: 4, marginTop: 20, padding: 18,}}>
                <PickerComponent refs="picker"/>
              </View>
              <TouchableOpacity style={{
                backgroundColor: '#313131',
                height: 54 * Ctrl.pxToDp(),
                borderWidth: 0.3,
                borderColor: '#a09f9f',
                borderRadius: 4,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#55ACEE',
                zIndex: 9999,
                position: 'absolute',
                top: Dimensions.get('window').height - 74 * Ctrl.pxToDp(),
                left: 18 * Ctrl.pxToDp(),
                right: 18 * Ctrl.pxToDp(),
                bottom: 10,
              }} onPress={()=> {
                this._isLoadedRoute()
              }}>
                <Text style={{color: '#fff', fontSize: 17 * Ctrl.pxToDp(),}}>我要寄件</Text>
              </TouchableOpacity>
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
            <Modal
              animationType={"fade"}
              transparent={true}
              visible={this.state.showLeadingModal}
              onRequestClose={() => {
                {/*alert("Modal has been closed.")*/
                }
              }}
            >
              <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.8)',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <View style={{
                  flex: 3, justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                }}>
                  <Text style={LeadingStyle.title}>
                    操作提示——
                  </Text>
                  <Text style={LeadingStyle.item}>1. 将待运送货物装载至无人机</Text>
                  <Text style={LeadingStyle.item}>2. 为无人机安装好满电电池</Text>
                  <Text style={LeadingStyle.item}>3. 将无人机放置在起降区中心</Text>
                  <Text style={LeadingStyle.item}>4. 开启无人机电源</Text>
                  <Text style={LeadingStyle.item}>5. 确保起降区无人员进入</Text>
                </View>
                <View style={{
                  flex: 2,
                  justifyContent: 'flex-end',
                  padding: 18 * Ctrl.pxToDp(),
                  width: Dimensions.get('window').width
                }}>
                  <TouchableOpacity style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    height: 54 * Ctrl.pxToDp(),
                    borderRadius: 4,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999,
                  }} onPress={()=> {
                    this._openPage()
                  }}>
                    <Text style={{color: '#313131', fontSize: 17 * Ctrl.pxToDp(),}}>完成</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: (Platform.OS === 'android' ? 0 : 20),
                    width: 40,
                    height: 40,
                    paddingRight: 18,
                    paddingTop: 15,
                    alignItems: 'flex-end',
                  }}
                  onPress={()=> {
                    this.setState({showLeadingModal: false});
                  }}>
                  <Image source={require('../img/mainclose.png')}/>
                </TouchableOpacity>
              </View>
            </Modal>
          </SideMenu>
        </ScrollView>
      );
    }
  }
}
const LeadingStyle = StyleSheet.create({
  title: {
    fontSize: 23 * Ctrl.pxToDp(),
    color: '#fff',
    marginBottom: 20,
  },
  item: {
    fontSize: 16 * Ctrl.pxToDp(),
    color: '#fff',
    marginBottom: 10,
  }
})