import React, {Component} from 'react';

import {CalendarList} from 'react-native-calendars';
import {View, WebView} from 'react-native';
import * as constant from "../../style/constant";



export default class HorizontalCalendarList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[{
                backgroundColor: constant.white,
                flex: 1
            }]}>
                <WebView source={{uri: 'http://47.107.92.207:9000/source/tracing/10000001/map'}}
                         style={{marginTop: 20}}/>
            </View>
        );
    }
}
