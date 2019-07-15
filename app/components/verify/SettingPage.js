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
    NativeModules,
    DeviceEventEmitter, Platform
} from "react-native";
import styles, {screenHeight, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import * as Constant from "../../style/constant";
import Icon from 'react-native-vector-icons/Feather'
import BaseTitlePage from "../widget/BaseTitlePage";
import vUserDao from "../../dao/vUserDao";
import {Actions} from "react-native-router-flux";
import DeviceInfo from 'react-native-device-info';
import toast from "../common/ToastProxy";
import AnalyticsUtil from "../../utils/AnalyticsUtil";

/**
 * 登录
 */
class SettingPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            versionUrl: "",
            isLogin: props.isLogin
        }
    }

    _title() {
        return i18n("Settings");
    }

    componentWillMount() {
        AnalyticsUtil.onPageBegin("SettingPage");
        vUserDao.getVersionUrl().then((res) => {
            if (res)
                this.setState({
                    versionUrl: res
                });
        })
    }


    componentWillUnmount() {
        AnalyticsUtil.onPageEnd("SettingPage");
    }

    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    _reader() {

        let newView = this.state.versionUrl === "" ? <View/> :
            <Text style={[{color: "#F26262", fontSize: 14},]}>New</Text>;


        let logoutView = this.state.isLogin ? <View style={[styles.flexDirectionColumn, styles.justifyEnd]}>

            <TouchableOpacity
                activeOpacity={Constant.activeOpacity}
                style={[{
                    marginHorizontal: 36,
                    marginBottom: 16,
                    borderColor: "#D7D7D7",
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingVertical: 10,
                }, styles.centered]} onPress={() => {
                Actions.CommonConfirmModal2({
                    text: i18n("logout_tip"),
                    text_ok: i18n("OK"),
                    text_cancel: i18n("Cancel"),
                    backExit: true,
                    confirmFun: () => {
                        vUserDao.clearInfo();
                        Actions.pop();
                        DeviceEventEmitter.emit(Constant.CHANGE_PERSONAL);
                    }
                });

            }}>
                <Text style={[{color: "#F26262", fontSize: 14,}]}>{i18n("Sign_out")}</Text>
            </TouchableOpacity>

        </View> : <View/>;

        return (
            <View style={styles.flexDirectionColumn}>

                {/*<TouchableOpacity
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 25,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {
                    }}>
                    <Text style={[{color: Constant.primaryBlackColor, fontSize: 14}]}>{i18n("Language")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>


                        <Icon
                            style={[{marginLeft: 12}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </TouchableOpacity>

                <View style={styles.dividerLineF6}/>*/}

                <TouchableOpacity
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 25,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {
                        Actions.WebviewPage({url: Constant.API_USER_AGREEMENT, title: i18n("User_Agreement")});
                    }}>
                    <Text style={[{color: Constant.primaryBlackColor, fontSize: 14}]}>{i18n("User_Agreement")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>


                        <Icon
                            style={[{marginLeft: 12}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </TouchableOpacity>

                <View style={styles.dividerLineF6}/>
                <TouchableOpacity
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 25,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {
                        Actions.WebviewPage({url: Constant.API_ABOUT_US, title: i18n("About_Us")});
                    }}>
                    <Text style={[{color: Constant.primaryBlackColor, fontSize: 14}]}>{i18n("About_Us")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>


                        <Icon
                            style={[{marginLeft: 12}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </TouchableOpacity>

                <View style={styles.dividerLineF6}/>
                <TouchableOpacity
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 25,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {
                        if (this.state.versionUrl !== "") {
                            if (Platform.OS === 'ios') {
                                //跳转到APP Stroe
                                NativeModules.upgrade.openAPPStore(Constant.APPLE_ID);
                            } else {
                                NativeModules.upgrade.upgrade(this.state.versionUrl);
                            }
                        } else {
                            toast(i18n("version_tip1"));
                        }
                    }}>
                    <Text style={[{color: Constant.primaryBlackColor, fontSize: 14}]}>{i18n("Version")}    </Text>
                    {newView}
                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <Text style={[{}, styles.middleTexBlack]}>{DeviceInfo.getVersion()}</Text>

                        <Icon
                            style={[{marginLeft: 12}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </TouchableOpacity>

                {logoutView}
            </View>
        )
    }
}

export default SettingPage
