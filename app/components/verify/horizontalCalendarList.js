import React, {Component} from 'react';

import {CalendarList} from 'react-native-calendars';
import {View} from 'react-native';
import {fontFamilyCharter} from "../../style";

import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['en'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
                        '2018-12-22': {startingDay: true, selectedColor: '#EFEFEF', textColor: "black"},
                        '2018-12-25': {endingDay: true, selectedColor: '#EFEFEF', textColor: "black"},
                    }}
                    markingType={'period'}
                    theme={{
                        monthTextColor: 'black',
                        textMonthFontFamily: fontFamilyCharter,
                        textDayFontSize: 12,
                        textMonthFontSize: 20,
                        textDayHeaderFontSize: 12,
                        selectedDayTextColor: 'black',
                        dayTextColor: '#9D9EB1',
                        todayTextColor: '#9D9EB1',
                        arrowColor: "black",
                        textSectionTitleColor: 'black',
                    }}
                />
            </View>
        );
    }
}
