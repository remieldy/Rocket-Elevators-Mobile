import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { BorderlessButton } from 'react-native-gesture-handler';

export default class StatusPg extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      data: null,
      loaded: true,
      error: null
    }
  }

  // Variables 
  fetchURL = 'https://rocketapi.azurewebsites.net/api/'
  Ok = false;
  // Status = this.props.navigation.state.params.elevator.id;
  putActive = (env) => {
    this.Ok = false;
    const { navigate } = this.props.navigation;
    this.setState({ loaded: false, error: null });
    var url_Moving = this.fetchURL + 'elevator/' + this.props.navigation.state.params.elevator.id + '/Moving';
    var h = new Headers();
    h.append( 'Authorization' )
    h.append( 'X-Client' )
    h.append( 'Content-Type', 'application/json' )
    var reqbody = JSON.stringify({
      "id": this.props.navigation.state.params.elevator.id,
      "status": this.props.navigation.state.params.elevator.status
    });
    var req = new Request(url_Moving, {
      headers: h,
      method: 'PUT',
      body: reqbody,
    })

    fetch( req )
      .then( response => response.json ())
      .then( this.showData )
      .then( Alert.alert ( 'Elevator id: ' + this.props.navigation.state.params.elevator.id + ' has changed status to: Moving'))
      // .then(navigate('Home'))
      .then( this.Ok = true )
      .then( this.setState ({ textColor: 'green' }))
      .catch( this.badStuff )
  }

  showData = ( data ) => {
    this.setState({ loaded: true, data })
    console.log( data );
  }
  badStuff = ( err ) => {
    this.setState({ loaded: true, error: err.message })
  }

  ResetOk = ( env ) => {
    this.Ok = false;
  }
  GoBackToLastPage = ( env ) => {
    this.props.navigation.navigate( 'FirstPg' );
  }
  Combined = ( env ) => {
    this.ResetOk()
    this.GoBackToLastPage()
  }
  render() {
    const { navigate } = this.props.navigation;
    // const { goBack } = this.props.navigation;
 
    return (
      <View style = { styles.container }>
        <ScrollView style = { styles.container } contentContainerStyle = { styles.contentContainer }>
          <View style = { styles.welcomeContainer }>

            {/* Rocket Elevators Logo */}
            <Image
              source = {
                __DEV__
                  ? require( '../assets/images/R2.png' )
                  : require( '../assets/images/R2.png' )

              }
              style = { styles.welcomeImage }
            />
            <Text style = { styles.getElevatorTitle }>Elevators</Text>
            <View style = { styles.getElevatorContainer }>
              {this.Ok == true && (
                <Text style = { styles.getElevatorText }>
                Id: { this.props.navigation.state.params.elevator.id } {"\n"}
                Status: <Text style = { styles.greenText }>Moving</Text>
              </Text>
              )}
              {this.Ok == false && (
              <Text style = { styles.getElevatorText }>
                Id: { this.props.navigation.state.params.elevator.id } {"\n"}
                Status: <Text style={styles.redText}>Offline</Text>

              </Text>
              )}
            </View>
            <View style = { styles.statusButtonsContainer }>
              <Text style = { fontWeight = 'bold' }>Change Status</Text>
              {this.props.navigation.state.params.elevator.status == "Offline" && (
                <View style = { styles.statusBorder }>
                  <Button title = "Moving"
                    onPress = { this.putActive }/>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Button Go Back */}
        <View style = { styles.tabBarInfoContainer }>
          {this.Ok == true && (
            <Button title = "Go Back"
              onPress = {() => this.Combined()} />
          )}
          <Button title = "Sign Out"
            onPress = {() => navigate( 'Login' )} />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  greenText: {
    color: 'green',
  },

    redText: {
      color: 'red',
  },

  statusButtonsContainer: {
    alignItems: 'flex-end',
  },

  statusBorder: {
    marginTop: 20,
    width: 100,
  },

  statusButtons: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 30,
    width: 30,
    textAlign: 'center',
    display: "none",
    fontSize: 16,
  },

  err: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },

  getElevatorList: {
    marginTop: 30,
    marginBottom: 30,
  },

  getName: {
    fontSize: 14,
    textAlign: 'center',
  },

  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
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
  getElevatorContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },

  getElevatorText: {
    fontSize: 20,
    color: 'rgba(96,100,109, 0.8)',
  },

  homeScreenFilename: {
    marginVertical: 7,
  },

  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },

  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
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
    color: 'rgba(96,100,109, 0.8)',
  },

  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },

      android: {
        elevation: 20,
      },
    }),

    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fbfbfb',
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
    color: '#2e78b7',
  },
});