/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, StatusBar, TouchableOpacity, DeviceEventEmitter} from "react-native";
import styles, {screenHeight, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import BaseTitlePage from "../widget/BaseTitlePage";
import * as Constant from "../../style/constant";
import vUserDao from "../../dao/vUserDao";
import {Actions} from "react-native-router-flux";
import Toast from '../../components/common/ToastProxy';

/**
 * 登录
 */
class PersonalSexPage extends BaseTitlePage {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
            gender: "",
        }
    }

    componentDidMount() {
        this.initUserInfo();
    }

    initUserInfo() {
        vUserDao.localUserInfo().then((res) => {
            this.setState({
                userInfo: res,
                gender: res.gender
            });
        })
    }

    _title() {
        return i18n("Sexuality");
    }

    _isRightPress() {
        return true;
    }

    _rightPress() {
        Actions.LoadingModal({text: i18n("Saving"), backExit: false});
        vUserDao.updateInfo({"gender": this.state.gender}).then((res) => {
            this.exitLoading();
            if (res.code === 200) {
                this.state.userInfo.gender = this.state.gender;
                vUserDao.saveLocalUserInfo(this.state.userInfo).then((res) => {
                    DeviceEventEmitter.emit(Constant.CHANGE_PERSONAL);
                    Actions.pop();
                })
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

    _reader() {

        let checkIcon1, checkIcon2;

        if (this.state.gender === "Male") { //男
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
                                      if (this.state.gender !== "Male") {
                                          this.setState({
                                              gender: "Male"
                                          })
                                      }
                                  }}>
                    <View
                        style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                            paddingVertical: 20,
                            paddingLeft: 23,
                            paddingRight: 32,
                            backgroundColor: Constant.white,
                        }]}>
                        <Text style={[{color: "#1E1E1E", fontSize: 18}]}>{i18n("Male")}</Text>

                        <View style={[styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>
                            <Image style={[{height: 18, width: 18,}]}
                                   source={checkIcon1}/>
                        </View>

                    </View>
                </TouchableOpacity>
                <View style={styles.dividerLineF6}/>
                <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                  onPress={() => {
                                      if (this.state.gender !== "Female") {
                                          this.setState({
                                              gender: "Female"
                                          })
                                      }
                                  }}>
                    <View
                        style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                            paddingVertical: 20,
                            paddingLeft: 23,
                            paddingRight: 32,
                            backgroundColor: Constant.white,
                        }]}>
                        <Text style={[{color: "#1E1E1E", fontSize: 18}]}>{i18n("Female")}</Text>

                        <View style={[styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>
                            <Image style={[{height: 18, width: 18,}]}
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
