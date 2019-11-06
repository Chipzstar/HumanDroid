import {TFLiteImageRecognition} from 'react-native-tensorflow-lite';
import React, {Component} from "react";
import {Text, View, StyleSheet} from "react-native";
import {Asset} from "expo-asset";

//Assets
import Anna from '../../assets/images/anna.jpg';
import Model from '../../android/app/src/main/assets/model.tflite';
import Labels from '../../android/app/src/main/assets/labels.txt';

class MyImageClassifier extends Component {

    constructor() {
        super();
        this.state = {};

        try {
            // Initialize TensorFlow Lite Image Recognizer
            this.tfLiteImageRecognition = new TFLiteImageRecognition({
                model: Asset.fromModule(Model).downloadAsync(),  // Your tflite model in assets folder.
                labels: Asset.fromModule(Labels).downloadAsync()// Your label file
            })
        } catch (err) {
            alert(err)
        }
    }

    /*init (callback) {
        // do something async and call the callback:
        callback.bind(this)();
    }*/

    componentWillMount() {
        let imagePath = Asset.fromModule(require("../../assets/images/anna.jpg"));
        console.warn(imagePath);
        this.classifyImage().then(console.log("Image Classified!"));
    }

    async classifyImage() {
        try {
            const results = await this.tfLiteImageRecognition.recognize({
                image: Asset.fromModule(Anna).downloadAsync(),  // Your image path.
                inputShape: (50, 50, 1), // the input shape of your model. If none given, it will be default to 224.
            });

            const resultObj = {
                name: "Name: " + results[0].name,
                confidence: "Confidence: " + results[0].confidence,
                inference: "Inference: " + results[0].inference + "ms"
            };
            this.setState(resultObj)

        } catch (err) {
            alert(err)
        }
    }

    componentWillUnmount() {
        this.tfLiteImageRecognition.close() // Must close the classifier when destroying or unmounting component to release object.
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.results}>
                        {this.state.name}
                    </Text>
                    <Text style={styles.results}>
                        {this.state.confidence}
                    </Text>
                    <Text style={styles.results}>
                        {this.state.inference}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    results: {
        fontSize: 22,
        fontFamily: "serif",
        textAlign: 'center'
    }
});

export default MyImageClassifier;
