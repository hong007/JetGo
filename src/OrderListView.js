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
  StatusBar,
  ToastAndroid,
  AsyncStorage,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

// import ListViewItem from './ListViewItem';
import NetUtil from './NetUtil';
import Detail from './Detail';
import RealtimeOrder from './RealtimeOrder';
import Main from './Main';

const pageSize = 20;
var pageCount = 0;
var lastPageCount = 0;
var pageNo = 0;
var totalList = [];
var Token;

export default class OrderListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      nonedata: false,
      isLoadingMore: false,
      isRefreshing: false,
      isLoadAll: false,
      hideLoadAll: false,
    };
  }

// 页面render之后请求数据
  componentDidMount() {
    StatusBar.setBackgroundColor('#000', true);
    let _this = this;
    AsyncStorage.getItem("LOGIN_TOKEN", function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        // let Token = result;
        Token = result;
        console.log("取得缓存中的Token是  ", Token, "  ");
        _this.timer=setTimeout(
          ()=>{
            _this._fetchListData(0);
          },500
        );
      }
    });
  }

  _fetchListData(page) {
    // let url = "http://jieyan.xyitech.com/order/list?token=MiMxNDc2MjUzOTU4QGppZXlhbi54eWl0ZWNoLmNvbSNiUy9odVhnK1VtUUlsVFNmejdWVXBBa1N0SGM9&page_no=1&page_size=20";
    // let url = "https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json";
    let curpageNo = page;
    if (curpageNo == '' || !curpageNo) {
      curpageNo = 0;
    }
    console.log("curpageNo is ", curpageNo);
    let url = "http://jieyan.xyitech.com/order/search?&page_no=" + curpageNo + "&page_size=20&token=" + Token;
    NetUtil.postJson(url, (responseText)=> {
      if (!responseText || responseText == "") {
        // alert("加载中，请重新加载！")
      } else {
        // let curdata = responseText;
        // console.log("默认信息是 ",responseText,'  数据类型是',typeof responseText);
        let curdata = JSON.parse(responseText);
        let list = curdata.msg;
        console.log("返回的运单信息是  ", JSON.stringify(list), "  数据类型是  ", typeof JSON.stringify(list), ' 数据长度是  ', list.length);
        if (curdata.err == '0') {
          if (curdata.msg.length == 0) {
            console.log('数据长度是', '', curdata.msg.length);
            this.setState({
              nonedata: true,
            });
          } else {
            for (var i = 0; i < list.length; i++) {
              totalList.push(list[i]);
            }
            pageCount = totalList.length;
            // 判断数据是否全部加载
            if (lastPageCount < pageCount) {
              lastPageCount = pageCount;
              console.log("lastPageCount is ", lastPageCount);
            } else {
              this.setState({
                isLoadAll: true,
              });
              // console.log("数据已经全部加载了哦！请先再去创建运单哦！");
            }
            // console.log("运单总数据是  ", JSON.stringify(totalList), "  数据类型是  ", typeof JSON.stringify(totalList), ' 数据长度是  ', totalList.length);

            // 重新绑定listView数据
            this.setState({
              // dataSource: this.state.dataSource.cloneWithRows(curdata.msg),
              dataSource: this.state.dataSource.cloneWithRows(totalList),
              loaded: true,
              isRefreshing: false,
              isLoadingMore: false,
            });
            // 设置定时器，隐藏底部加载更多文字
            this.timer = setTimeout(()=> {
              this.setState({
                hideLoadAll: true,
              });
            }, 500);
          }

        } else {
          // alert("错误，请重试");
          ToastAndroid.show('错误，请重试', ToastAndroid.SHORT);
        }
      }
    })
  }

  // 页面滑动到底部处罚事件
  toEnd() {
    // 判断当前是否处于刷新或加载状态
    if (this.state.isRefreshing || this.state.isLoadingMore) {
      return
    } else {
      this.loadMoreData();
    }
    if (this.state.isLoadAll) {
      return
    } else {
      this.setState({
        hideLoadAll: false,
      });
    }
  }

