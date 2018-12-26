/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Keyboard,
    TextInput,
    DeviceEventEmitter, ScrollView
} from "react-native";
import styles, {fontFamilyCharter, screenHeight, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import * as Constant from "../../style/constant";
import Icon from 'react-native-vector-icons/Feather'
import BaseTitlePage from "../widget/BaseTitlePage";
import vUserDao from "../../dao/vUserDao";
import {Actions} from "react-native-router-flux";
import Toast from '../../components/common/ToastProxy';
import {CalendarList, LocaleConfig} from "react-native-calendars";
import formatDate, {isBehind} from "../../utils/timeUtil";
import moment from "moment";

LocaleConfig.locales['en'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};

LocaleConfig.defaultLocale = 'en';

/**
 * 签到
 */
class CheckInPage extends BaseTitlePage {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this._getCheckInRecord();
    }


    _getCheckInRecord() {
        vUserDao.getCheckInRecord().then((res) => {
            if (res.code === 200) {
                console.log(res.data)
                this.setState({data: res.data});
            } else {
                Toast(res.message);
            }
        })
    }

    _title() {
        return i18n("Check_in");
    }

    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    _reader() {

        let markedDates = {};

        let hasToday = false;

        let todayDate = moment().format(Constant.DATE_FORMAT);

        for (var i = 0; i < this.state.data.length; i++) {
            let checkData = this.state.data[i];

            let startingDay = false;
            if (i === 0)
                startingDay = true;
            else {
                startingDay = !isBehind(this.state.data[i - 1].checkInTime, checkData.checkInTime);
            }


            let endingDay = false;
            if (i === this.state.data.length - 1) {
                endingDay = true;
            } else {
                endingDay = !isBehind(checkData.checkInTime, this.state.data[i + 1].checkInTime);
            }

            let date = formatDate(checkData.checkInTime);
            markedDates[formatDate(checkData.checkInTime)] = {
                startingDay: startingDay,
                endingDay: endingDay,
                color: '#EFEFEF',
                textColor: "black",
            }

            if (todayDate === date)
                hasToday = true;
        }

        if (!hasToday) {
            markedDates[todayDate] = {
                startingDay: true,
                endingDay: true,
                color: '#586575',
                textColor: "white",
            }
        }

        return (
            <View style={[styles.flexDirectionColumn]}>
                <CalendarList
                    style={[{marginTop: 10}]}
                    scrollEnabled={false}
                    pagingEnabled={true}
                    horizontal
                    pastScrollRange={0}
                    futureScrollRange={0}
                    monthFormat={"MMM"}
                    markedDates={
                        markedDates
                    }
                    markingType={'period'}
                    theme={{
                        monthTextColor: 'black',
                        textMonthFontFamily: fontFamilyCharter,
                        textDayFontSize: 12,
                        textMonthFontSize: 20,
                        textDayHeaderFontSize: 12,
                        dayTextColor: '#9D9EB1',
                        arrowColor: "black",
                        textSectionTitleColor: 'black',
                    }}
                />

                <View style={[styles.flexDirectionColumn, styles.justifyEnd]}>


                    <View style={[{paddingHorizontal: 36, paddingVertical: 14,},]}>

                        <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                          onPress={() => {
                                              vUserDao.checkIn().then((res) => {
                                                  if (res.code === 200) {

                                                  } else {
                                                      Toast(res.message);
                                                  }
                                              })
                                          }}>

                            <View style={[{
                                borderWidth: 1,
                                borderRadius: 30,
                                paddingVertical: 10,
                                borderColor: Constant.textGray,
                            }, styles.flexDirectionRowNotFlex, styles.centered]}>
                                <Text style={[{
                                    color: "#586575",
                                    fontSize: Constant.smallTextSize
                                }]}>{I18n("Check_in")}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        )
    }
}

export default CheckInPage
