/**
 * Created by hongty on 2016/11/15.
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Platform,
  Image,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  DrawerLayoutAndroid,
} from 'react-native';
import LoginPage from './LoginPage';
import Main from './Main';
import OrderListView from './OrderListView';
export default class navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultName: 'LoginPage',
      defaultComponent: LoginPage,
    };
  }

  componentWillMount() {
    let _this=this;
    AsyncStorage.getItem("LOGIN_TOKEN", function (errs, result) {
      if (!errs) {
        const TOKEN = result;
        _this.setState({
          defaultName: 'Main',
          defaultComponent: Main,
        })
        console.log("取得的Token 是", TOKEN);
      }else{
        console.log('LOGIN_TOKEN 不存在，请重新登录')
      }
    })
  }

  openDrawer() {
    this.refs.drawerLayout.openDrawer()
  }

  pageJump() {
    this.props.navigator.push({
      title: '订单列表',
      name: 'OrderListView',
      component: OrderListView
    });
  }

  _renderNavBar() {
    const styles = {
      navigator: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        color: '#313131',
      },
      title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      titleText: {
        fontSize: 18,
        color: '#313131',
        fontWeight: '400',
        alignItems: 'center',
        justifyContent: 'center',
      }
    };
    var routeMapper = {
      LeftButton(route, navigator, index, navState) {
        alert(index);
        if (index > 0) {
          if (route.name == 'Main') {

          } else {
            return (
              <TouchableOpacity
                onPress={() => navigator.pop()}
                style={styles.button}>
                <Image source={require('../img/ic_back.png')}/>
              </TouchableOpacity>
            );
          }

        } else {
          return null
        }
      },
      RightButton(route, navigator, index, navState) {
        return null

      },
      Title(route, navigator, index, navState) {
        if (route.name == 'Main') {
          return null
        } else {
          return (
            <View style={styles.title}>
              <Text style={styles.titleText}>{route.title ? route.title : ' '}</Text>
            </View>
          );
        }

      }
    };
    // if (route.name == 'Main') {
    //     return (
    //         <Navigator.NavigationBar
    //             style={[styles.navigator, {backgroundColor: 'blue',paddingTop:0,}]}
    //             routeMapper={routeMapper}
    //         />
    //     );
    // } else {
    //     return (
    //         <Navigator.NavigationBar
    //             style={styles.navigator}
    //             routeMapper={routeMapper}
    //         />
    //     );
    // }
    return (
      <Navigator.NavigationBar
        style={styles.navigator}
        routeMapper={routeMapper}
      />
    );
  }

  render() {
    let defaultName = this.state.defaultName;
    let defaultComponent = this.state.defaultComponent;
    console.log("defaultName is ",defaultName,'  defaultComponent is',defaultComponent)
    return (
      <Navigator
        initialRoute={{name: defaultName, component: defaultComponent}}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator}/>
        }}
      />
    );
  }

};
