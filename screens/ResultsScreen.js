import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import {Storage} from "aws-amplify";
import {LinearGradient} from "expo-linear-gradient";

export default class ResultsScreen extends React.Component {
    static navigationOptions = {title: null};

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            file: null
        };
    }

    componentDidMount() {
        Storage.configure({
            bucket: 'pornilarity-bucket170933-production',
            level: 'public',
            region: 'eu-west-2',
        });
        fetch('https://k4whgc6v7g.execute-api.eu-west-2.amazonaws.com/production/pornilarity/classify', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'Hello World',
            }),
        }).then((response) => console.log(response))
            .catch((error) => console.error(error));
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentWillUnmount() {

    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

    render() {
        const loadingView = (
            <View style={styles.loading}>
                <ActivityIndicator size='large'/>
            </View>
        );
        const resultsView = (
            <View>
                <Text style={styles.header}>Results Screen</Text>
                <View>

                </View>
            </View>
        );
        return (
            <LinearGradient
                colors={["#5271ff", "#192f6a"]}
                style={styles.container}>
                {this.state.loading ? loadingView : resultsView}
            </LinearGradient>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

