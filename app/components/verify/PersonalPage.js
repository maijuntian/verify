/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, StatusBar, TouchableOpacity, FlatList} from "react-native";
import styles, {screenHeight, statusHeight} from "../../style";
import BaseTitlePage from "../widget/BaseTitlePage";
import i18n from "../../style/i18n";
import * as Constant from "../../style/constant";
import Icon from 'react-native-vector-icons/Feather'

/**
 * 个人资料
 */
class PersonalPage extends BaseTitlePage {

    constructor(props) {
        super(props);
    }

    _title() {
        return i18n("Personal")
    }

    _reader() {

        return (
            <View style={styles.flexDirectionColumn}>

                <TouchableOpacity
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {

                    }}>

                    <Text style={[{color: "#9D9EB1", fontSize: 14}]}>{i18n("Picture")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <Image style={[{height: 40, width: 40}]}
                               source={require("../../img/picture_girl.png")}/>

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
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {

                    }}>
                    <Text style={[{color: "#9D9EB1", fontSize: 14}]}>{i18n("Name")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <Text style={[{}, styles.middleTexBlackCharter]}>Lisa Lewis</Text>

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
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {

                    }}>
                    <Text style={[{color: "#9D9EB1", fontSize: 14}]}>{i18n("Sexuality")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <Text style={[{}, styles.middleTexBlackCharter]}>Female</Text>

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
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {

                    }}>
                    <Text style={[{color: "#9D9EB1", fontSize: 14}]}>{i18n("Birthday")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <Text style={[{}, styles.middleTexBlackCharter]}>2018/10/24</Text>

                        <Icon
                            style={[{marginLeft: 12}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </TouchableOpacity>

                <View style={styles.dividerLineF6}/>

                <View style={[styles.flexDirectionColumn, styles.justifyEnd]}>

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

                    }}>
                        <Text style={[{color: "#F26262", fontSize: 14,}]}>{i18n("Sign_out")}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

export default PersonalPage
