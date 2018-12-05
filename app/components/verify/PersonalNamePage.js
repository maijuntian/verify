/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, StatusBar, TouchableOpacity, TextInput} from "react-native";
import styles, {screenHeight, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import * as Constant from "../../style/constant";
import Icon from 'react-native-vector-icons/Feather'
import BaseTitlePage from "../widget/BaseTitlePage";

/**
 * 登录
 */
class PersonalNamePage extends BaseTitlePage {

    constructor(props) {
        super(props);
    }

    _title() {
        return i18n("Name");
    }

    _rightPress() {

    }

    _reader() {

        return (
            <View style={[{backgroundColor: "#F5F5F5"}, styles.flexDirectionColumn]}>

                <View style={styles.dividerLineF6}/>

                <View
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 18,
                        paddingLeft: 16,
                        paddingRight: 20,
                        backgroundColor: Constant.white
                    }]}>
                    <Text style={[{color:"#9D9EB1", fontSize:14}]}>{i18n("Name")}</Text>

                        <TextInput
                            style={[styles.middleTexBlackCharter,{width:250, textAlign:"right"}]}
                            underlineColorAndroid='transparent'>
                            Lisa Lewis
                        </TextInput>
                </View>

                <View style={styles.dividerLine}/>

            </View>
        )
    }
}

export default PersonalNamePage
