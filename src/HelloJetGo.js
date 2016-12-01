/**
 * Created by hongty on 2016/11/8.
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
  Image,
  AsyncStorage,
  ToastAndroid,
  TouchableHighlight,
} from 'react-native';
import LoginPage from './LoginPage';
import Main from './Main';

export default class HelloJetGo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    }
  }

  //坚挺页面变化
  onPageSelected = function (e) {
    //默认从0 开始，0是第一页
    this.setState({page: e.nativeEvent});
    // console.log('CurrentPage: ' + e.nativeEvent.position);
    ToastAndroid.show('CurrentPage: ' + e.nativeEvent.position, ToastAndroid.SHORT);
  }

  pageJump() {
    let _this = this;
    AsyncStorage.getItem("LOGIN_TOKEN", function (errs, result) {
      if (!errs) {
        let TOKEN = result;
        // alert(TOKEN);
        if (TOKEN && TOKEN != "") {
          _this.props.navigator.push({
            name: 'Main',
            component: Main
          });
        } else {
          _this.props.navigator.push({
            name: 'LoginPage',
            component: LoginPage
          });
        }
        console.log("取得的Token 是", TOKEN);
      } else {
        _this.props.navigator.push({
          name: 'LoginPage',
          component: LoginPage
        });
        console.log('LOGIN_TOKEN 不存在，请重新登录')
      }
    })
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    let page = this.state.page;
    return (
      <View style={styles.bg}>
        <ViewPagerAndroid style={styles.container}
                          onPageSelected={this.onPageSelected.bind(this)}
          // 初始化页面，从第一个开始
                          initialPage={0}>
          <View style={styles.container}>
            <Image source={require('../img/bg1.jpg')} style={styles.image}/>
            <Text style={styles.welcome}>
              医生叫我进行光合作用{'\n'}
              不要熬夜了
            </Text>
          </View>
          <View style={styles.container}>
            <Image source={require('../img/bg2.jpg')} style={styles.image}/>
            <Text style={styles.welcome}>
              人生不断向前的秘诀{'\n'}
              就是忘记从那里来 记得到哪里去
            </Text>
          </View>
          <View style={styles.container}>
            <Image source={require('../img/bg3.jpg')} style={styles.image}/>
            <Text style={styles.welcome}>
              天下物流，唯快不破{'\n'}
            </Text>
          </View>
          <View style={styles.container}>
            <Image source={require('../img/bg1.jpg')} style={styles.image}/>
            <Text style={styles.welcome}>
              欢迎使用JetGo无人机{'\n'}
              我在，阻隔不再
            </Text>
            <TouchableHighlight style={{
              backgroundColor: '#313131',
              width: 200,
              marginTop: 10,
              height: 54,
              borderWidth: 0.3,
              borderColor: '#a09f9f',
              borderRadius: 4,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#55ACEE',
              margin: 18,
            }} onPress={()=> {
              this.pageJump()
            }}>
              <Text style={{color: '#fff', fontSize: 20,}}>启动</Text>
            </TouchableHighlight>
          </View>

        </ViewPagerAndroid>
        <View style={styles.slider}>
          <View style={styles.ol}>
            <View style={page == 0 ? styles.currt : styles.li}></View>
            <View style={page == 1 ? styles.currt : styles.li}></View>
            <View style={page == 2 ? styles.currt : styles.li}></View>
            <View style={page == 3 ? styles.currt : styles.li}></View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#CCFF66',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  welcome: {
    fontSize: 16,
    textAlign: 'center',
  },
  slider: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ol: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: 20,
    width: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    margin: 20,
  },
  li: {
    backgroundColor: 'rgba(255,255,255,1.0)',
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  currt: {
    backgroundColor: 'rgba(255,255,255,1.0)',
    height: 10,
    width: 15,
    borderRadius: 5,
  },
});