// 加载更多数据
  loadMoreData() {
    this.setState({
      isLoadingMore: true,
    });
    pageNo = pageCount / pageSize + 1;
    // console.log("pageNo toEnd() --> ", pageNo);
    this._fetchListData(pageNo + '');
  }

  // loadMoreFooter(){
  //   if (this.state.isRefreshing || this.state.isLoadingMore) {
  //     return null
  //   };
  //   if (!this.state.isLoadAll) {
  //     //还有更多，默认显示‘正在加载更多...’
  //     return <LoadMoreFooter />
  //   }else{
  //     // 加载全部
  //     return <LoadMoreFooter isLoadAll={true}/>
  //   }
  // }

  openOrderItem(value, state) {
    let id = value;
    let curstate = state;
    AsyncStorage.setItem("DETAIL_ID", id);
    if (curstate == 2) {
      this.props.navigator.push({
        title: 'RealtimeOrder',
        component: RealtimeOrder
      });
    } else {
      this.props.navigator.push({
        title: 'Detail',
        component: Detail
      });
    }
    // alert("想先上车再买票？那你就只能想了~~~" + (n));
  }

  _onBack() {
    this.props.navigator.push({
      // title: '',
      name: 'Main',
      component: Main
    });
    // const {navigator} = this.props;
    // if (navigator) {
    //   navigator.pop();
    // }
  }

  // 下拉刷新运单列表
  _onRefresh() {
    // this.setState({isRefreshing: true});
    this.setState({
      isRefreshing: true,
    });
    let _this = this;
    setTimeout(() => {
      totalList = [];
      _this._fetchListData('0');
      console.log('下拉刷新来不来~~~~');
    }, 500);
  }

  renderLoadingView() {
    return (<View style={{flex: 1,}}>
        <View style={{
          height: (Platform.OS === 'android' ? 42 : 50),
          backgroundColor: '#fff',
          flexDeriction: 'row',
          alignItem: 'center',
          marginTop: 24,
          paddingTop: 15,
          paddingLeft: 18
        }}>
          <TouchableOpacity
            style={{top: 15, left: 18, position: 'absolute', zIndex: 999999}}
            onPress={() => this.props.navigator.pop()}
          >
            <Image source={require('../img/ic_back.png')}/>
          </TouchableOpacity>
          <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>我的运单</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
          <Text>{this.state.nonedata ? '没有数据' : '加载数据中......'}</Text>
        </View>
      </View>
    );
  }

