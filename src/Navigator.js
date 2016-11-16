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
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import Main from './Main';
export default class navigator extends Component {
    constructor(props) {
        super(props);
    }

    _renderNavBar() {
        const styles = {
            navigator: {
                flex: 1,
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                color:'#313131'
            },
            title: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // borderWidth: 0.3,
                // borderColor: '#a09f9f',
                // backgroundColor: 'blue'
            },
            button: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'green'
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
                // if (index = 1) {
                //     return (
                //         <TouchableOpacity
                //         ><Image source={require('../img/category.png')}/>
                //         </TouchableOpacity>
                //     );
                // } else
                if (index > 1) {
                    return (
                        <TouchableOpacity
                            onPress={() => navigator.pop()}
                            style={styles.button}>
                            <Image source={require('../img/ic_back.png')}/>
                        </TouchableOpacity>
                    );
                } else {
                    return null
                    // return (
                    //     <TouchableOpacity
                    //         onPress={() => navigator.pop()}
                    //         style={styles.button}>
                    //         <Text style={styles.titleText}>Login</Text>
                    //     </TouchableOpacity>
                    // );
                }
            },
            RightButton(route, navigator, index, navState) {
                return null
                // if (index > 0 && route.rightButton) {
                //     return (
                //         <TouchableOpacity
                //             onPress={() => navigator.pop()}
                //             style={styles.button}>
                //             <Text style={styles.titleText}></Text>
                //         </TouchableOpacity>
                //     );
                // } else {
                //     return null
                // }

            },
            Title(route, navigator, index, navState) {
                return (
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{route.title ? route.title : ' '}</Text>
                    </View>
                );
            }
        };
        return (
            <Navigator.NavigationBar
                style={styles.navigator}
                routeMapper={routeMapper}
            />
        );
    }

    render() {
        let defaultName = 'Main';
        let defaultComponent = Main;
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
                navigationBar={this._renderNavBar()}
                sceneStyle={{paddingTop: (Platform.OS === 'android' ? 66 : 74)}}
            />
        );
    }

};
