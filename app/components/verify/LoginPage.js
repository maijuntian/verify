/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, StatusBar, TouchableOpacity, TextInput} from "react-native";
import styles, {screenHeight, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import CommonIconText from "../common/CommonIconText";
import * as constant from "../../style/constant";


/**
 * 登录
 */
class LoginPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={[{backdropColor: "#f5f5f5"}, styles.flexDirectionColumn, styles.centerH]}>
                <StatusBar hidden={true}/>
                <Image source={require("../../img/logo2.png")}
                       resizeMode={"stretch"}
                       style={{marginTop: 63, width: 275, height: 54}}/>

                <View style={[{
                    marginTop: 92,
                    marginHorizontal: 25,
                    paddingHorizontal: 13,
                    paddingVertical: 25
                }, styles.shadowCard_login]}>

                    <TextInput style={[{padding: 5}, styles.smallTextGray, styles.flexDirectionColumn,]}
                               placeholder={i18n("Mobile_number")}
                               keyboardType={"numeric"}/>
                    <View style={styles.dividerLine}/>

                    <View style={[{marginTop: 15}, styles.flexDirectionColumn, styles.centerH,]}>
                        <Text style={[{paddingLeft: 5}, styles.middleTextGray]}>{i18n("Code")}</Text>
                        <View style={[styles.flexDirectionColumn, styles.justifyEnd]}>
                            <TextInput style={[{paddingLeft: 10}, styles.smallTextGray, styles.flex,]}
                                       placeholder={i18n("Verification_code")}
                                       keyboardType={"numeric"}/>
                            <View style={[{padding:8, borderColor: constant.textGray, borderWidth: 1, borderRadius: 20}]}>
                                <CommonIconText
                                    iconStyle={[{height:15, width:15}]}
                                    icon={require("../../img/icon_send.jpg")}
                                    text={i18n("send")}/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default LoginPage
