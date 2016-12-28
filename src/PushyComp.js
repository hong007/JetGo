/**
 * Created by hongty on 2016/12/27.
 */
import React, {Component} from 'react';
import{
  AppRegistry,
  StyleSheet,
  Platform,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update';
import _updateConfig from '../update.json';
import ModalComp from './ModalComp';
const {appKey} = _updateConfig[Platform.OS];
export default class PushyComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadModalVisible: false,
    }
  }

  componentWillMount() {
    if (isFirstTime) {
      markSuccess();
      // Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
      //   {
      //     text: '是', onPress: ()=> {
      //     throw new Error('模拟启动失败,请重启应用')
      //   }
      //   },
      //   {
      //     text: '否', onPress: ()=> {
      //     markSuccess()
      //   }
      //   },
      // ]);
    } else if (isRolledBack) {
      Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
    }
  }

  doUpdate = info => {
    this.setState({
      isLoadModalVisible: true,
    });
    downloadUpdate(info).then(hash => {
      this.setState({
        isLoadModalVisible: false,
      });
      switchVersion(hash);
      // Alert.alert('提示', '下载完毕,是否重启应用?', [
      //   {
      //     text: '是', onPress: ()=> {
      //     switchVersion(hash);
      //   }
      //   },
      //   {text: '否',},
      //   {
      //     text: '下次启动时', onPress: ()=> {
      //     switchVersionLater(hash);
      //   }
      //   },
      // ]);
    }).catch(err => {
      Alert.alert('提示', '更新失败.');
      this.setState({
        isLoadModalVisible: false,
      });
    });
  };
  checkUpdate = () => {
    checkUpdate(appKey).then(info => {
      if (info.expired) {
        Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
          {
            text: '确定', onPress: ()=> {
            info.downloadUrl && Linking.openURL(info.downloadUrl)
          }
          },
        ]);
      } else if (info.upToDate) {
        Alert.alert('提示', '您的应用版本已是最新.');
      } else {
        Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
          {
            text: '是', onPress: ()=> {
            this.doUpdate(info)
          }
          },
          {text: '否',},
        ]);
      }

    }).catch(err => {
      Alert.alert('提示', '更新失败.');
    });
  }

  _onBack() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f7f7f7'
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#fff',
          paddingLeft: 18,
          paddingTop: 5,
          paddingBottom: 5,
        }}>
          <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center',}}>
            <TouchableOpacity style={{
              height: 44,
              width: 44,
              paddingTop: 15,
            }}
                              onPress={() => this._onBack()}
            >
              <Image source={require('../img/ic_back.png')}/>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>版本更新</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            欢迎来到JetGo,{'\n'}我们将为您提供最优质的服务！
          </Text>
          <Text style={styles.instructions}>
            这是版本一 {'\n'}
            当前包版本号: {packageVersion}{'\n'}
            当前版本Hash: {currentVersion || '(空)'}{'\n'}
          </Text>
          <TouchableOpacity onPress={this.checkUpdate}>
            <Text style={styles.instructions}>
              点击这里检查更新{'\n'}
            </Text>
          </TouchableOpacity>
        </View>
        <ModalComp modalValue={this.state.isLoadModalVisible}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 8,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});