import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
    useState,
    ImageBackground
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

//assets
import UploadButton from '../assets/images/UploadButton.png'

export default class HomeScreen extends Component {
    handleChoosePhoto = () => {
        const options = {};
        ImagePicker.launchImageLibraryAsync().then(response => {
            console.log("Response: " + response);
        }).catch(err => console.log(err));
    };

    state = {};

    render() {
        return (
            <LinearGradient
                colors={["#5271ff", "#192f6a"]}
                style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5}}>
                <TouchableOpacity
                    onPress={this.handleChoosePhoto}>
                    <Image
                        style={styles.image}
                        source={UploadButton}
                    />
                </TouchableOpacity>
            </LinearGradient>
        );
    }
}

HomeScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 250,
        height: 250
    },
    gradient: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 5
    }
});
