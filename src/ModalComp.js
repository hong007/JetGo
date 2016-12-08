/**
 * Created by hongty on 2016/12/7.
 */
/**
 * Created by hongty on 2016/12/5.
 */
import React, {Component} from 'react';
import{
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
export default class ModalComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadModalVisible: this.props.modalValue
    }
  }

  componentDidMount() {
    // alert(this.props.modalValue)
  }

  setModalVisible(visible) {
    this.setState({isLoadModalVisible: visible});
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.modalValue}
        onRequestClose={() => {
          alert("Modal has been closed.")
        }}
      >
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center'}}>
          <View>
            {/*<Text style={{color:'#313131'}}></Text>*/}
            <Image source={require('../img/loading.gif')} />
          </View>
        </View>
      </Modal>
    )
  }
}
