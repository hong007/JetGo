import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

var THUMB_URLS = [
    require('./img/flight.png'),
    // require('./imgs/dislike.png'),
    // require('./imgs/call.png'),
    // require('./imgs/fist.png'),
    // require('./imgs/bandaged.png'),
    // require('./imgs/flowers.png'),
    // require('./imgs/heart.png'),
    // require('./imgs/liking.png'),
    // require('./imgs/party.png'),
    // require('./imgs/poke.png'),
    // require('./imgs/superlike.png'),
    // require('./imgs/victory.png'),
];
var ListViewDemo = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(['row 1', 'row 2','row 3','row 4','row 5','row 6','row 7','row 8','row 9','row 10','row 11','row 12']),
        };
    },
    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
        var imgSource = THUMB_URLS[rowID];
        return (
            <TouchableOpacity>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={imgSource} />
                        <Text style={{flex:1,fontSize:16,color:'blue'}}>
                            {rowData + '我是测试行号哦~'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    },
    render: function() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
            />
        );
    }
});
var styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 50,
        height: 50,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('JetGo', () => JetGo);
