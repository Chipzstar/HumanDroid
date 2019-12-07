import React from 'react';
import {Text, View} from 'react-native';

class ResultsScreen extends React.Component {
    static navigationOptions = {title: null};

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>ResultsScreen</Text>
            </View>
        );
    }
}

export default ResultsScreen;
