import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, SafeAreaView, Alert} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import React, {useState, Component} from 'react';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const key = '@MyApp:key';

export default class App extends Component {
  state = {
    weight: '',
    storedWeight: '',
    height: '',
    storedHeight: '',
    BMI: '',
    storedBMI: '',
  };
  constructor(props) {
    super(props);
    this.state
  }

  onLoad = async () => {
    try {
      const storedHeight = await AsyncStorage.getItem(key);
      const storedBMI = await AsyncStorage.getItem(key);
      this.setState({ storedBMI});
      this.setState({ storedHeight });
    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the data');
    }
  }

  onSave = async () => {
    const { height } = this.state;
    const { BMI } = this.state;

    try {
      await AsyncStorage.setItem(key, height);
      await AsyncStorage.setItem(key, BMI);
      Alert.alert('Saved', 'Successfully saved on device');
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
    }
  }

  onChangeWeight = (weight) => {
    this.setState({ weight });
  }

  onChangeHeight = (height) => {
    this.setState({ height });
  }

  onChangeBMI = (BMI) => {
    this.setState({ BMI });
    this.onSave
  }

  render() {
    this.onLoad
    const {storedWeight, weight} = this.state;
    const {storedHeight, height} = this.state;
    const {storedBMI, BMI} = this.state;
    
    
  return (
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.toolbar}>BMI Calculator</Text>
      <ScrollView style={styles.content}>
      

      <TextInput
      style={styles.input}
      placeholder="Weight in Pounds"
      value={weight}
      onChangeText={this.onChangeWeight}
      />
      <TextInput
      style={styles.input}
      placeholder={"Height in Inches"}
      value={height}
      onChangeText={this.onChangeHeight}
      />
      <Pressable style={styles.button}
        onPress={() => {
            this.onChangeBMI(((weight / (height * height)) * 703).toFixed(1)); this.onSave;
            }}>
            <Text style={{fontSize: 24,
                          color: "white", 
                          textAlign: "center"}}>Compute BMI</Text>
      </Pressable>
      <Text style={{fontSize: 28, textAlign: "center", marginTop: 20}}>Body Mass Index is {BMI}</Text>
      <Text style={{fontSize: 20, marginTop: 80}}>{"Assessing Your BMI " +
                                                   "\n   Underweight: less than 18.5" + 
                                                   "\n   Healthy: 18.5 to 24.9" + 
                                                   "\n   OverWeight: 25.0 to 29.9" + 
                                                   "\n   Obese: 30.0 or higher"}</Text>
    </ScrollView>
    </SafeAreaView>
  )
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    backgroundColor: "#f4511e",
    color: "white",
    textAlign: "center",
    padding: 25,
    fontWeight: "bold",
    fontSize: 28,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  input: {
    textAlign: "left",
    backgroundColor: "#ecf0f1",
    borderRadius: 3,
    height: 40,
    padding: 5,
    fontSize: 24,
    marginBottom: 10,
    flex: 1
  },
  button: {
    backgroundColor: "#34495e",
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
    fontSize: 24,
  }
});
