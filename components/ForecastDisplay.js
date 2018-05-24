import React from 'react';
import { Text, View } from 'react-native';
import ForecastColumn from './ForecastColumn';
import {groupData} from '../libs/DataFunctions';

export default class ForecastDisplay extends React.Component {

    constructor(props){
        super(props);
        this.state = {groups: groupData(this.props.data)};
    }

    render() {
        return(
            <View style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 15,
                marginBottom: 5
            }}>
                {this.state.groups.map((item, i) => <ForecastColumn key={i} data={item}/>)}
            </View>
        )}
}