import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet, Keyboard, DeviceEventEmitter
} from 'react-native'
import moment from "moment";
import {screenWidth} from "../../style";
import Picker from 'react-native-wheel-picker';
import TimeUtils from "../widget/datepicker/TimeUtils";
import BaseTitlePage from "../widget/BaseTitlePage";
import i18n from "../../style/i18n";
import * as Constant from "../../style/constant";
import styles from "../../style";
import vUserDao from "../../dao/vUserDao";
import Toast from "../common/ToastProxy";
import {Actions} from "react-native-router-flux";
import AnalyticsUtil from "../../utils/AnalyticsUtil";

const month_en = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class PersonalBirthdayPage extends BaseTitlePage {

    // 定义默认属性
    static defaultProps = {
        selectedYear: 2,
        selectedMonth: 0,
        selectedDay: 0,
        birthday: "Feb 24 2018",
    }

    // 通过 state 更新
    constructor(props) {
        super(props)

        this.state = {
            year: [],
            month: [],
            day: [],
            selectedYear: 0,
            selectedMonth: 0,
            selectedDay: 0,
            birthday: this.props.birthday,
        }
    }

    componentWillMount() {
        AnalyticsUtil.onPageBegin("PersonalBirthdayPage");
    }


    componentWillUnmount(){
        AnalyticsUtil.onPageEnd("PersonalBirthdayPage");
    }

    _title() {
        return i18n('Date_of_Birth');
    }

    _isRightPress() {
        return true;
    }

    _rightPress() {

        let monthStr = (this.state.selectedMonth + 1);
        if (monthStr < 10)
            monthStr = "0" + monthStr;


        let dayStr = this.state.day[this.state.selectedDay];
        if (dayStr < 10)
            dayStr = "0" + dayStr;

        let birthday = this.state.year[this.state.selectedYear] + "-" + monthStr + "-" + dayStr;

        Actions.LoadingModal({text: i18n("Saving"), backExit: false});

        vUserDao.updateInfo({"birthday": birthday}).then((res) => {
            this.exitLoading();
            if (res.code === 200) {
                vUserDao.localUserInfo().then((data) => {
                    data.birthday = birthday;
                    return vUserDao.saveLocalUserInfo(data)
                }).then((result) => {
                    DeviceEventEmitter.emit(Constant.CHANGE_PERSONAL);
                    Actions.pop();
                });
            } else {
                Toast.show(res.message);
            }
        })
    }

    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    getYear() {
        let result = [];
        let year = moment().get("year");
        for (let i = year - 100; i <= year; i++) {
            result.push(i + "");
        }
        return result;
    }

    getMonth() {
        let result = [];
        for (let i = 0; i < 12; i++) {
            result.push(month_en[i]);
        }
        return result;
    }

    getDay(year, month) {

        let result = [];
        console.log("天数--->" + this.state.year[year] + "   " + this.state.month[month]);
        let dayCount = TimeUtils.getDaysInOneMonth(this.state.year[year], month + 1);
        for (let i = 0; i < dayCount; i++) {
            result.push((i + 1) + "");
        }

        return result;
    }

    componentWillMount() {
        let currYear = moment().get("year");

        let birthday = moment(this.state.birthday, Constant.APP_TYPE === 2 ? Constant.DATE_FORMAT : Constant.EN_DATE_FORMAT);

        this.state.selectedYear = 100 - (currYear - birthday.get("year"));
        this.state.selectedMonth = birthday.get("month");
        this.state.selectedDay = birthday.get("date") - 1;

        console.log("test-->" + this.state.selectedYear + "  " + this.state.selectedMonth + "  " + this.state.selectedDay);
        let year = this.getYear();

        let month = this.getMonth();

        this.state.year = year;
        this.state.month = month;

        let day = this.getDay(this.state.selectedYear, this.state.selectedMonth);

        this.setState({
            day: day
        });

    }

    componentDidMount() {

    }

    updateYear(year) {
        let day = this.getDay(year, this.state.selectedMonth);

        let selDay = this.state.selectedDay;
        if (this.state.selectedDay >= day.length) {
            selDay = day.length - 1;
        }
        console.log("selDay-->" + selDay);
        this.setState({
            selectedYear: year,
            selectedDay: selDay,
            day: day,
        })
    }

    updateMonth(month) {

        let day = this.getDay(this.state.selectedYear, month);

        let selDay = this.state.selectedDay;
        if (this.state.selectedDay >= day.length) {
            selDay = day.length - 1;
        }

        this.setState({
            selectedMonth: month,
            selectedDay: selDay,
            day: day,
        })
    }

    updateDay(day) {
        this.setState({
            selectedDay: day,
        })
    }


    renderPicker(value, i) {

        return <Picker.Item label={value} value={i} key={"money" + value}/>
    }

    _reader() {
        console.log("test-->" + this.state.year.length + "   " + this.state.month.length + "   " + this.state.day.length)
        return (
            <View style={[styles.flexDirectionColumn, {backgroundColor: "#F5F5F5"}]}>

                <View
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 18,
                        paddingLeft: 16,
                        paddingRight: 20,
                        backgroundColor: Constant.white
                    }]}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Date_of_Birth")}</Text>

                    <Text
                        style={[styles.middleTexBlack, {width: 250, textAlign: "right"}]}>
                        {this.state.month[this.state.selectedMonth] + "  " + this.state.day[this.state.selectedDay] + "  " + this.state.year[this.state.selectedYear]}
                    </Text>
                </View>

                <View style={styles.dividerLineF6}/>
                <View style={[styles.flexDirectionRowNotFlex, {paddingVertical: 20}, styles.mainBgColor]}>
                    <Picker style={{width: screenWidth / 3, height: 150}}
                            selectedValue={this.state.selectedMonth}
                            itemStyle={{color: "#586575", fontSize: 24}}
                            itemSpace={33}
                            onValueChange={(index) => this.updateMonth(index)}>
                        {this.state.month.map((key, i) => this.renderPicker(key, i))}
                    </Picker>
                    <Picker style={{width: screenWidth / 3, height: 150}}
                            selectedValue={this.state.selectedDay}
                            itemStyle={{color: "#586575", fontSize: 24}}
                            itemSpace={38}
                            onValueChange={(index) => this.updateDay(index)}>
                        {this.state.day.map((key, i) => this.renderPicker(key, i))}
                    </Picker>
                    <Picker style={{width: screenWidth / 3, height: 150}}
                            selectedValue={this.state.selectedYear}
                            itemStyle={{color: "#586575", fontSize: 24}}
                            itemSpace={38}
                            onValueChange={(index) => this.updateYear(index)}>
                        {this.state.year.map((key, i) => this.renderPicker(key, i))}
                    </Picker>

                </View>
            </View>
        );
    }
}

export default PersonalBirthdayPage;