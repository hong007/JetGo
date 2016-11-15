import React, {Component} from 'react';
import  {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
// import Splash from './Splash';
import Navigator from './Navigator';
class Login extends React.Component {
    render(){
        return(
            <Navigator/>
        )
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         name: null,
    //         password: null,
    //     }
    // }
    //
    // _openPage() {
    //     this.props.navigator.push({
    //         component: Splash,
    //         // component: Welcome,
    //         params: {
    //             name: this.state.name,
    //             age: this.state.age,
    //             changeMyAge: (age) => {
    //                 this.setState({age})
    //             }
    //         }
    //     })
    // }
    //
    // render() {
    //     return (
    //         <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
    //             <Text>用户登录</Text>
    //             <Text style={{ alignItems: 'flex-start'}}>用户名</Text>
    //             <TextInput
    //                 value={this.state.name}
    //                 onChangeText={name => this.setState({name})}
    //                 placeholder={'用户名'}
    //                 style={styles.textInput}/>
    //             <Text style={{ alignItems: 'flex-start'}}>密码</Text>
    //             <TextInput
    //                 value={this.state.password}
    //                 onChangeText={password => this.setState({password})}
    //                 placeholder={'密码'}
    //                 style={styles.textInput}/>
    //             <TouchableOpacity onPress={this._openPage.bind(this)}>
    //                 <Text style={{color: '#55ACEE'}}>登录</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }
}
// const styles = StyleSheet.create({
//     textInput: {
//         height: 40, width: 200
//     }
// })

// export default Login;
AppRegistry.registerComponent('JetGo', () => Login);
