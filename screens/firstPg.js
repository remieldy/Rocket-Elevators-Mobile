import React from 'react';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { BorderlessButton } from 'react-native-gesture-handler';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert
}
from 'react-native';


export default class FirstPg extends React.Component {
  static navigationOptions = {
    header: null,
  };


  constructor () {
    super ();
    this.state = {
      data: null,
      loaded: true,
      error: null
    }
  }


  fetchURL = 'https://rocketapi.azurewebsites.net/api/'

  getData = (env) => {
    this.setState ({ loaded: false, error: null });
    let url = this.fetchURL + 'elevator';
    let h = new Headers ();
    h.append ( 'Authorization' )
    h.append ( 'X-Client' )
    let req = new Request( url, {
      headers: h,
      method: 'GET'
    })

    
    fetch ( req )
      .then( response => response.json ())
      .then( this.showData )
      .catch( this.badStuff )
  }

  showData = ( data ) => {
    this.setState({ loaded: true, data })
    console.log( data );
  }

      // error message
  badeStuff = ( err ) => {
    this.setState ({ loaded: true, error: err.message })
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { fullname } = params ? params.fullname: String;
    

    return (

      <View style = { styles.container }>
        { !this.state.loaded && ( <Text> LOADING...</Text> )}

        <ScrollView style = { styles.container } contentContainerStyle = { styles.contentContainer }>
          <View style = { styles.welcomeContainer }>
            <Image 
              source = {
                __DEV__
                  ? require( '../assets/images/R2.png' )
                  : require( '../assets/images/R2.png' )
              }

              style = { styles.welcomeImage }
            />
          </View>


          {/* Welcome + name */}
          <Text style = { styles.getName }> Welcome { fullname } </Text>


          {/* Rocket Elevators Motto */}
          <View style = { styles.getStartedContainer }>
            { this._RenderMotto () }


            {/* Elevators List */}    
            <View style = { styles.container }>
            <View style = { styles.container }>
            <Button title = "Elevators"
              onPress = { this.getData } />
            </View>
            <Text style = { styles.getStartedText }> Select an Elevator ID to change status. </Text>
            </View>


            { !this.state.loaded && ( <Text style = { styles.getElevatorList }> LOADING... </Text>)}
            { this.state.error && ( <Text style = { styles.err }>{ this.state.error } </Text>)}
            { this.state.data && this.state.data.length > 0 && (
              this.state.data.map ( elevator => (
                <TouchableOpacity
                  key = { elevator.id } style = { styles.listStyle }
                  onPress = {() => navigate( 'StatusPg', { elevator })}>
                  <Text style = { styles.inac }> Id: { elevator.id } - Status: { elevator.status } </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>


          <View style = { styles.taBarInfoContainer }>
        <Button title = "SING OUT"
          onPress = {() => navigate('Login')} />
          </View>
        </View>
    );
  }


  _RenderMotto () {
    if (__DEV__) {
      const OurWebsiteLink = (
        <Text onPress = { this._handleOurWebsite } style = { styles.helpLinkText }>
          Our Website
        </Text>
      );

      return (

        <Text style = { styles.developmentModeText }>
          { OurWebsiteLink }
        </Text>
      );
    }
  }


  _handleOurWebsite = () => {
    WebBrowser.openBrowserAsync( 'http://rocketelevatorcompany.ca' );
  };
}


const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#044672',
  },

  buttonContainer: {
    backgroundColor: '#050566',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 20
  },

  styleButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18

  },
  inac: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  err: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },

  getName: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },

  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(112 ,108 ,108 ,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },

  contentContainer: {
    paddingTop: 30,
  },

  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0,
  },

  welcomeImage: {
    width: 200,
    height: 160,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
    marginBottom: -35
  },

  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },

  homeScreenFilename: {
    marginVertical: 7,
  },

  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },

  codeHighlightContainer: {
    backgroundColor: 'rgba(112, 108, 108, 0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },

  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
  },

  getElevatorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'rgba(57, 08, 250, 0.8)',
  },

  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'blue',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },

      android: {
        elevation: 20,
      },
    }),

    alignItems: 'center',
    backgroundColor: '#F90B0B',
    paddingVertical: 20,
  },

  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },

  navigationFilename: {
    marginTop: 5,
  },

  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },

  helpLink: {
    paddingVertical: 15,
  },

  helpLinkText: {
    fontSize: 14,
    color: '#F90B0B',
  },
});