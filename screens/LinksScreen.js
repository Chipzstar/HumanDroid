import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ExpoLinksView} from '@expo/samples';
import {MyImageClassifier} from '../components/AppComponents';

export default function LinksScreen() {
    return (
        <ScrollView style={styles.container}>
            <MyImageClassifier/>
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
});
