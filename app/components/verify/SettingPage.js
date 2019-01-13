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
 * 登录
 */
class SettingPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {}
    }

    _title() {
        return i18n("Settings");
    }

    _reader() {

        return (
            <View style={styles.flexDirectionColumn}>

                <TouchableOpacity
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

                <View style={styles.dividerLineF6}/>

                <TouchableOpacity
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 25,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {
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
                    }}>
                    <Text style={[{color: Constant.primaryBlackColor, fontSize: 14}]}>{i18n("Version")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <Text style={[{}, styles.middleTexBlack]}>1.10</Text>

                        <Icon
                            style={[{marginLeft: 12}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </TouchableOpacity>

            </View>
        )
    }
}

export default SettingPage
