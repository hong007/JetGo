/**
 * Created by hongty on 2016/11/15.
 */
import React, {Component}from 'react';
import{
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
export default class LeftMenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <TouchableOpacity style={LeftMenuStyles.menuContainer}>
        <Image
          style={LeftMenuStyles.menuImage}
          source={this.props.imageSource}
        />
        <Text style={LeftMenuStyles.menuText}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
const LeftMenuStyles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 80,
    paddingLeft: 30,
    borderBottomWidth: 1,
    backgroundColor: '#1b1b1b',
  },
  menuImage: {
    // width: 20,
    resizeMode: Image.resizeMode.strech,
    marginLeft: 5,
    // marginTop:3,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
});


