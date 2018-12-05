/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, StatusBar, TouchableOpacity} from "react-native";
import styles, {screenHeight, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import BaseTitlePage from "../widget/BaseTitlePage";
import * as Constant from "../../style/constant";

/**
 * 登录
 */
class PersonalSexPage extends BaseTitlePage {

    constructor(props) {
        super(props);

        this.state = {
            sex: 1,
        }
    }

    _title() {
        return i18n("Sexuality");
    }

    _rightPress() {

    }

    _reader() {

        let checkIcon1, checkIcon2;

        if (this.state.sex === 1) { //男
            checkIcon1 = require("../../img/choice1.png");
            checkIcon2 = require("../../img/choice2.png");
        } else { //女
            checkIcon1 = require("../../img/choice2.png");
            checkIcon2 = require("../../img/choice1.png");
        }

        return (
            <View style={[styles.flexDirectionColumn, {backgroundColor: "#F5F5F5"}]}>
                <View style={styles.dividerLineF6}/>

                <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                  onPress={() => {
                                      if(this.state.sex === 0){
                                          this.setState({
                                              sex: 1
                                          })
                                      }

                                  }}>
                    <View
                        style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                            paddingVertical: 20,
                            paddingLeft: 16,
                            paddingRight: 20,
                            backgroundColor: Constant.white,
                        }]}>
                        <Text style={[{color: "#1E1E1E", fontSize: 14}]}>{i18n("Male")}</Text>

                        <View style={[styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>
                            <Image style={[{height: 26, width: 26,}]}
                                   source={checkIcon1}/>
                        </View>

                    </View>
                </TouchableOpacity>
                <View style={styles.dividerLineF6}/>
                <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                  onPress={() => {
                                      if(this.state.sex === 1){
                                          this.setState({
                                              sex: 0
                                          })
                                      }
                                  }}>
                    <View
                        style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                            paddingVertical: 20,
                            paddingLeft: 16,
                            paddingRight: 20,
                            backgroundColor: Constant.white,
                        }]}>
                        <Text style={[{color: "#1E1E1E", fontSize: 14}]}>{i18n("Female")}</Text>

                        <View style={[styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>
                            <Image style={[{height: 26, width: 26,}]}
                                   source={checkIcon2}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.dividerLineF6}/>
            </View>
        )
    }
}

export default PersonalSexPage
