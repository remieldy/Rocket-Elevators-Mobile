import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    StatusBar,
    TextInput,
    SafeAreaView,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Button,
    Alert,
} from 'react-native'


export default class LoginScreens extends React.Component {
    static navigationOptions = {
        header: null,
    };



    //method for Login Alert button
    state = { username: '' }
    _onPressButton = async () => {
        let username = this.refs.txtUsername._lastNativeText;
        this.sendRESTRequest( username );
        // this.sendRestUser();  // sending users       
        Alert.alert( 'your' + username )
    }


    //  this is where API is called for users email
   // if is good you enter inside XXXXX if not Enter Good email
    sendRESTRequest = ( username ) => {
        const { navigation } = this.props;
        var request = new XMLHttpRequest();
        request.open( 'GET','https://rocketapi.azurewebsites.net/api/users/' + username, true );
        request.send( null );
        request.onload = function() {
            if ( request.readyState === request.DONE ) {

                if ( request.status === 200 ) {
                    console.log( request.responseText )    

                    if ( request.responseText === "false" )
                        Alert.alert( 'Please Enter Good Email !' )

                    else

                    navigation.navigate( 'FirstPg' )

                    return


                    //  this is where API is called for users
                    // sendRestUser = () => {
                    //     var requestUser = new XMLHttpRequest();
                    //         request.open( 'GET', 'https://rocketapi.azurewebsites.net/api', true);
                    //         request.send( null );
                    //         request.onload = function () {
                    //             if ( requestUser.readyState === requestUser.DONE )
                    //             if ( requestUser.status === 200) {
                    //                 console.log( requestUser.responseText )
                    // }
                    // }
                    //     }
                }
            }
        }
    }


    render() {
        return (
            <SafeAreaView style = { styles.container }>
                <StatusBar BarStyle = "light-content" />
                <KeyboardAvoidingView behavior = 'padding' style = { styles.container }>
                    <TouchableWithoutFeedback style = { styles.container }
                        //  ----------------------- when you click outside keyboard it s dismiss -------------------------
                        onPress = { Keyboard.dismiss }>
                        <View style = { styles.container }>

                            {/*------------------ picture rocket elevator logo  ------------------ */}
                            <View style = { styles.logoContainer }>
                                <Image style = { styles.logo }
                                    source = { require( '../assets/images/R2.png' )}>
                                </Image>
                                <Text style = { styles.title }>Account Information</Text>
                            </View>
                            {/*------------------ picture rocket elevator logo  ------------------ */}


                            {/* ------------------ username and email input  ------------------ 
                        when you are finish typing it s focus to Passeword automatically 
                                hide your information when you tapping */}

                            <View style = { styles.infoContainer }>
                                <TextInput style = { styles.input }
                                    value = { this.state.email }
                                    placeholder = "Enter Email"
                                    placeholderTextColor = 'rgba(10, 10, 255, 0.8)'
                                    keyboardType = 'email-address'
                                    returnKeyType = 'next'
                                    ref = { "txtUsername" }
                                    onChangeText = {( email ) => this.setState({ email })}
                                    autoCorrect = {false}
                                // onSubmitEditing={() => This.refs.txtPassword.focus()}
                                />
                                {/* <TextInput style={styles.input}
                                placeholder="Enter Password" 
                                placeholderTextColor='rgba(10, 10, 255, 0.8)'
                                returnKeyType='go'
                                secureTextEntry={true}
                                autoCorrect={false}
                                ref={"txtPassword"}                                                 
                            /> */}
                                <TouchableOpacity style = { styles.buttonContainer }>
                                    {/* ------------------ username or email input  ------------------ */}


                                    {/* -------------------  button for LOGIN  -------------------------- */}

                                    <Text style = { styles.styleButton } onPress = { this._onPressButton.bind( this )}>                             
                                        LOGIN
                                        </Text>
                                    {/* -------------------  button for LOGIN  -------------------------- */}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>)
    }
}


const styles = StyleSheet.create ({
    //background top in blue
    container: {
        flex: 1,
        backgroundColor: '#044672',
        flexDirection: 'column',
    },

    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    // image of Rocket Elevators
    logo: {
        width: 300,
        height: 100,
    },

    // account information in blue
    title: {
        color: '#398DCD',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },

    // under section info
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
        backgroundColor: '#97121F',
        padding: 20,
    },

    // letter color when you subscrite
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#1C22D1',
        marginBottom: 20,
        paddingHorizontal: 10,
    },

    buttonContainer:{
        backgroundColor: '#050566',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 15,
        marginBottom: 20

    },

    styleButton:{
        color:'white',
        textAlign:'center',
        fontSize:18
    }
})

