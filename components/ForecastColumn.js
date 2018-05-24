import React from 'react';
import { Text, View, FlatList } from 'react-native';
import {onlyDate} from '../libs/TimeFunctions';
import ListItem from './ListItem';

/**
 * List component
 */


export default class ForecastColumn extends React.Component {

    constructor(props){
        super(props);
    }

    renderSeparator = (sectionId, rowId,) => {
        return (
            <View key={`${sectionId}:${rowId}`} style={{
                height: 1,
                backgroundColor: "#2a313d",
            }}
            />
        );
    };

    render() {
        return(
            <View style={{
                flex:1,
                marginLeft: 10,
                marginRight: 10,
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#f2f2f2'}}>{onlyDate(this.props.data[0].time)}</Text>
                <FlatList style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#2a313d'
            }}
                data={this.props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <ListItem {...item}/>}
                ItemSeparatorComponent={(sectionId, rowID) => this.renderSeparator(sectionId, rowID)}
                ListFooterComponent={this.renderSeparator}/>
            </View>
        )
    }
}