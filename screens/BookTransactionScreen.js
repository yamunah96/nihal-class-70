import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
      scannedStudentId:"",
      scannedBookId:"",
    }
  }

  getCameraPermissions = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
        status === "granted" is false when user has not granted the permission
      */
      hasCameraPermissions: status === "granted",
      buttonState: id,
      scanned: false
    });
  }

  handleBarCodeScanned = async ({ type, data }) => {
    if(buttonState==="BooKID"){
      this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal'
      });
    }
    else if(buttonState=== "StudentId"){
      this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal'
      });

    }
    
  }

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === "clicked" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
          <View>
            <Image source={require("../assets/booklogo.jpg")}
              style={{ width: 200, height: 200 }}>

            </Image>
            </View>


            <View style={styles.inputView}>
              <TextInput
                style={styles.inputBox}
                placeholder={"BooK Id"}>

              </TextInput>
              <TouchableOpacity style={styles.scanbutton}>
                <Text style={styles.buttonText}> Scan </Text>
              </TouchableOpacity>
            </View>

          
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputBox}
                placeholder={"Student Id"}>

              </TextInput>
              <TouchableOpacity style={styles.scanbutton}>
                <Text style={styles.buttonText}> Scan </Text>
              </TouchableOpacity>
            </View>





          <Text style={styles.displayText}>{
            hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permission"
          }</Text>
          <TouchableOpacity
            onPress={this.getCameraPermissions}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText: {
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  scanButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10
  },
  inputView: {
    flexDirection: "row",
    margin: 20
  },
  inputBox: {
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10
  },
  scanbutton: {
    backgroundColor: "blue", width: 50, borderWidth: 1.5, borderLeftWidth: 0
  },
});