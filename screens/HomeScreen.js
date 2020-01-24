import React, {Component} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {Constants} from 'react-native-unimodules';
import {Storage} from 'aws-amplify';
import shorthash from 'shorthash';

//components

//assets
import UploadButton from '../assets/images/UploadButton.png'

export default class HomeScreen extends Component {

    state = {
        uri: null,
        name: '',
        access: 'public',
        type: 'image/jpg',
        success: false,
    };

    componentDidMount() {
        this.getPermissionAsync().then(res => console.log('Permission granted!'));
        Storage.configure({
            bucket: 'pornilarity-bucket170933-production',
            level: this.state.access,
            region: 'eu-west-2',
        })
    };

    getPermissionAsync = async () => {
        if (Constants.platform.android) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    storeFileInS3 = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function() {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", this.state.uri, true);
            xhr.send(null);
        });
        if (!this.state.name) {
            this.setState({name: shorthash.unique(this.state.uri).concat(".", blob._data.name.split('.').pop())});
        } else {
            this.setState({name: this.state.name.concat(".", blob._data.name.split('.').pop())});
        }
        console.log(this.state.name);
        console.log(blob._data);
        const options = {
            level: this.state.access,
            contentType: blob._data.type
        };
        console.log(options);
        try {
            const result = await Storage.put(this.state.name, blob, options);
            console.log("IMAGE UPLOADED TO AWS S3:", result);
            this.setState({success: true});
            this.setState({key: `${this.state.access}/${result.key}`});
            return {
                access: this.state.access,
                key: result.key
            };
        } catch (err) {
            throw err;
        }
    };

    selectPicture = async () => {
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        };
        let result = await ImagePicker.launchImageLibraryAsync(options);

        if (!result.cancelled) {
            this.setState({uri: result.uri});
        }
    };

    render() {
        let image = this.state.uri;
        let key = this.state.key;
        const addImageView = (
            <View>
                <TouchableOpacity
                    style={styles.imageBtn}
                    onPress={this.selectPicture}>
                    <Image
                        style={styles.image}
                        source={UploadButton}
                    />
                </TouchableOpacity>
                <Text style={styles.btnText}>Click the button to select your face!</Text>
            </View>
        );
        const confirmImageView = (
            <View>
                <TextInput
                    style={styles.input}
                    placeholder={"Name of your image"}
                    selectionColor={'black'}
                    autoCapitalize={'sentences'}
                    onChangeText={text => this.setState({name: text})}
                    value={this.state.name}
                />
                <Image
                    source={{uri: image}}
                    style={styles.image}
                />
                <TouchableOpacity
                    style={styles.btnNewImage}
                    onPress={this.selectPicture}
                >
                    <Text style={[styles.btnText, {color: 'black'}]}>Choose new image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnConfirm}
                    onPress={this.storeFileInS3}
                >
                    <Text style={styles.btnText}>Confirm!</Text>
                </TouchableOpacity>
            </View>
        );
        const uploadSuccessView = (
            <View>
                <Text style={styles.btnText}>Image Classified!</Text>
                <TouchableOpacity
                    style={styles.btnResult}
                    onPress={() => this.props.navigation.navigate('Results', {S3ImageKey: key})}
                >
                    <Text style={[styles.btnText, {color:'black'}]}>View Your Top 5!</Text>
                </TouchableOpacity>
            </View>
        );

        return (
            <LinearGradient
                colors={["#5271ff", "#192f6a"]}
                style={styles.container}>
                {this.state.success
                    ? uploadSuccessView
                    : (image
                        ? confirmImageView
                        : addImageView
                    )
                }
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
        //flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 20
    },
    btnText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    btnNewImage: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 25,
        padding: 10,
        marginBottom: 15
    },
    btnConfirm: {
        backgroundColor: 'green',
        alignItems: 'center',
        borderRadius: 25,
        padding: 10,
    },
    btnResult: {
        backgroundColor: 'red',
        alignItems: 'center',
        borderRadius: 25,
        padding: 10,
    },
    input: {
        height: 40,
        marginBottom: 20,
        width: 250,
        borderWidth: 0,
        fontSize: 18,
        color: '#c4c7ca',
        textAlign: 'center'
    },
});