// 判断运单状态
  orderState(state) {
    let n = state;
    // alert(n)
    // console.log('运单当前状态是 ', n);
    switch (n) {
      case 0:
        return '未起飞';
        break;
      case 1:
        return '已取消';
        break;
      case 2:
        return '运送中';
        break;
      case 3 || 6 || 9:
        return '异常';
        break;
      case 4:
        return '已送达';
        break;
      case 5:
        return '返航中';
        break;
      case 7:
        return '完成';
        break;
      case 8:
        return '返航中';
        break;
      default:
        return '';
    }
  }

  // 运单时间转换
  setOrderStatusDateTime(item, type) {
    let curstate = item.state;
    if (curstate >= 4 && curstate != 9) {
      if (type == "start") {
        var curTime = item['t2'];
      } else {
        var curTime = item['t' + curstate];
      }
      // console.log('当前时间是 ', curTime, '  运单state是  ', curstate);

      let unixtime = curTime * 1;
      let unixTimestamp = new Date(unixtime * 1000 + 28800000);//东8区时间偏移量为28800000毫秒
      // let commonTime = unixTimestamp.toLocaleString();
      let commonTime = unixTimestamp;
      let nYear = commonTime.getUTCFullYear();
      let nMonth = (commonTime.getUTCMonth() + 1);
      nMonth = nMonth < 10 ? ('0' + nMonth) : nMonth;
      let nDay = commonTime.getUTCDate();
      nDay = nDay < 10 ? ('0' + nDay) : nDay;

      let tDate = nYear + "." + nMonth + "." + nDay;

      let nHour = (commonTime.getUTCHours());
      nHour = nHour < 10 ? ('0' + nHour) : nHour;
      let nMinutes = commonTime.getUTCMinutes();
      nMinutes = nMinutes < 10 ? ('0' + nMinutes) : nMinutes;
      let nSeconds = commonTime.getUTCSeconds();
      nSeconds = nSeconds < 10 ? ('0' + nSeconds) : nSeconds;

      let tTime = nHour + ":" + nMinutes;

      // let newStatusDate = nYear + "/" + nMonth + "/" + nDay + "/" + nHour + ":" + nMinutes + ":" + nSeconds;
      return nMonth + "月" + nDay + "日" + "   (" + nHour + ":" + nMinutes + ")";
    } else if (curstate == 2 || curstate == 3) {
      let curTime = item['t2'];
      // console.log('当前时间是 ', curTime, '  运单state是  ', curstate);

      let unixtime = curTime * 1;
      let unixTimestamp = new Date(unixtime * 1000 + 28800000);//东8区时间偏移量为28800000毫秒
      // let commonTime = unixTimestamp.toLocaleString();
      let commonTime = unixTimestamp;
      let nYear = commonTime.getUTCFullYear();
      let nMonth = (commonTime.getUTCMonth() + 1);
      nMonth = nMonth < 10 ? ('0' + nMonth) : nMonth;
      let nDay = commonTime.getUTCDate();
      nDay = nDay < 10 ? ('0' + nDay) : nDay;

      let tDate = nYear + "." + nMonth + "." + nDay;

      let nHour = (commonTime.getUTCHours());
      nHour = nHour < 10 ? ('0' + nHour) : nHour;
      let nMinutes = commonTime.getUTCMinutes();
      nMinutes = nMinutes < 10 ? ('0' + nMinutes) : nMinutes;
      let nSeconds = commonTime.getUTCSeconds();
      nSeconds = nSeconds < 10 ? ('0' + nSeconds) : nSeconds;
      let tTime = nHour + ":" + nMinutes;
      return nMonth + "月" + nDay + "日" + "   (" + nHour + ":" + nMinutes + ")";
    } else {
      return '';
    }
  }

  // 根据运单状态更换不同图片
  imgSource(state) {
    let n = state;
    if (n == 0) {
      return require('../img/order1.png');
    } else if (n == 2) {
      return require('../img/order2.png');
    }
    else if (n == 4 || n == 7) {
      return require('../img/order3.png');
    } else if (n >= 5 && n != 9 && n != 10) {
      return require('../img/order4.png');
    } else {
      return require('../img/order1.png');
    }
  }

  // Listview初始化
  renderOrderList(item) {
    var imgSource = require('../img/flight.png');
    let curitem = item;
    // curitem = JSON.stringify(curitem);
    // console.log("初始化的数据是 ", curitem, "数据类型是  ", typeof curitem);
    // curdata.map(function (item) {
    return (
      <TouchableOpacity onPress={()=>this.openOrderItem(curitem.id, curitem.state)}>
        <View style={OrderListItem.container}><View style={OrderListItem.title}><Text
          style={curitem.state == 0 || curitem.state == 1 ? OrderListItem.titleLeft1 : OrderListItem.titleLeft2}>运单编号&nbsp;&nbsp;&nbsp;{curitem.id}</Text><Text
          style={curitem.state == 0 || curitem.state == 1 ? OrderListItem.titleRight1 : OrderListItem.titleRight2}>{this.orderState(curitem.state)}</Text></View><View
          style={OrderListItem.content}><View style={OrderListItem.Left}><Text
          style={OrderListItem.Text}>{item.sname}</Text><Text
          style={OrderListItem.Text}>{this.setOrderStatusDateTime(item, 'start')}</Text></View><View
          style={OrderListItem.ImageArea}><Image
          style={OrderListItem.Image}
          source={this.imgSource(curitem.state)}/></View><View style={OrderListItem.Right}><Text
          style={OrderListItem.Text}>{item.ename}</Text><Text
          style={OrderListItem.Text}>{this.setOrderStatusDateTime(item, 'end')}</Text></View></View></View></TouchableOpacity>
    );
  }

  // 是否显示底部文字提示
  showOrHideFooter() {
    if (this.state.hideLoadAll) {
      console.log('加载更多隐藏！');
      return null;
    } else {
      console.log('加载更多显示！');
      return (
        <View style={OrderListItem.footer}>
          <Text style={OrderListItem.footerTitle}>{this.state.isLoadAll ? '已加载全部' : '向下滚动加载更多……'}</Text>
        </View>
      )
    }
  }

  render() {
    if (!this.state.loaded || this.state.nonedata) {
      return this.renderLoadingView();
    }
    return (
      <View style={{flex: 1,}}>
        <View style={{
          height: (Platform.OS === 'android' ? 42 : 50),
          backgroundColor: '#fff',
          flexDeriction: 'row',
          alignItem: 'center',
          marginTop: 24,
          paddingTop: 15,
          paddingLeft: 18
        }}>
          <TouchableOpacity
            style={{top: 15, left: 18, position: 'absolute', zIndex: 999999}}
            onPress={() => this._onBack()}
          >
            <Image source={require('../img/ic_back.png')}/>
          </TouchableOpacity>
          <Text style={{textAlign: 'center', color: '#313131', fontSize: 18,}}>我的运单</Text>
        </View>
        <ListView
          style={OrderListItem.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderOrderList.bind(this)}
          onEndReached={this.toEnd.bind(this)}
          onEndReachedThreshold={20}
          renderFooter={this.showOrHideFooter.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="red"
              colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
              progressBackgroundColor="gray"
            />
          }
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
  titleLeft1: {
    flex: 1,
    color: '#A09F9F',
    fontSize: 12,
  },
  titleRight1: {
    flex: 1,
    color: '#A09F9F',
    textAlign: 'right',
    fontSize: 13,
  },
  titleLeft2: {
    flex: 1,
    color: '#313131',
    fontSize: 12,
  },
  titleRight2: {
    flex: 1,
    color: '#313131',
    textAlign: 'right',
    fontSize: 13,
  },
  content: {
    flex: 2,
    flexDirection: 'row',
  },
  Left: {
    flex: 2,
    paddingTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  Right: {
    flex: 2,
    paddingTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: "right",
  },
  ImageArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: 42,
    height: 42,
  },
  Text: {
    marginBottom: 10,
    fontSize: 15,
    color: '#313131',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  footerTitle: {
    marginLeft: 10,
    fontSize: 15,
    color: 'gray'
  }
});