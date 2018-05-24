import React from 'react';
import { ActivityIndicator, Text, View, PermissionsAndroid, BackHandler } from 'react-native';

import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import {buildDataFromObject, parseXmlData, getLocationComponent} from '../libs/DataFunctions';
import config from '../config.json';

import CurrentWeather from './CurrentWeather';
import ForecastDisplay from './ForecastDisplay';


export default class WeatherDisplay extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            isReversingLoc: true,
            errorMessage: "",
            location: "",
            data: {
                timeRange: {},
                weatherData: {}
            }
        }
    }

    /**
     * Get permissions, display gps dialog if neccessary,
     * then begin geolocation listening.
     */
    componentDidMount(){
        this.requestLocationPermission()
        .then((granted) => {
            if(granted) {
                LocationServicesDialogBox.checkLocationServicesIsEnabled({
                    message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/>",
                    ok: "YES",
                    cancel: "NO",
                    enableHighAccuracy: false,
                    showDialog: true, 
                    openLocationServices: true,
                    preventOutSideTouch: true,
                    preventBackClick: false,
                    providerListener: true
                }).then(function(success) {
                    this.watchGeolocation();
                }.bind(this)
                ).catch((error) => {
                    this.setState({
                        errorMessage: "An error occurred :("
                    });
                });
                
                BackHandler.addEventListener('hardwareBackPress', () => {
                    LocationServicesDialogBox.forceCloseDialog();
                });
                
            } else {
                this.setState({
                    errorMessage: "Please grant location permissions"
                });
            }
        });
    }

    componentWillUnmount() {
        LocationServicesDialogBox.stopListener();
        navigator.geolocation.clearWatch(this.watchId);
    }

    watchGeolocation() {
        this.watchId = navigator.geolocation.watchPosition((location) => {
            this.fmiAPICall(location);
            this.googleGeocodeAPICall(location);
        },
        (error) => {
            this.setState({ errorMessage: error.message });
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 1000 },
        );
    }

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                'title': 'Weather App Location Permission',
                'message': 'Weather App needs to know your location so we can display relevant weather info'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
        }
    }

    /**
     * fetches from FMI api with configurations
     * @param {*} location GPS location info 
     */
    fmiAPICall(location) {
        searchTimeParam = new Date();
        searchTimeParam.setHours(searchTimeParam.getHours() + config.ForecastRange);
        
        fetch(config.FMIBASEURL + config.APIKey + config.FMIQUERY + 
            config.FMIQUERYPARTS.time + searchTimeParam.toISOString() +
            config.FMIQUERYPARTS.latlon + location.coords.latitude + "," + location.coords.longitude, {
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': 0
                }
            })
        .then((response) => response.text())
        .then((response) => {
            parseXmlData(response, (err, result) => {
                if(!err) {
                    data = buildDataFromObject(result);
                    this.setState({
                        isLoading: false,
                        data: {
                            timeRange: result.timeRange,
                            weatherData: data.data
                        }
                    });
                } else {
                    this.setState({
                        isLoading: false,
                        errorMessage: 'Parsing failed :('
                    })
                }
            });
        })
        .catch((error) => {
            //console.warn(error.message);
            this.setState({
                isLoading: false,
                errorMessage: 'Loading weather failed :('
            })
        });
    }

    /**
     * Uses google geocode api to reverse location
     * @param {*} location GPS Location info
     */
    googleGeocodeAPICall(location) {
        fetch(config.GOOGLEBASEURL + location.coords.latitude + "," + location.coords.longitude + config.GOOGLEQUERY + config.GOOGLEAPIKEY)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isReversingLoc: false,
                location : getLocationComponent(responseJson)
            });
            
        })
        .catch((error) => {
            //console.warn(error.message);
            this.setState({
                isReversingLoc: false,
                errorMessage: 'An error occurred :('
            })
        });
    }

    render(){
        if(this.state.errorMessage) {
            return(
                <View style={{flex: 1, padding: 60}}>
                    <Text style={{fontSize: 24, color: '#c42525'}}>{this.state.errorMessage}</Text>
                </View>
            )
        }
        if(this.state.isLoading || this.state.isReversingLoc){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return(
            <View style={{flex: 1, paddingTop:10, alignItems: 'center'}}>
                <Text style={{fontSize: 24, color: '#f2f2f2'}}>{this.state.location}</Text>
                <CurrentWeather data={this.state.data.weatherData[0]}/>
                <ForecastDisplay data={this.state.data.weatherData}/>
            </View>
        );
    }
}