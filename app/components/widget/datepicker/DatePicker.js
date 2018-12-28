
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import PickerView from './PickerView';

import TimeUtils from './TimeUtils';
import BaseComponent from "./BaseComponent";

class DatePicker extends BaseComponent {

    static defaultProps = {
        removeSubviews: false,
        itemTextColor: 0x333333ff,
        itemSelectedColor: 0x1097D5ff,
        onPickerCancel: null,
        onPickerConfirm: null,
        selectedValue: [new Date().getFullYear(), new Date().getMonth() + 1 , new Date().getDate()],
        startYear: 1990,
        endYear: new Date().getFullYear(),

        confirmText: '确定',
        confirmTextSize: 14,
        confirmTextColor: '#333333',

        cancelText: '取消',
        cancelTextSize: 14,
        cancelTextColor: '#333333',

        itemHeight: 40,

        HH: true,
        mm: true,
        ss: false
    }

    constructor(props) {
        super(props);
        this.state = this.getDateList();
    }


    getDateList() {
        console.log(this.props)
        let years = [];
        let months = [];
        let days = [];

        let startYear = this.props.startYear;
        let endYear = this.props.endYear;
        for (let i = 0; i < endYear + 1 - startYear; i++) {
            years.push(i + startYear );
        }

        let selectedYear = years[0];
        if (this.props.selectedValue) {
            selectedYear = this.props.selectedValue[0];
        }
        for (let i = 1; i < 13; i++) {
            months.push(i );
        }

        let selectedMonth = months[0];
        if (this.props.selectedValue) {
            selectedMonth = this.props.selectedValue[1];
        }

        let dayCount = TimeUtils.getDaysInOneMonth(selectedYear, selectedMonth);
        for (let i = 1; i <= dayCount; i++) {
            days.push(i + unit[2]);
        }

        let selectedDay = days[0];
        if (this.props.selectedValue) {
            selectedDay = this.props.selectedValue[2];
        }

        let pickerData = [years, months, days];

        let selectedIndex = [
            years.indexOf(selectedYear) === -1 ? years.length - 1 : years.indexOf(selectedYear),
            months.indexOf(selectedMonth),
            days.indexOf(selectedDay) === -1 ? days.length - 1 : days.indexOf(selectedDay)];
        this.props.selectedValue[0] = years[selectedIndex[0]];
        this.props.selectedValue[1] = months[selectedIndex[1]];
        this.props.selectedValue[2] = days[selectedIndex[2]];
        if (this.props.HH) {
            let hours = [];
            for (let i = 0; i < 24; i++) {
                hours.push((i + 1) );
            }
            pickerData.push(hours);
            if (this.props.selectedValue) {
                selectedIndex.push((this.props.selectedValue[3] ? parseInt(this.props.selectedValue[3]) : new Date().getHours()) - 1);
            } else {
                selectedIndex.push((new Date().getHours() - 1));
            }
            this.props.selectedValue[3] = (selectedIndex[3] + 1) ;
            if (this.props.mm) {
                let minutes = [];
                for (let i = 0; i < 60; i++) {
                    minutes.push((i + 1) );
                }
                pickerData.push(minutes);
                if (this.props.selectedValue) {
                    selectedIndex.push((this.props.selectedValue[4] ? parseInt(this.props.selectedValue[4]) : new Date().getMinutes()) - 1);
                } else {
                    selectedIndex.push((new Date().getMinutes() - 1));
                }
                this.props.selectedValue[4] = (selectedIndex[4] + 1);
                if (this.props.ss) {
                    let seconds = [];
                    for (let i = 0; i < 60; i++) {
                        seconds.push((i + 1));
                    }
                    pickerData.push(seconds);
                    if (this.props.selectedValue) {
                        selectedIndex.push((this.props.selectedValue[5] ? parseInt(this.props.selectedValue[5]) : 1) - 1);
                    } else {
                        selectedIndex.push(1);
                    }
                    this.props.selectedValue[5] = (selectedIndex[5] + 1);
                }
            }
        }


        let data = {
            pickerData: pickerData,
            selectedIndex: selectedIndex,
        };
        return data;
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' }
    }

    renderPicker() {
        return this.state.pickerData.map((item, pickerId) => {
            if (item) {
                return <PickerView
                    key={'picker' + pickerId}
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    list={item}
                    onPickerSelected={(toValue) => {
                        //是否联动的实现位置
                        this.props.selectedValue[pickerId] = toValue;
                        this.setState({ ...this.getDateList() });
                    }}
                    selectedIndex={this.state.selectedIndex[pickerId]}
                    fontSize={this.getSize(14)}
                    itemWidth={this.mScreenWidth / this.state.pickerData.length}
                    itemHeight={this.props.itemHeight} />
            }
        });
    }

    render() {
        return <View
            style={{
                height: this.props.itemHeight * 5 + this.getSize(15) + this.getSize(44), width: this.mScreenWidth,
            }}>
            <View style={{ width: this.mScreenWidth, height: this.props.itemHeight * 5 + this.getSize(15), flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                {this.renderPicker()}
            </View>
        </View>
    }
}

export default DatePicker;