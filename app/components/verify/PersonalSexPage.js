/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, StatusBar, TouchableOpacity} from "react-native";
import styles, {screenHeight, statusHeight} from "../../style";
import i18n from "../../style/i18n";

/**
 * 登录
 */
class PersonalSexPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sex: 1,

    }
    }

    render() {

        let checkIcon1, checkIcon2;

        if(this.state.sex === 1){ //男
            checkIcon1 = require("../../img/check_in1.png");
            checkIcon2 = require("../../img/check_in2.png");
        } else{ //女
            checkIcon1 = require("../../img/check_in2.png");
            checkIcon2 = require("../../img/check_in1.png");
        }

        return (
            <View style={[styles.flexDirectionColumn, {backgroundColor: "#F5F5F5"}]}>
                <View style={styles.dividerLineF6}/>

                <View
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 20
                    }]}>
                    <Text style={[{color: "#9D9EB1", fontSize: 14}]}>{i18n("Male")}</Text>

                    <View style={[styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>
                        <Image style={[{height: 26, width: 26,}]}
                               source={checkIcon1}/>
                    </View>

                </View>
                <View style={styles.dividerLine}/>
                <View
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 20
                    }]}>
                    <Text style={[{color: "#9D9EB1", fontSize: 14}]}>{i18n("Male")}</Text>

                    <View style={[styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>
                        <Image style={[{height: 26, width: 26,}]}
                               source={checkIcon2}/>
                    </View>
                </View>
                <View style={styles.dividerLineF6}/>
            </View>
        )
    }
}

export default PersonalSexPage
