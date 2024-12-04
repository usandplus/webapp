
import React from 'react';
import GoogleMapReact from 'google-map-react';

interface Location {
  description: string;
  lat: number;
  lng: number;
}

interface UNPLocationProps {
  locations: Location[];
}

interface UNPLocationState {
  selectedLocation: Location | null;
}

const Marker = (props: any) => <div {...props}><i className="fa-solid fa-map-pin fa-beat fa-2xl" style={{ color: '#8137ff' }}></i></div>;

class UNPLocation extends React.Component<UNPLocationProps, UNPLocationState> {

  static defaultProps = {
    center: { lat: 25.658622, lng: -100.362934 },
    zoom: 11
  };

  state: UNPLocationState = {
    selectedLocation: null
  };

  onMarkerClick = (location: Location) => {
    this.setState({ selectedLocation: location });
  };

  render() {
    // const { locations } = this.props;
    const _locations = [{
      lat: 25.658622,
      lng: -100.362934,
      description: 'Us&Plus'
    }]

    return (
      <div style={{ height: '50vh', width: '100%' }} >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAYPp97fVO6Ip3rIweZfmLw0ksvtofn_ew" }}
          // defaultCenter={this.props.center}
          defaultZoom={15}
        >
          {_locations.map((location, index) =>
            <Marker
              key={index}
              lat={location.lat}
              lng={location.lng}
              text={location.description}
              onClick={() => this.onMarkerClick(location)}
            />
          )}

          {this.state.selectedLocation &&
            <div style={{ width: 60, height: 60, backgroundColor: "red", position: "absolute", transform: "translate(-50%, -50%)" }}>
              <h2>{this.state.selectedLocation.description}</h2>
            </div>}
        </GoogleMapReact>
      </div >
    );
  }
}

export default UNPLocation;
