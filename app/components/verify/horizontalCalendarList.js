import React, {Component} from 'react';

import {CalendarList} from 'react-native-calendars';
import {View} from 'react-native';
import {fontFamilyCharter} from "../../style";

import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['en'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    dayNamesShort: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
};

LocaleConfig.defaultLocale = 'en';

export default class HorizontalCalendarList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <CalendarList
                    current={'2018-12-16'}
                    scrollEnabled={false}
                    pagingEnabled={true}
                    horizontal
                    pastScrollRange={0}
                    futureScrollRange={0}
                    monthFormat={"MMM"}
                    markedDates={{
                        '2018-12-22': {select:true, startingDay: true, endingDay: true, color: '#EFEFEF'},
                        '2018-12-25': {select:true, startingDay: true, endingDay: true, color: '#EFEFEF'},
                    }}
                    markingType={'period'}
                    theme={{
                        monthTextColor: 'black',
                        textMonthFontFamily: fontFamilyCharter,
                        textDayFontSize: 12,
                        textMonthFontSize: 20,
                        textDayHeaderFontSize: 12,
                        selectedDayTextColor: 'black',
                    }}
                />
            </View>
        );
    }
}
