import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useState,
    Component,
    ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
    return (
            <LinearGradient
                colors={["#5271ff", "#192f6a"]}
                style={{flex: 1, alignItems: 'center',justifyContent: 'center',  borderRadius: 5}}>
                <TouchableOpacity>
                    <Image
                        style={{width: 250, height: 250, }}
                        source={require('../../ProjectX/assets/images/UploadButton.png')}
                    />
                </TouchableOpacity>
            </LinearGradient>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    image: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    gradient: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 5
    }
});
