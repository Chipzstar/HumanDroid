import React from 'react';
import {Text, View, ActivityIndicator, FlatList, StyleSheet, ScrollView} from 'react-native';
import {ListItem, List, Icon, Right, Left, Content, Container} from "native-base";
import {Storage, API} from "aws-amplify";
import {LinearGradient} from "expo-linear-gradient";
import aws_exports from "../aws-exports";

export default class ResultsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            S3ImageKey: String(this.props.navigation.getParam('S3ImageKey')),
            loading: false,
            file: null,
            access: 'public',
            path: '/pornilarity/classify',
            endpointName: "pornilarity-v1-endpoint",
            predictions: []
        };
    }

    classifier = async () => {
        let path = this.state.path;
        let payload = {
            body: {
                key: this.state.S3ImageKey,
                endpointName: this.state.endpointName,
                endpointRegion: aws_exports.aws_cloud_logic_custom[0].region,
            }, // replace this with attributes you need
            headers: {
                "Content-Type": 'application/json'
            } // OPTIONAL
        };
        let {Predictions} = await API.post(aws_exports.aws_cloud_logic_custom[0].name, path, payload);
        return Predictions;
    };

    componentDidMount() {
        this.showLoading();
        this.classifier(this.state.path)
            .then(response => {
                console.log(response);
                this.setState({predictions: Array.from(response)});
                this.hideLoading();
            }).catch(error => {
            console.log(error);
        });
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
        let results = this.state.predictions;
        const loadingView = (
            <View style={styles.loading}>
                <ActivityIndicator size='large'/>
            </View>
        );
        const resultsView1 = (
            <View style={styles.content}>
                <Text style={styles.header}>Top 5 Results</Text>
                <FlatList
                    keyExtractor={(item) => results.indexOf(item).toString()}
                    data={results}
                    renderItem={({item}) => (
                        <Text style={styles.item}>{item}</Text>
                    )}
                />
            </View>
        );
        const resultsView2 = (
            <View>
                <Text style={styles.header}>Results Screen</Text>
                <List>
                    <FlatList
                        keyExtractor={(item) => results.indexOf(item).toString()}
                        data={results}
                        renderItem={({item}) => (
                            <ListItem>
                                <Left>
                                    <Text style={{color: 'white'}}>{item}</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                        )}
                    />
                </List>
            </View>
        );
        return (
            <LinearGradient
                colors={["#5271ff", "#192f6a"]}
                style={styles.container}>
                {this.state.loading ? loadingView : resultsView1}
            </LinearGradient>
        );
    }

}

ResultsScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: 'column',
        alignItems: 'center'
    },
    item: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 24,
        padding: 30,
        backgroundColor: 'darkgreen',
        color: 'white',
        fontSize: 24,
    },
    content: {
        flex: 1,
        padding: 40
    },
    header: {
        fontSize: 36,
        color: 'white',
        fontWeight: 'bold'
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

