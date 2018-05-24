import React from 'react';
import { View, Text, Image } from 'react-native';
import {onlyTime} from '../libs/TimeFunctions';
import importImg from '../libs/WeatherImgSelector';

/**
 * Small list components for weather data
 */

const ListItem = (props) => (
    <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 6,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#2a313d'
    }}>
        <Text style={{color: '#f2f2f2' , marginRight: 6}}>{onlyTime(props.time)}</Text>
        <View style={{
            marginLeft: 6,
            
        }}>
            <Image source={importImg(props.weather).file} alt="weather"/>
            <Text style={{color: '#ED4337'}}>{props.temperature}</Text>
            <Text style={{color: '#b5e3ff'}}>{props.windspeed}</Text>
        </View>
    </View>
);

export default ListItem;