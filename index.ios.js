/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// 'use strict';
// import React, { Component } from 'react';
// import {
//     Image,
//     ListView,
//     TouchableHighlight,
//     StyleSheet,
//     RecyclerViewBackedScrollView,
//     Text,
//     View,
// } from 'react-native';
// var UIExplorerPage = require('UIExplorerPage');
// var ListViewSimpleExample = React.createClass({
//   statics: {
//     title: '<ListView>',
//     description: 'Performant, scrollable list of data.'
//   },
//
//   getInitialState: function() {
//     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     return {
//       dataSource: ds.cloneWithRows(this._genRows({})),
//     };
//   },
//
//   _pressData: ({}: {[key: number]: boolean}),
//
// componentWillMount: function() {
//   this._pressData = {};
// },
//
// render: function() {
//   return (
//       <UIExplorerPage
//           title={this.props.navigator ? null : '<ListView>'}
//           noSpacer={true}
//           noScroll={true}>
//         <ListView
//             dataSource={this.state.dataSource}
//             renderRow={this._renderRow}
//             renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
//             renderSeparator={this._renderSeperator}
//         />
//       </UIExplorerPage>
//   );
// },
//
// _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
//   var rowHash = Math.abs(hashCode(rowData));
//   var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
//   return (
//       <TouchableHighlight onPress={() => {
//         this._pressRow(rowID);
//         highlightRow(sectionID, rowID);
//       }}>
//         <View>
//           <View style={styles.row}>
//             <Image style={styles.thumb} source={imgSource} />
//             <Text style={styles.text}>
//               {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
//             </Text>
//           </View>
//         </View>
//       </TouchableHighlight>
//   );
// },
//
// _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
//   var dataBlob = [];
//   for (var ii = 0; ii < 100; ii++) {
//     var pressedText = pressData[ii] ? ' (pressed)' : '';
//     dataBlob.push('Row ' + ii + pressedText);
//   }
//   return dataBlob;
// },
//
// _pressRow: function(rowID: number) {
//   this._pressData[rowID] = !this._pressData[rowID];
//   this.setState({dataSource: this.state.dataSource.cloneWithRows(
//       this._genRows(this._pressData)
//   )});
// },
//
// _renderSeperator: function(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
//   return (
//       <View
//           key={`${sectionID}-${rowID}`}
//           style={{
//             height: adjacentRowHighlighted ? 4 : 1,
//             backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
//           }}
//       />
//   );
// }
// });
//
// var THUMB_URLS = [
//   require('./img/bg1.jpg'),
//   // require('./Thumbnails/like.png'),
//   // require('./Thumbnails/dislike.png'),
//   // require('./Thumbnails/call.png'),
//   // require('./Thumbnails/fist.png'),
//   // require('./Thumbnails/bandaged.png'),
//   // require('./Thumbnails/flowers.png'),
//   // require('./Thumbnails/heart.png'),
//   // require('./Thumbnails/liking.png'),
//   // require('./Thumbnails/party.png'),
//   // require('./Thumbnails/poke.png'),
//   // require('./Thumbnails/superlike.png'),
//   // require('./Thumbnails/victory.png'),
// ];
// var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';
//
// /* eslint no-bitwise: 0 */
// var hashCode = function(str) {
//   var hash = 15;
//   for (var ii = str.length - 1; ii >= 0; ii--) {
//     hash = ((hash << 5) - hash) + str.charCodeAt(ii);
//   }
//   return hash;
// };
//
// const styles = StyleSheet.create({
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     padding: 10,
//     backgroundColor: '#F6F6F6',
//   },
//   thumb: {
//     width: 64,
//     height: 64,
//   },
//   text: {
//     flex: 1,
//   },
// });
// export default class JetGo extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('JetGo', () => JetGo);
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
} from'react-native';

class DrawerLayoutDemo extends Component {
  render() {
    var navigationView = (
        <View style={{flex: 1, backgroundColor:'blue'}}>
          <Text style={{margin:10,color:'#fff',fontSize: 15, textAlign: 'center'}}>我是导航功能栏标题</Text>
          <TextstyleTextstyle={{marginTop: 10,marginLeft:20,color:'#fff',fontSize: 15, textAlign:'left'}}>1.功能1</Text>
          <TextstyleTextstyle={{marginTop: 10,marginLeft:20,color:'#fff',fontSize: 15, textAlign:'left'}}>2.功能2</Text>
        </View>
    );
    return (
        <DrawerLayoutAndroid
            drawerWidth={150}
            drawerPosition={DrawerLayoutAndroid.positions.left}
            renderNavigationView={() =>navigationView}>
          <View style={{flex: 1, alignItems:'center'}}>
            <TextstyleTextstyle={{margin: 10, fontSize: 15, textAlign: 'right'}}>我是主布局内容</Text>
          </View>
        </DrawerLayoutAndroid>
    );
  }
}
const styles =StyleSheet.create({
});
AppRegistry.registerComponent('JetGo', () => DrawerLayoutDemo);
