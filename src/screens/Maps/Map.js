import * as React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { View, StyleSheet, PermissionsAndroid, Modal, Text, Button, Image, AsyncStorage, Dimensions } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Icon} from 'react-native-elements';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {RNCamera} from 'react-native-camera';
import { useFocusEffect } from '@react-navigation/native';
import {LocalizationContext} from '../../translation/LocalizationContext';
import Axios from 'axios';

function requestGeolocaionPermisson() {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(res => {
            if(!res){
                return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
                    {
                        title: 'Grant Access To Current Location',
                        message: 'In order to get you current location we need your authorization to do so.',
                        buttonPositive: 'Accept',
                        buttonNegative: 'Deny'
                    });
            }
        })
        .catch(err => {
            console.warn(err);
        })
}

export default function Map(props, route){
    //const parametro = route.params.parametro;
    const {translations} = React.useContext(LocalizationContext);
    const [currentLocation, setCurrentLocation] = React.useState();
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [picture, setPicture] = React.useState({});
    const [cameraState, setCameraState] = React.useState(false)
    const [showCreatePointModal, setCretePointModal] = React.useState(false);
    const [points, setPoints] = React.useState([]);
    const [selectedPoint, setSelectedPoint] = React.useState();
    const [selectedPointImage, setSelectedPointImage] = React.useState();
    let camera;
    let lastforce;
    const gravity = 9.81;
    const threshold = 2;

    const createMarker = (title, description, lat, long, picture) =>{
        return (<Marker coordinate={{latitude: lat, longitude: long}} onPress={(event) => {
            console.log(event.nativeEvent);
            setCurrentLocation({
                ...event.nativeEvent.coordinate, 
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421});
            setSelectedPoint({
                title: title,
                description: description,
                });
            setSelectedPointImage(`data:image/png;base64,${picture}`);
            return event.nativeEvent;}}
            />);
    };

    const loadPoints = () => {
      Axios.get('http://192.168.1.66:3000/api/submission').then(response =>{ 
        setPoints(response.data.data);
        
    })
      .catch(err => {
          if(err.response.status == 403)
              return false;
      });
    }

    const centerMap = () => {
        Geolocation.getCurrentPosition(info => {
            setCurrentLocation({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            });
        });
    };

    const savePoint = () => {
        if(title !== "" && picture !== ""){
          Axios.post('http://192.168.1.66:3000/api/submission/submit', {assunto: title, lat:currentLocation.latitude , lng:currentLocation.longitude , obs:description,id_user: 1, img:picture.raw, data: new Date()})
          .then(res => {
                if(res){
                    setTitle("");
                    setDescription("");
                    setPicture({});
                    setCretePointModal(false);
                    loadPoints();
                }
            });
        }
        else{
            alert(translations.fillFields);
        }
    }

    const takePicture = () => {
        if(camera){
            camera.takePictureAsync({quality: 0.5, base64:true, width: 200, fixOrientation: true})
                .then(res => {
                    setPicture({uri:`data:image/png;base64,${res.base64}`, raw: res.base64});
                    setCameraState(false);
                })
                .catch(err => {
                    console.warn(err);
                })
        }
    };

    useFocusEffect(React.useCallback(() => {
        requestGeolocaionPermisson();
        centerMap();
        loadPoints();
  }, []));
  
    return (
        <View style={styles.container}>
            <Modal visible={cameraState} onRequestClose={()=> {setCameraState(false)}}>
                    <RNCamera
                        ref={ref => camera = ref}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        captureAudio={false}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        />
                    <View style={styles.cameraControlls}>
                        <Icon
                            containerStyle={{alignSelf: 'center'}}
                            size={32}
                            solid
                            raised
                            name='camera'
                            type='material'
                            color='#00aced' 
                            onPress={() => {takePicture()}}/>
                    </View>
                </Modal>
            <Modal animationType='fade' transparent visible={showCreatePointModal} onRequestClose={()=> {setCretePointModal(false); setTitle(""); setDescription(""); setPicture({})}}>
                <View style={[styles.modelContainer]}>
                    <View style={styles.modelContent}>
                        <Text>{translations.title}</Text>
                        <TextInput onChangeText={(text) => setTitle(text)} value={title}/>
                        <Text>{translations.desc}</Text>
                        <TextInput onChangeText={(text) => setDescription(text)} value={description}/>
                        {picture.uri?(<Image style={styles.picture} source={picture}></Image>) : (<Image style={styles.picture} source={{uri: 'https://cdn.dribbble.com/users/2060373/screenshots/5676655/2.jpg'}}></Image>)}
                        <Button title={translations.takePic} onPress={() => setCameraState(true)}/>
                        <Text></Text>
                        <Button title={translations.save} onPress={savePoint}/>
                    </View>
                </View>
            </Modal>

            <Modal transparent={true} visible={selectedPoint !== undefined} onRequestClose={() => setSelectedPoint(undefined)}>
                <View style={styles.calloutContainer}>
                    <View style={styles.callout}>
                        <View style={{flex:1}}>
                            <Text style={styles.calloutLabel}>{translations.title}</Text>
                            <Text style={styles.calloutText}>{selectedPoint !== undefined ? selectedPoint.title : ""}</Text>
                            <Text style={styles.calloutLabel}>{translations.desc}</Text>
                            <Text style={styles.calloutText}>{selectedPoint !== undefined ? selectedPoint.description : ""}</Text>
                        </View>
                        <View style={{flex:1}}>
                            {selectedPoint !== undefined ? (<Image resizeMode='cover' style={{width: "100%", flex: 1}} source={{uri: selectedPointImage} }/>) : (<></>)}
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.fabContainer}>
                <Icon
                    size={32}
                    solid
                    raised
                    name='location-searching'
                    type='material'
                    color='#00aced'
                    onPress={centerMap} />
                <Icon
                    size={32}
                    solid
                    raised
                    name='add'
                    type='material'
                    color='#00aced' 
                    onPress={() => {setCretePointModal(true)}}/>
            </View>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={currentLocation}
                pitchEnabled={false}
                toolbarEnabled={false}
                rotateEnabled={false}
                loadingEnabled
                showsIndoors={false}
                showsTraffic={false}
                showsMyLocationButton={false}
                showsCompass
                moveOnMarkerPress={false}
                showsUserLocation
                showsPointsOfInterest={false}
                onLongPress={({nativeEvent}) => {
                    setCurrentLocation({...currentLocation, ...nativeEvent.coordinate});
                    setCretePointModal(true);
                }}
            >
              {points.map(e => createMarker(e.assunto, e.obs, e.lat, e.lng, e.img))}

            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    fabContainer: {
        zIndex: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        flex:1,
        padding: 16
    },
    modelContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: "rgba(0,0,0, 0.6)",
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    modelContent: {
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        marginVertical: 50,
        borderRadius: 5,
        padding: 20,
        flex: 1,
    },
    preview: {
        zIndex: 30,
        flex: 1,
        width: '100%'
    },
    cameraControlls: {
        zIndex: 100,
        position: 'absolute',
        bottom: 20,
        flex:1,
        width: '100%',
        alignItems: "center"
    },
    picture: {
        flex: 1,
        aspectRatio: 1.5, 
        resizeMode: 'contain',
        marginBottom: 10,
        alignSelf: 'center'
    },
    callout: {
        backgroundColor: "#FFF",
        width: "100%",
        height: "25%",
        minHeight: "25%",
        position: 'absolute',
        bottom: 0,
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
        flexDirection: 'row'
    },
    calloutText: {
        fontSize: 16
    },
    calloutLabel: {
        fontSize: 20,
        color: "#4287f5",
        fontWeight: 'bold',
    },
    calloutContainer:{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)"
    }
});