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
import AnalyticsUtil from "../../utils/AnalyticsUtil";

LocaleConfig.locales['en'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayNames: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};

LocaleConfig.locales['ch'] = {
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    dayNames: ['日', '一', '二', '三', '四', '五', '六'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
};


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

    componentWillMount(){
        LocaleConfig.defaultLocale = Constant.APP_TYPE === 2?"ch":'en';
        AnalyticsUtil.onPageBegin("CheckInPage");
    }

    componentWillUnmount(){
        AnalyticsUtil.onPageEnd("CheckInPage");
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
                                           vUserDao.checkIn().then((resCheck) => {
                                               if (resCheck.code === 200) {
                                                   vUserDao.userinfo().then(res => {
                                                       this.exitLoading();
                                                       this._getCheckInRecord();
                                                       Toast(i18n("check_in_successful") + "  +" + resCheck.data.points + "  " + i18n("integral"));
                                                       if(res.code === 200){
                                                           DeviceEventEmitter.emit(Constant.CHANGE_PERSONAL);
                                                       }
                                                   });
                                               } else {
                                                   this.exitLoading();
                                                   Toast(resCheck.message);
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
                    calendarHeight={480}
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
                        paddingBottom: 14,
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
