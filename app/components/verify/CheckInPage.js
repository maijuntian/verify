/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity, DeviceEventEmitter,
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

        let button;
        if (!hasToday) {
            markedDates[todayDate] = {
                startingDay: true,
                endingDay: true,
                color: '#586575',
                textColor: "white",
            }
            button = <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                       onPress={() => {
                                           Actions.LoadingModal({text: i18n("Checking"), backExit: false});
                                           vUserDao.checkIn().then((res) => {
                                               this.exitLoading();
                                               if (res.code === 200) {
                                                   vUserDao.localUserInfo().then((data) => {
                                                       data.points = parseInt(data.points) + parseInt(res.data.points);
                                                       return vUserDao.saveLocalUserInfo(data)
                                                   }).then((result) => {
                                                       DeviceEventEmitter.emit(Constant.CHANGE_PERSONAL);
                                                       Toast(i18n("check_in_successful") + "  +" + res.data.points + "  " + i18n("integral"));
                                                       this._getCheckInRecord();
                                                   })
                                               } else {
                                                   Toast(res.message);
                                               }
                                           })
                                       }}>

                <View style={[{
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingVertical: 10,
                    borderColor: Constant.textGray,
                }, styles.flexDirectionRowNotFlex, styles.centered]}>
                    <Text style={[{
                        color: "#586575",
                        fontSize: Constant.smallTextSize
                    }]}>{i18n("Check_in")}</Text>
                </View>
            </TouchableOpacity>

        } else {
            button = <View style={[{
                borderWidth: 1,
                borderRadius: 20,
                paddingVertical: 10,
                borderColor: Constant.textGray,
            }, styles.flexDirectionRowNotFlex, styles.centered]}>
                <Text style={[{
                    color: "#586575",
                    fontSize: Constant.smallTextSize
                }]}>{i18n("Check_in")}</Text>
            </View>

        }

        return (
            <View style={[styles.flexDirectionColumn]}>
                <CalendarList
                    scrollEnabled={false}
                    pagingEnabled={true}
                    horizontal
                    pastScrollRange={0}
                    futureScrollRange={0}
                    monthFormat={"MMM"}
                    markedDates={
                        markedDates
                    }
                    calendarHeight={500}
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


                    <View style={[{
                        paddingHorizontal: 36,
                        paddingVertical: 14,
                        opacity: hasToday ? Constant.activeOpacity : 1
                    },]}>

                        {button}

                    </View>

                </View>

            </View>
        )
    }
}

export default CheckInPage
