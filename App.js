import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Linking, FlatList, TouchableOpacity, Image } from 'react-native';

class App extends React.Component{

constructor(props)
{
  super(props);
  this.state={
    isLoading: true,
    dataSource: null,
  }
}

// Grabs the data from the website
componentDidMount(){
  return fetch('http://www.recipepuppy.com/api')
    .then ((response) => response.json())
    .then ((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson.results,
      })
    })

    .catch((error) => {
      console.log(error)
    });
}

// Displays how the data will be shown
_renderItem = ({item}) => (
  <TouchableOpacity onPress={() => Linking.openURL(item.href)}>
  <View style={styles.item}></View>
  <Image source={{uri: item.thumbnail}}
  style={{width: 200, height: 200}}/>
  <Text style={styles.content}>{item.title}</Text> 
  </TouchableOpacity>
);

render() {
    if(this.state.isLoading){

      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } 
    else {
      return(
        <View style={styles.container}>
          <Image source={require('./logo.png')}
          style={{width: 200, height: 200}}/>
          <Text style={styles.title}>Welcome to Recipies of the Week</Text>
          <FlatList
          data={this.state.dataSource}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index}
          />
        </View>
      );
    }  
}

}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'tan'
  },

  item: {
    marginTop: 20,
    padding: 5,
    alignItems: 'center',
  },

  title: {
    marginBottom: 5,
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',

  },

  content: {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 15,
    borderWidth: 2,
    padding: 5,
    borderRadius: 25,
    backgroundColor: '#800020',
    color: 'white',
    fontWeight: 'bold'
  }
});
