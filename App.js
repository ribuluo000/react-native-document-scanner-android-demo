/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import CustomCrop from "react-native-perspective-image-cropper";
import DocumentScanner from "react-native-document-scanner";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    let image = 'https://www.baidu.com/img/bd_logo1.png';
    let width = 100;
    let height = 100;
    image = 'file:///storage/emulated/0/0/1.jpg'

    this.state = {
      imageWidth: width,
      imageHeight: height,
      initialImage: image,
      rectangleCoordinates: {
        topLeft: { x: 10, y: 10 },
        topRight: { x: 10, y: 10 },
        bottomRight: { x: 10, y: 10 },
        bottomLeft: { x: 10, y: 10 }
      }
    };

    // Image.getSize(image, (width, height) => {
    //   this.setState({
    //     imageWidth: width,
    //     imageHeight: height,
    //     initialImage: image,
    //     rectangleCoordinates: {
    //       topLeft: { x: 10, y: 10 },
    //       topRight: { x: 10, y: 10 },
    //       bottomRight: { x: 10, y: 10 },
    //       bottomLeft: { x: 10, y: 10 }
    //     }
    //   });
    // });
  }

  updateImage(image, newCoordinates) {
    console.log('image, newCoordinates', image, newCoordinates,'');
    this.setState({
      image,
      rectangleCoordinates: newCoordinates
    });
  }

  crop() {
    this.customCrop.crop(this.state.rectangleCoordinates,this.state.image,(v1,v2)=>{
      console.log(v1,v2,'crop callback')
    });
    this.customCrop.crop((v1,v2)=>{
      console.log(v1,v2,'crop callback2')
    });
  }

  capture() {
    this.scanner.capture();
  }

  onPictureTaken = data => {
    console.log('onPictureTaken', data)
    this.setState({
      image: data.croppedImage,
      initialImage: data.initialImage,
      rectangleCoordinates: data.rectangleCoordinates
    })
  }



  render() {

    return (
      <View>

        <DocumentScanner
        style={{width:300,height:300}}
        ref={ref => (this.scanner = ref)}
          useBase64
          saveInAppDocument={false}
          onPictureTaken={this.onPictureTaken}
          overlayColor="rgba(255,130,0, 0.7)"
          enableTorch={false}
          brightness={0.3}
          saturation={1}
          contrast={1.1}
          quality={0.5}
          onRectangleDetect={({ stableCounter, lastDetectionType }) =>
            this.setState({ stableCounter, lastDetectionType })
          }
          detectionCountBeforeCapture={5}
          detectionRefreshRateInMS={50}
        />
        <Image
        style={{width:100,height:100}}
          source={{ uri: this.state.image}}
          // source={{ uri: `data:image/jpeg;base64,${this.state.image}` }}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={this.capture.bind(this)}>
          <Text>capture IMAGE 11</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View>
        <CustomCrop
          updateImage={this.updateImage.bind(this)}
          rectangleCoordinates={this.state.rectangleCoordinates}
          initialImage={this.state.initialImage}
          height={this.state.imageHeight}
          width={this.state.imageWidth}
          ref={ref => (this.customCrop = ref)}
          overlayColor="rgba(18,190,210, 1)"
          overlayStrokeColor="rgba(20,190,210, 1)"
          handlerColor="rgba(20,150,160, 1)"
          enablePanStrict={false}
        />
        <TouchableOpacity onPress={this.crop.bind(this)}>
          <Text>CROP IMAGE</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
      <CustomCrop ref={ref => (this.customCrop = ref)} />

        <Text style={styles.welcome} onPress={()=>{
          this.customCrop.crop();
          alert('11')
        }}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
