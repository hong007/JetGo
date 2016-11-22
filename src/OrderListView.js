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

// import ListViewItem from './ListViewItem';
import NetUtil from './NetUtil';

export default class OrderListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    let url = "http://jieyan.xyitech.com/order/list?token=MiMxNDc2MjUzOTU4QGppZXlhbi54eWl0ZWNoLmNvbSNiUy9odVhnK1VtUUlsVFNmejdWVXBBa1N0SGM9&page_no=1&page_size=20";
    // let url = "https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json";
    NetUtil.postJson(url, (responseText)=> {
      if (!responseText || responseText == "") {
        alert("加载中，请重新加载！")
      } else {
        // let curdata = responseText;
        // console.log("默认信息是 ",responseText,'  数据类型是',typeof responseText);
        let curdata = JSON.parse(responseText);
        console.log("返回的订单信息是  ", JSON.stringify(curdata.orders), "  数据类型是  ", typeof JSON.stringify(curdata.orders));
        if (curdata.err == '0') {
          this.setState({
            // dataSource: this.state.dataSource.cloneWithRows(JSON.stringify(curdata.orders)),
            dataSource: this.state.dataSource.cloneWithRows(curdata.orders),
            loaded: true,
          });
        } else {
          alert("错误，请重试")
        }
      }
    })
  }

  initOrderItem(data) {
    let curdata = data;
    console.log("初始化的数据是 ", curdata);
    curdata.map(function (item) {
      return <View style={OrderListItem.container}><View style={OrderListItem.title}> <Text
        style={OrderListItem.titleLeft}> 运单编号 {item.id} </Text><Text style={OrderListItem.titleRight}>
        {(item)=>this.orderState(item)} </Text></View><View style={OrderListItem.content}><View
        style={OrderListItem.Left}><Text
        style={OrderListItem.Text}> 杭垓 </Text><Text style={OrderListItem.Text}>11月11日 </Text></View><View
        style={OrderListItem.Image}> <Image source={require('../img/flight.png')}/> </View><View
        style={OrderListItem.Right}> <Text style={OrderListItem.Text}>七管</Text><Text style={OrderListItem.Text}>
        11月11日 </Text></View></View></View>
    })
  }


  openOrderItem() {
    alert("想先上车再买票？那你就只能想了~~~");
  }


  renderLoadingView() {
    return (<View style={{flex: 1, marginTop: (Platform.OS === 'android' ? 66 : 74)}}>
        <Text>Loading data......</Text>
      </View>

    );
  }

  renderOrderList(item) {
    let curitem = item;
    // curitem = JSON.stringify(curitem);
    console.log("初始化的数据是 ", curitem, "数据类型是  ", typeof curitem);
    // curdata.map(function (item) {
    return (
      <TouchableOpacity onPress={()=>this.openOrderItem()}>
        <View style={OrderListItem.container}><View style={OrderListItem.title}><Text
          style={OrderListItem.titleLeft}>运单编号{curitem.id}</Text><Text
          style={OrderListItem.titleRight}>{(curitem)=>this.orderState(curitem)}</Text></View><View
          style={OrderListItem.content}><View style={OrderListItem.Left}><Text style={OrderListItem.Text}>杭垓</Text><Text
          style={OrderListItem.Text}>11月11日</Text></View><View style={OrderListItem.ImageArea}><Image
          style={OrderListItem.Image}
          source={require('../img/flight.png')}/></View><View style={OrderListItem.Right}><Text
          style={OrderListItem.Text}>七管</Text><Text
          style={OrderListItem.Text}>11月11日</Text></View></View></View></TouchableOpacity>
    );


    // })
    // return (
    //   <Text>123</Text>
    //   <View style={styles.container}>
    //     <Image
    //       source={{uri: movie.posters.thumbnail}}
    //       style={styles.thumbnail}
    //     />
    //     <View style={styles.rightContainer}>
    //       <Text style={styles.title}>{movie.title}</Text>
    //       <Text style={styles.year}>{movie.year}</Text>
    //     </View>
    //   </View>
    // );
  }


  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={{flex: 1,}}>
        <View style={{
          height: (Platform.OS === 'android' ? 42 : 50),
          backgroundColor: '#fff',
          flexDeriction: 'row',
          alignItem: 'center',
          paddingTop: 15,
          paddingLeft: 18
        }}>
          <TouchableOpacity
            style={{top: 15, left: 18, position: 'absolute', zIndex: 999999}}

            onPress={() => this.props.navigator.pop()}
          >
            <Image source={require('../img/ic_back.png')}/>
          </TouchableOpacity>
          <Text style={{textAlign: 'center'}}>运单列表</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderOrderList.bind(this)}
          style={OrderListItem.listView}
        />
      </View>
    );
  }
}
const OrderListItem = StyleSheet.create({
  listView: {
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 18,
    paddingRight: 18,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: '#f7f7f7',
  },
  titleLeft: {
    flex: 1,
    color: '#A09F9F',
    fontSize: 13,
  },
  titleRight: {
    flex: 1,
    color: '#A09F9F',
    textAlign: 'right',
    fontSize: 13,
  },
  content: {
    flex: 2,
    flexDirection: 'row',
  },
  Left: {
    flex: 1,
    paddingTop: 10,
    // backgroundColor: "#f01",
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  Right: {
    flex: 1,
    paddingTop: 10,
    // backgroundColor: "#f12",
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: "right"
  },
  ImageArea: {
    flex: 1,
    // backgroundColor: "#0f2",
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: 42,
    height: 42,
  },
  Text: {
    marginBottom: 10,
    // backgroundColor: '#f15',
  }
});