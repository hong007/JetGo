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
    TouchableOpacity,
    DrawerLayoutAndroid,
    TouchableHighlight
} from 'react-native';
const homeImg = require('../img/home.png');
const categoryImg = require('../img/category.png');
const inspectionImg = require('../img/inspection.png');
const infoImg = require('../img/info.png');


import ScanComponent from './ScanComponent';
import PickerComponent from './PickerComponent';
import Button from './Button';
import LeftMenuList from './LeftMenuList';
export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    //回到第一个页面去
    onJump() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _openPage() {
        this.props.navigator.push({
            title: '飞机扫码',
            component: ScanComponent
        })
    }

    openDrawer() {
        this.refs.drawerLayout.openDrawer()
    }

    closeDrawer() {
        this.refs.drawerLayout.closeDrawer()
    }

    render() {
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#1b1b1b'}}
                  onPress={()=>this.closeDrawer()}
            >
                <LeftMenuList title='我的订单'/>
                <LeftMenuList title='在线帮助'/>
                <LeftMenuList title='法律条款'/>
                <LeftMenuList title='关于捷雁'/>
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
                    <TouchableHighlight
                        onPress={()=>this.openDrawer()}
                        style={{padding: 10, backgroundColor: '#e6e6e6'}}
                    >
                        <Image
                            source={require('../img/category.png')}
                        />
                    </TouchableHighlight>

                    <TouchableOpacity style={{marginTop: 60, padding: 18,}}>
                        <View>
                            <PickerComponent/>
                            <PickerComponent/>
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
                            }} onPress={this._openPage.bind(this)}>
                                <Text style={{color: '#fff',}}>我要寄件</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}