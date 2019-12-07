import React from 'react';
import {Text, View, Image} from 'react-native';
import shorthash from 'shorthash';
import * as FileSystem from 'expo-file-system'

class CacheImage extends React.Component {
    static navigationOptions = {title: null};

    constructor(props) {
        super(props);
        this.state = {
            source: null
        };
    }

    componentDidMount = async () => {
        const {uri} = this.props;
        console.log(uri);
        const name = shorthash.unique(uri);
        console.log(name);
        const path = `${FileSystem.cacheDirectory}${name}`;
        const image = await FileSystem.getInfoAsync(path);
        if (image.exists){
            console.log('Image already exists! read image from cache');
            this.setState({
                source: {
                    uri: image.uri,
                }
            });
            return;
        }

        const newImage = await FileSystem.downloadAsync(uri, path);
        console.log('Downloading Image to cache!');
        this.setState({
            source: {
                uri: newImage.uri
            }
        })
    };

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Image style={this.props.style} source={this.state.source}>

            </Image>
        );
    }
}

export default CacheImage;
