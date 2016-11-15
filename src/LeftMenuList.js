/**
 * Created by hongty on 2016/11/15.
 */
import React, {Component} from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
    Dimensions,
    DrawerLayoutAndroid
} from 'react-native';
const homeImg = require('../img/home.png');
const categoryImg = require('../img/category.png');
const inspectionImg = require('../img/inspection.png');
const infoImg = require('../img/info.png');
export default class LeftMenuList extends Component {
    constructor(props) {
        super(props);
        this.renderNavigationView = this.renderNavigationView.bind(this);
        this.onIconClicked = this.onIconClicked.bind(this);
    }

    onIconClicked() {
        this.drawer.openDrawer();
    }

    renderNavigationViewItem(image, title, index) {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd'
                }}
                onPress={() => this.onPressDrawerItem(index)}
            >
                <Image
                    style={{
                        width: 30,
                        height: 30,
                        marginLeft: 5
                    }}
                    source={image}
                />
                <Text style={{
                    fontSize: 18,
                    marginLeft: 15,
                    textAlign: 'center',
                    color: 'black'
                }}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }

// {/*<View style={[styles.container, {backgroundColor: '#fcfcfc'}]}>*/}

    renderNavigationView() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#FFF'
            }}>
                <View style={{
                    height: 120,
                    justifyContent: 'flex-end',
                    padding: 20,
                    backgroundColor: '#3e9ce9'
                }}>
                    <Text>
                        让生活更精彩
                    </Text>
                </View>
                {this.renderNavigationViewItem(homeImg, '首页', 0)}
                {this.renderNavigationViewItem(categoryImg, '分类', 1)}
                {this.renderNavigationViewItem(inspectionImg, '建议', 2)}
                {this.renderNavigationViewItem(infoImg, '关于', 3)}
            </View>
        );
    }

    render() {
        return (
            <DrawerLayoutAndroid
                ref={(ref) => {
                    this.drawer = ref;
                }}
                drawerWidth={Dimensions.get('window').width / 5 * 3}
                drawerPosition={Platform.OS === 'android' ? DrawerLayoutAndroid.positions.Left : 'left'}
                renderNavigationView={this.renderNavigationView}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: '#FFF'
                }}>
                    <Text
                        title="iReading"
                        onIconClicked={this.onIconClicked}
                    >这是主页面，凡人勿进</Text>
                </View>
            </DrawerLayoutAndroid>
        )
    }
}