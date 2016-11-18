/**
 * Created by hongty on 2016/11/14.
 */

import React, {Component} from 'react';
import{
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Picker,
    AsyncStorage,
} from 'react-native';
import NetUtil from './NetUtil';
// var airportsData = [
//     {title: '1', v: '1'},
//     {title: '2', v: '2'},
//     {title: '3', v: '3'},
//     {title: '4', v: '4'}
//
// ];
class PickerComponent extends React.Component {
    constructor(props) {
        super(props);
        state = {
            language: '',
            airports_status: false,
            airportsData: [
                {title: '1', v: '1'},
                {title: '2', v: '2'},
                {title: '3', v: '3'},
                {title: '4', v: '4'}

            ],

        };

        // this.airportsData=this.props.airportsData;
    }

    // airportsData=[
    //     {title: '1', v: '1'},
    //     {title: '2', v: '2'},
    //     {title: '3', v: '3'},
    //     {title: '4', v: '4'}
    //
    //     ];

    componentDidMount() {
        AsyncStorage.getItem("AIRPORTS", function (errs, result) {
            //TODO:错误处理
            if (!errs) {
                // let result = result;
                // airPortsData=result;
                // alert("取得的AIRPORTS是" + result);

                state.airportsData= result;
                state.airports_status= true;
                alert("取得的AIRPORTS是sdfdsf" + state.airportsData);
                return state;
                this.componentWillUnmount();
                render();

            }
        });

        // alert("取得的AIRPORTS是" + airportsData);
        // this._loadInitialState().done();
        // let url = "http://jieyan.xyitech.com/config/allroute?token=" + token;
        // let url = "http://jieyan.xyitech.com/spoint/list?token=MiMxNDc2MjUzOTU4QGppZXlhbi54eWl0ZWNoLmNvbSNiUy9odVhnK1VtUUlsVFNmejdWVXBBa1N0SGM9";
        // NetUtil.postJson(url, (responseText)=> {
        //     let curdata = JSON.parse(responseText);
        //     if (curdata.err == '0') {
        //         // this.pageJump();
        //         let airports = JSON.stringify(curdata.msg);
        //         this.setState({
        //             airports_status: true,
        //             airportsData: airports
        //         });
        //         // this.initAirPorts(this.state.airportsData);
        //         // alert(this.state.airportsData);
        //
        //     } else {
        //         alert("获取航路失败请重试");
        //     }
        // });
    }

    // initAirPorts(item) {
    //     alert(item);
    //     // item.map((n)=><Picker.Item label={item.name} value={item.name} key={item.id}/>);
    //     return (item.map((n)=><Picker.Item label={item.name} value={item.name} key={item.id}/>));
    //     {/*return (<Picker.Item label={item.name} value={item.name} key={item.id}/>);*/}
    // }

    // state = {
    //     language: '',
    // };

    chooseAirPorts(value) {
        this.setState({language: value});
        alert(value);
    }

    initPicker(n) {
        return <Picker.Item label={n.title} value={n.v}/>
    }

// {pickerdata.map((title, v) => this.initPicker(title, v))}
// <Picker.Item label="杭垓" value="杭垓"/>
// <Picker.Item label="七管" value="七管"/>

    render() {
        if (state.airports_status) {
            alert(1);

            return (
                <View>
                    <Picker
                        mode={'dropdown'}
                        style={{}}
                        selectedValue={state.language}
                        onValueChange={(value) => this.chooseAirPorts(value)}>
                        {state.airportsData.map((n) => this.initPicker(n))}
                    </Picker>
                </View>
            );
        } else {
            alert(2);
            return (
            <View>
                <Picker
                    mode={'dropdown'}
                    style={{}}
                    selectedValue={state.language}
                    onValueChange={(value) => this.chooseAirPorts(value)}>
                    <Picker.Item label="请选择" value="请选择"/>
                    <Picker.Item label="杭垓" value="杭垓"/>
                    {/*{state.airportsData.map((n) => this.initPicker(n))}*/}

                </Picker>
                {/*<Text>当前选择的是:{this.state.language}</Text>*/}
            </View>
        );
        }

    }
}
export default PickerComponent;