/**
 * Created by hongty on 2016/11/15.
 */
/**
  * Sample React Native App
  * https://github.com/facebook/react-native
  */
import React, {Component} from 'react';
import  {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
} from 'react-native';

export default class DrawerLayoutMenu extends Component {
    render() {
        var navigationView = (
            <View style={{flex: 1, backgroundColor: 'blue'}}>
                <Text style={{margin: 10, color: '#fff', fontSize: 15, textAlign: 'center'}}>我是导航功能栏标题</Text>
                <Text
                    style={{marginTop: 10, marginLeft: 20, color: '#fff', fontSize: 15, textAlign: 'left'}}>1.功能1</Text>
                <Text
                    style={{marginTop: 10, marginLeft: 20, color: '#fff', fontSize: 15, textAlign: 'left'}}>2.功能2</Text>
            </View>
        );
        return (
            <DrawerLayoutAndroid
                {/*ref={(ref) => { this.drawer = ref; }}*/}
                drawerWidth={250}
                drawerPosition={DrawerLayoutAndroid.positions.left}
                renderNavigationView={() => navigationView}>
            </DrawerLayoutAndroid>
        );
    }
}
