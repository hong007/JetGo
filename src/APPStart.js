/**
 * Created by hongty on 2016/12/13.
 */
import React, {Component} from 'react';
import  {
  View,
  Image,
  Platform,
  StatusBar,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import LoginPage from './LoginPage';
import Main from './Main';
export default class APPStart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // this.pageJump();
    let _this = this;
    AsyncStorage.getItem("LOGIN_TOKEN", function (errs, result) {
      if (!errs) {
        let TOKEN = result;
        TOKEN = JSON.stringify(TOKEN);
        console.log("取得的Token是", TOKEN, "  长度是  ", TOKEN.length);
        if (TOKEN && TOKEN != "" && TOKEN.length > 50) {
          _this.timer = setTimeout(
            ()=> {
              _this.props.navigator.push({
                name: 'Main',
                component: Main
              });
            }, 300
          )

        } else {
          _this.props.navigator.push({
            name: 'LoginPage',
            component: LoginPage
          });
        }
      }
    })
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../img/AppStart.png')}/>
      </View>
    );
  }
};