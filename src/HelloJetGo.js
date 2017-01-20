/**
 * Created by Skipper on 2017/1/17.
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Dimensions,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;
import AppIntro from 'react-native-app-intro';
import LoginPage from './LoginPage';
import Main from './Main';
import ModalComp from './ModalComp';

export default class HelloJetGo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      isLoadModalVisible: false
    }
  }

  componentWillMount() {
    // this.pageJump();
    let _this = this;
    AsyncStorage.getItem("LOGIN_TOKEN", function (errs, result) {
      if (!errs) {
        let TOKEN = result;
        // alert(TOKEN);
        TOKEN = JSON.stringify(TOKEN);
        console.log("取得的Token是", TOKEN, "  长度是  ", TOKEN.length)
        if (TOKEN && TOKEN != "" && TOKEN.length > 50) {
          _this.setState({
            // isLogin: true,
            isLoadModalVisible: false
          });
          _this.props.navigator.push({
            name: 'Main',
            component: Main,
            params: {
              title: 'main'
            }
          });
        } else {
          _this.setState({
            isLogin: true,
            isLoadModalVisible: false
          });
        }
      }
    })
  }

  // onSkipBtnHandle = (index) => {
  // Alert.alert('Skip','欢迎使用来到安静的猫的APP');
  // this.props.navigator.push({
  //   name: "Main",
  //   component: Main,
  // });
  // console.log(index);
// }
  doneBtnHandle = () => {
    // Alert.alert('Done','欢迎使用来到安静的猫的APP');
    // this.props.navigator.push({
    //   name: "Main",
    //   component: Main,
    // });
    let _this = this;
    AsyncStorage.getItem("LOGIN_TOKEN", function (errs, result) {
      if (!errs) {
        let TOKEN = result;
        // alert(TOKEN);
        TOKEN = JSON.stringify(TOKEN);
        console.log("取得的Token是", TOKEN, "  长度是  ", TOKEN.length)
        if (TOKEN && TOKEN != "" && TOKEN.length > 50) {
          _this.setState({
            isLogin: true,
          });
          _this.props.navigator.push({
            name: 'Main',
            component: Main,
            params: {
              title: 'main'
            }
          });
        } else {
          _this.props.navigator.push({
            name: 'LoginPage',
            component: LoginPage,
            params: {
              title: 'loginpage'
            }
          });
        }
        console.log("取得的Token 是", TOKEN);
      } else {
        _this.props.navigator.push({
          name: 'LoginPage',
          component: LoginPage,
          params: {
            title: 'loginpage'
          },
        });
        console.log('LOGIN_TOKEN 不存在，请重新登录')
      }
    })
  }
  nextBtnHandle = (index) => {
    // Alert.alert('Next');
    console.log(index);
  }
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    if (!this.state.isLogin) {
      return (
        <ModalComp modalValue={this.state.isLoadModalVisible}/>
      )
    } else {
      return (
        <AppIntro
          onNextBtnClick={this.nextBtnHandle}
          onDoneBtnClick={this.doneBtnHandle}
          onSkipBtnClick={this.doneBtnHandle}
          onSlideChange={this.onSlideChangeHandle}
        >
          <View style={[styles.slide, {backgroundColor: '#fa931d'}]}>
            <View style={[styles.header, {width: windowsWidth}]}>
              <View>
                <Image style={{width: 75 * 2.5, height: 63 * 2.5}} source={require('../img/1/c1.jpg')}/>
              </View>
              <View style={{
                position: 'absolute',
                top: 80,
                left: 30,
                width: windowsWidth,
                height: windowsHeight,
              }} level={20}
              >
                <Image style={{width: 46 * 2.5, height: 28 * 2.5}} source={require('../img/1/c2.jpg')}/>
              </View>
              <View style={{
                position: 'absolute',
                top: 23,
                left: 25,
                width: windowsWidth,
                height: windowsHeight,
              }} level={20}
              >
                <Image style={{width: 109 * 2.5, height: 68 * 2.5}} source={require('../img/1/c5.png')}/>
              </View>
              <View style={{
                position: 'absolute',
                top: 65,
                left: 35,
                width: windowsWidth,
                height: windowsHeight,
              }} level={5}
              >
                <Image style={{width: 23 * 2.5, height: 17 * 2.5}} source={require('../img/1/c3.png')}/>
              </View>
            </View>
            <View style={styles.info}>
              <View level={10}><Text style={styles.title}>JetGo</Text></View>
              <View level={15}><Text style={styles.description}>医生叫我进行光合作用{'\n'}
                不要熬夜了!</Text></View>
            </View>
          </View>
          <View style={[styles.slide, {backgroundColor: '#a4b602'}]}>
            <View style={[styles.header, {width: windowsWidth}]}>
              <View>
                <Image style={{width: 75 * 2.5, height: 63 * 2.5}} source={require('../img/2/1.jpg')}/>
              </View>
              <View style={{
                position: 'absolute',
                top: 30,
                left: 40,
                width: windowsWidth,
                height: windowsHeight,
              }} level={20}
              >
                <Image style={{width: 101 * 2.5, height: 71 * 2.5}} source={require('../img/2/2.png')}/>
              </View>
              <View style={{
                position: 'absolute',
                top: 10,
                left: 50,
                width: windowsWidth,
                height: windowsHeight,
              }} level={-20}
              >
                <Image style={{width: 85 * 2.5, height: 73 * 2.5}} source={require('../img/2/3.png')}/>
              </View>
            </View>
            <View style={styles.info}>
              <View level={10}><Text style={styles.title}>JetGo</Text></View>
              <View level={15}><Text style={styles.description}>人生不断向前的秘诀{'\n'}
                就是忘记从那里来{'\n'}记得到哪里去!</Text></View>
            </View>
          </View>
          <View style={[styles.slide, {backgroundColor: '#406E9F'}]}>
            <View style={[styles.header, {width: windowsWidth}]}>
              <View style={{
                position: 'absolute',
                top: 20,
                left: 20,
                width: windowsWidth,
                height: windowsHeight,
              }}
              >
                <Image style={{width: 138 * 2.5, height: 83 * 2.5}} source={require('../img/3/3.png')}/>
              </View>
              <View style={{
                position: 'absolute',
                top: 25,
                left: 40,
                width: windowsWidth,
                height: windowsHeight,
              }} level={-15}
              >
                <Image style={{width: 103 * 2.5, height: 42 * 2.5}} source={require('../img/3/4.png')}/>
              </View>
              <View level={10}>
                <Image style={{width: 95 * 2.5, height: 55 * 2.5}} source={require('../img/3/1.jpg')}/>
              </View>
              <View style={{
                position: 'absolute',
                top: 65,
                left: 120,
                width: windowsWidth,
                height: windowsHeight,
              }} level={25}
              >
                <Image style={{width: 47 * 2.5, height: 43 * 2.5}} source={require('../img/3/2.png')}/>
              </View>
            </View>
            <View style={styles.info}>
              <View level={10}><Text style={styles.title}>JetGo</Text></View>
              <View level={15}><Text style={styles.description}>天下物流，唯快不破{'\n'}!</Text></View>
            </View>
          </View>
          <View style={[styles.slide, {backgroundColor: '#DB4302'}]}>
            <View style={[styles.header, {width: windowsWidth}]}>
              <View style={{
                position: 'absolute',
                top: 25,
                left: 55,
                width: windowsWidth,
                height: windowsHeight,
              }} level={15}
              >
                <Image style={{width: 96 * 2.5, height: 69 * 2.5}} source={require('../img/4/4.png')}/>
              </View>
              <View>
                <Image style={{width: 50 * 2.5, height: 63 * 2.5}} source={require('../img/4/1.jpg')}/>
              </View>
              <View style={{
                position: 'absolute',
                top: 20,
                left: 70,
                width: windowsWidth,
                height: windowsHeight,
              }} level={20}
              >
                <Image style={{width: 46 * 2.5, height: 98 * 2.5}} source={require('../img/4/3.png')}/>
              </View>
            </View>
            <View style={styles.info}>
              <View level={10}><Text style={styles.title}>JetGo</Text></View>
              <View level={15}><Text style={styles.description}>欢迎使用JetGo无人机{'\n'}
                我在，阻隔不再!</Text></View>
            </View>
          </View>
        </AppIntro>
      );
    }
  }

}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    width: 75 * 2,
    height: 63 * 2,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  info: {
    flex: 0.5,
    alignItems: 'center',
    padding: 40
  },
  title: {
    color: '#fff',
    fontSize: 30,
    paddingBottom: 20,
  },
  description: {
    color: '#fff',
    fontSize: 20,
  },
});
