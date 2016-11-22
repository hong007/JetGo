/**
 * Created by hongty on 2016/11/22.
 */
import React from 'react';
import{
  View,
  Text,
  Image,
  StyleSheet,
  ListView,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import NetUtil from './NetUtil';
export default class ListViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataloaded: false,

      orderdata: null,
    }
  }

  componentDidMount() {
    let url = "http://jieyan.xyitech.com/order/list?token=MiMxNDc2MjUzOTU4QGppZXlhbi54eWl0ZWNoLmNvbSNiUy9odVhnK1VtUUlsVFNmejdWVXBBa1N0SGM9&page_no=1&page_size=20";
    NetUtil.postJson(url, (responseText)=> {
      if (!responseText || responseText == "") {
        alert("加载中，请重新加载！")
      } else {
        // let curdata = responseText;
        let curdata = JSON.parse(responseText);
        console.log("返回的信息是  ", curdata.orders, "  数据类型是  ", typeof curdata.orders,);
        if (curdata.err == '0') {
          this.setState({
            dataloaded: true,
            // orderdata: curdata.orders,
          })
          // this.initOrderItem(curdata);
          // this.pageJump();
        } else {
          alert("错误，请重试")
        }
      }
    })
  }
  orderState(data){
    let curdata=data;
    console.log('判断订单状态 数据是  ', curdata);
    return 123;
  }
  initOrderItem(data) {
    let curdata = data;
    console.log("初始化的数据是 ", curdata);
    curdata.map(function (item) {
      return <View style={OrderListItem.container}> <View style={OrderListItem.title}> <Text
        style={OrderListItem.titleLeft}> 运单编号 {item.id} </Text> <Text style={OrderListItem.titleRightt}>
        {(item)=>this.orderState(item)} </Text> </View> <View style={OrderListItem.content}> <View style={OrderListItem.Left}> <Text
        style={OrderListItem.Text}> 杭垓 </Text> <Text style={OrderListItem.Text}> 11月11日 </Text> </View> <View
        style={OrderListItem.Image}> <Image source={require('../img/flight.png')}/> </View> <View
        style={OrderListItem.Right}> <Text style={OrderListItem.Text}> 七管 </Text> <Text style={OrderListItem.Text}>
        11月11日 </Text> </View> </View> </View>
    })
  }


  render() {
    if (this.state.dataloaded) {
      return (
        <View>
          {/*{this.state.orderdata.map((item)=>this.initOrderItem(item))}*/}
          <View style={OrderListItem.container}>
            <View style={OrderListItem.title}>
              <Text style={OrderListItem.titleLeft}>
                运单编号 sgsdfgdfgdfdsfgd
              </Text>
              <Text style={OrderListItem.titleRightt}>
                未起飞
              </Text>
            </View>
            <View style={OrderListItem.content}>
              <View style={OrderListItem.Left}>
                <Text style={OrderListItem.Text}> 杭垓 </Text>
                <Text style={OrderListItem.Text}> 11月11日 </Text>
              </View>
              <View style={OrderListItem.Image}>
                <Image source={require('../img/flight.png')}/>
              </View>
              <View style={OrderListItem.Right}>
                <Text style={OrderListItem.Text}> 七管 </Text>
                <Text style={OrderListItem.Text}> 11月11日 </Text>
              </View>
            </View>
          </View>
        </View>
      )
    } else {
      return(
        <View>
          <Text>数据加载中</Text>
        </View>
      )
    }

  }
}
const OrderListItem = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  title: {
    flex: 1,
    flexDirection: 'row',
  },
  titleLeft: {
    flex: 1,
    color: '#A09F9F',
  },
  titleRight: {
    flex: 1,
    color: '#A09F9F',
    textAlign: 'right',
  },
  content: {
    flex: 2,
    flexDirection: 'row',
  },
  Left: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#f01",
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  Right: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#f12",
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: "right"
  },
  Image: {
    flex: 1,
    backgroundColor: "#0f2",
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    marginBottom: 10,
    backgroundColor: '#f15'
  }
})