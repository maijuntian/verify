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
    DeviceEventEmitter
} from "react-native";
import styles, {screenHeight, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import * as Constant from "../../style/constant";
import Icon from 'react-native-vector-icons/Feather'
import BaseTitlePage from "../widget/BaseTitlePage";
import vUserDao from "../../dao/vUserDao";
import {Actions} from "react-native-router-flux";
import Toast from '../../components/common/ToastProxy';

/**
 * 签到
 */
class CheckInPage extends BaseTitlePage {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initUserInfo();
    }

    initUserInfo() {
        vUserDao.localUserInfo().then((res) => {
            this.setState({
                userInfo: res,
                nickname: res.nickname
            });
        })
    }

    _title() {
        return i18n("Name");
    }


    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    _reader() {

        return (
            <View style={[styles.flexDirectionColumn]}>


            </View>
        )
    }
}

export default CheckInPage
