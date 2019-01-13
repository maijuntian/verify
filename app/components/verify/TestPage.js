import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import moment from "moment";
import {screenWidth} from "../../style";
import Picker from 'react-native-wheel-picker';
import TimeUtils from "../widget/datepicker/TimeUtils";

const month_en = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export class TestPage extends Component {

    // 定义默认属性
    static defaultProps = {
        selectedYear: 2,
        selectedMonth: 0,
        selectedDay: 0
    }

    // 通过 state 更新
    constructor(props) {
        super(props)

        this.state = {
            year: [],
            month: [],
            day: [],
            selectedYear: this.props.selectedYear,
            selectedMonth: this.props.selectedMonth,
            selectedDay: this.props.selectedDay,
            selectedItem : 2,
            itemList: ['刘备', '张飞', '关羽', '赵云', '黄忠', '马超', '魏延', '诸葛亮']
        }
    }
    onPickerSelect (index) {
        this.setState({
            selectedItem: index,
        })
    }

    getYear() {
        let result = [];
        let year = moment().get("year");
        for (let i = year; i > year - 100; i--) {
            result.push(i+"");
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
        console.log("天数--->" + this.state.year[year]+"   " +this.state.month[month]);
        let dayCount = TimeUtils.getDaysInOneMonth(this.state.year[year], month+1);
        for (let i = 0; i < dayCount; i++) {
            result.push((i + 1)+"");
        }

        return result;
    }


    componentWillMount() {

        let year = this.getYear();

        let month = this.getMonth();

        this.state.year = year;
        this.state.month = month;

        let day = this.getDay(this.state.selectedYear, this.state.selectedMonth);

        this.setState({
            day: day
        });

    }

    updateYear(year) {

        let day = this.getDay(year, this.state.selectedMonth);

        let selDay = this.state.selectedDay;
        if (this.state.selectedDay >= day.length) {
            selDay = day.length-1;
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
            selDay = day.length-1;
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

        return <Picker.Item label={value} value={i} key={"money"+value}/>
    }

    render() {
        console.log("test-->" + this.state.year.length + "   " +  this.state.month.length+ "   " +  this.state.day.length)
        return (
            <View style={styles.container}>
                <Text
                    style={styles.text}>{this.state.selectedYear + this.state.selectedMonth + this.state.selectedDay}</Text>
                <View style={styles.pickerViewContainer}>
                    <Picker style={{width: screenWidth/3, height: 90}}
                            selectedValue={this.state.selectedYear}
                            itemStyle={{color:"black", fontSize:24}}
                            onValueChange={(index) => this.updateYear(index)}>
                        {this.state.year.map((key, i) => this.renderPicker(key, i))}
                    </Picker>
                    <Picker style={{width: screenWidth/3, height: 180}}
                            selectedValue={this.state.selectedMonth}
                            itemStyle={{color:"black", fontSize:24}}
                            onValueChange={(index) => this.updateMonth(index)}>
                        {this.state.month.map((key, i) => this.renderPicker(key, i))}
                    </Picker>
                     <Picker style={{width: screenWidth/3, height: 180}}
                            selectedValue={this.state.selectedDay}
                            itemStyle={{color:"black", fontSize:24}}
                            onValueChange={(index) => this.updateDay(index)}>
                        {this.state.day.map((key, i) => this.renderPicker(key, i))}
                    </Picker>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#F5FCFF'
    },
    text: {
        width: 200,
        height: 60,
        marginTop: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    pickerViewContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 30

    },
    pickerItem: {
        flex: 1,
    }
})