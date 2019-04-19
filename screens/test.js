import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity} from 'react-native';

export default class App extends React.Component {
    contructor(){
        super();
        this.state = {
            data: null,
            loaded: true,
            error: null
        }
    }

    baseURL = 'https://rocketapi.azurewebsites.net/api';

    getData = (ev) => {
        this.setState({loaded: false, error: null});
        let url = this.baseURL + 'elevator';
        let h = new Headers();
        h.append('Authorization')
        h.append('X-Client')
        let req = new Request(url, {
            headers: h,
            method: 'GET'

        });
        fetch(req)
        .then(response => response.json())
        .then(this.showData)
        .catch(this.badStuff)
    }
    showData = (data)=>{
        this.setState({loaded: true, data});
        console.log(data);

    }
    badStuff = (err) => {
        this.setState({loaded: true, error: err.message});
    }

    render () {
        return(
            
<ScrollView>
           {!this.state.loaded && (<Text style={styles.selectLoadingStyle}>LOADING...</Text>)}
           <Text style={styles.selectStyle}>Select an elevator</Text>
           <Button title="Get elevators"
             onPress={this.getData} />
             {this.state.error && (
               <Text style={styles.err}>{this.state.error}</Text>
             )}
             {this.state.data && this.state.data.length > 0 && (
               this.state.data.map(elevator => (
                 <TouchableOpacity
                   key={elevator.id} style={styles.listStyle}
                   onPress={() => navigate('Status', {elevator})}>
                   <Text style={styles.elevatorStyle}> Id: {elevator.id} - Status: {elevator.Status} </Text>
                 </TouchableOpacity>
               ))
             )}
         </ScrollView>
        );
    }
}