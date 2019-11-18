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



export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../ProjectX/assets/images/greenBackground.png')}
                style={{width: '100%', height: '100%'}}>
                <TouchableOpacity>
                    <Image
                        style={{width: 250, height: 250}}
                        source={require('../../ProjectX/assets/images/UploadButton.png')}
                    />
                </TouchableOpacity>
            </ImageBackground>
        </View>
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
    }
});
