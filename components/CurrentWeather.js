import React from 'react';
import { Text, View, Image } from 'react-native';
import importImg from '../libs/WeatherImgSelector';
import {fullDate} from '../libs/TimeFunctions';

/**
 * Display next weather data in a large component
 */

export default class CurrentWeather extends React.Component {

    constructor(props){
        super(props);
    }
    
    render() {
        var time = fullDate(this.props.data.time);

        return(

            <View style={{
            paddingLeft: 60,
            paddingRight: 60,
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 10,
            
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderWidth: 2,
            borderColor: '#2a313d',
            }}>
                <Text style={{fontSize: 18, color: '#f2f2f2'}}>{time}</Text>
                <Image source={importImg(this.props.data.weather).file} style={{width: 100, height: 100}} alt="weather"/>
                <Text style={{fontSize: 18, color: '#ED4337'}}>{this.props.data.temperature}</Text>
                <Text style={{fontSize: 18, color: '#b5e3ff'}}>{this.props.data.windspeed}</Text>
            </View>
        )
    }
}
