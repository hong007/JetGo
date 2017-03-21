import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

// import MapView , { PROVIDER_GOOGLE }from 'react-native-maps';
import MapView from 'react-native-maps';
import flagFlightImg from '../img/assets/flight.png';
import CustomCallout from './CustomCallout';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 30.277974;
const LONGITUDE = 120.006756;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class CustomMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      showCallout: false,
    };
  }

  _markerPress() {
    if (!this.state.showCallout) {
      this.marker1.showCallout();
      this.setState({
        showCallout: true,
      })
    } else {
      this.marker1.hideCallout();
      this.setState({
        showCallout: false,
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.state.provider}
          style={styles.map}
          showsTraffic={false}
          initialRegion={this.state.region}
        >
          <MapView.Marker
            ref={ref=> {
              this.marker1 = ref
            }}
            coordinate={this.state.region}
            image={flagFlightImg}
            onPress={()=> {
              this._markerPress()
            }}
          >
            <MapView.Callout tooltip style={styles.customView}>
              <CustomCallout>
                <Text>捷雁无人机</Text>
              </CustomCallout>
            </MapView.Callout>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

CustomMarkers.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  customView: {
    width: 110,
    height: 60,
  },
});

module.exports = CustomMarkers;
