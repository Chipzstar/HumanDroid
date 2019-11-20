import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {ExpoLinksView} from '@expo/samples';

export default function LinksScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}> This is the Links Screen!</Text>
        </ScrollView>
    );
}

LinksScreen.navigationOptions = {
    title: 'Links',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    }
});
