/**
 * Created by hongty on 2016/11/15.
 */
import React from 'react';
import {
    View,
    Navigator,
    TouchableOpacity,
    ToolbarAndroid,
    Text,
    DrawerLayoutAndroid
} from 'react-native';
import ScanComponent from './ScanComponent';
import PickerComponent from './PickerComponent';
import Button from './Button';
// import DrawerLayoutMenu from './DrawerLayoutMenu';
export default class LoginSuccess extends React.Component {
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

    onIconClicked() {
        this.drawer.openDrawer();
    }

    // renderNavigationViewtest(){
    //     drawerWidth={150}
    //     drawerPosition={DrawerLayoutAndroid.positions.left}
    //     renderNavigationView={() => navigationView}
    // }

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
                drawerWidth={150}
                drawerPosition={DrawerLayoutAndroid.positions.left}
                renderNavigationView={() => navigationView}>
                <View>
                    <View onIconClicked={this.onIconClicked}>
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
                        }}>
                            <Text style={{color: '#fff',}}>抽屉来不来</Text>
                        </TouchableOpacity>
                    </View>
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
        // return (
        //
        //     <View>
        //         <DrawerLayoutMenu/>
        //         <TouchableOpacity style={{marginTop: 60, padding: 18,}}>
        //             <View>
        //                 <PickerComponent/>
        //                 <PickerComponent/>
        //                 <TouchableOpacity style={{
        //                     backgroundColor: '#313131',
        //                     marginTop: 10,
        //                     height: 54,
        //                     borderWidth: 0.3,
        //                     borderColor: '#a09f9f',
        //                     borderRadius: 4,
        //                     flexDirection: 'row',
        //                     justifyContent: 'center',
        //                     alignItems: 'center',
        //                     fontSize: 17,
        //                 }} onPress={this._openPage.bind(this)}>
        //                     <Text style={{color: '#fff',}}>我要寄件</Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </TouchableOpacity>
        //     </View>
        // );
    }

}