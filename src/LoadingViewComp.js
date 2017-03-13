/**
 * Created by hongty on 2016/12/7.
 */
import React, {Component} from 'react';
import{
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import Spinner from 'react-native-spinkit';

export default class LoadingViewComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadModalVisible: this.props.modalValue,

      // index: 0,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 100,
      color: "#FFFFFF",
      isVisible: true
    }
  }

  setModalVisible(visible) {
    this.setState({isLoadModalVisible: visible});
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    // var type = this.state.types[this.state.index];
    var type = this.props.loadingType;
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.modalValue}
        onRequestClose={() => {
        }}
      >
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center'}}>
          {/*<Image source={require('../img/loading.gif')}/>*/}
          <View style={styles.container}>
            <Spinner style={styles.spinner}
                     isVisible={this.state.isVisible}
                     size={this.state.size}
                     type={type}
                     color={this.state.color}/>
          </View>
        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E98B21',
    width: Dimensions.get('window').width,
  },

  spinner: {
    marginBottom: 50
  },
});
