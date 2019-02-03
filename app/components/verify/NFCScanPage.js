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
import styles, {screenHeight, screenWidth, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import * as Constant from "../../style/constant";
import Icon from 'react-native-vector-icons/Feather'
import BaseTitlePage from "../widget/BaseTitlePage";
import vUserDao from "../../dao/vUserDao";
import {Actions} from "react-native-router-flux";
import Toast from '../../components/common/ToastProxy';

/**
 * 登录
 */
class NFCScanPage extends BaseTitlePage {

    constructor(props) {
        super(props);

    }

    _title() {
        return i18n("Scan");
    }


    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    _reader() {

        return (
            <View style={[styles.flexDirectionColumn, styles.centerH]}>
                <View style={[styles.flexDirectionRowNotFlex, {marginTop: 82,}]}>
                    <Text style={[{color: "#666666", fontSize: 14}]}>{i18n("scan_tip1")}</Text>
                    <Image style={[{height: 23, width: 36}]}
                           source={require("../../img/nfc_img2.png")}/>
                    <Text style={[{color: "#666666", fontSize: 14}]}>  {i18n("scan_tip2")}</Text>
                </View>

                <Text style={[{color: "#666666", fontSize: 14}]}>  {i18n("scan_tip3")}</Text>

                <Image style={[{
                    height: screenWidth * 0.88 * 1.03869,
                    width: screenWidth * 0.88,
                    marginLeft: screenWidth * 0.12,
                    marginTop: 10
                }]}
                       source={require("../../img/nfc_img1.png")}/>
            </View>
        )
    }
}

export default NFCScanPage
