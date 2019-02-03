/**
 * Created by mai on 2017/11/7.
 */

import React, {Component} from 'react';
import {
    View, Image, StatusBar, Platform, Animated, Easing, Text, ScrollView, TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import BaseTitlePage from "../widget/BaseTitlePage";
import i18n from "../../style/i18n";
import {screenWidth} from "../../style";
import styles from "../../style";
import * as Constant from "../../style/constant";
import Icon from 'react-native-vector-icons/Feather'

/**
 * 等级说明
 */
class RankInterestsPage extends BaseTitlePage {

    constructor(props) {
        super(props);
    }


    _title() {
        return i18n("Rights_and_interests");
    }

    _reader() {
        return (
            <ScrollView>
                <View style={styles.flexDirectionColumnNotFlex}>
                    <Image style={[{width: screenWidth, height: 2.147 * screenWidth}]}
                           resizeMode={"stretch"}
                           source={require("../../img/rank_tip.png")}>
                    </Image>
                    <View style={[{
                        width: screenWidth,
                        height: 10,
                        backgroundColor: "#F6F6F6"
                    }]}/>
                    <TouchableOpacity
                        activeOpacity={Constant.activeOpacity}
                        style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                            paddingVertical: 20,
                            paddingLeft: 16,
                            paddingRight: 10
                        }]}
                        onPress={() => {
                            Actions.WebviewPage({url: Constant.API_USER_AGREEMENT, title: i18n("User_Agreement")});
                        }}>
                        <Text style={[{color: "#00001B", fontSize: 14}]}>{i18n("User_Agreement")}</Text>

                        <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                            <Icon
                                style={[{marginLeft: 5}]}
                                name={"chevron-right"}
                                backgroundColor={Constant.transparentColor}
                                color={Constant.primaryBlackColor} size={15}/>

                        </View>

                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

export default RankInterestsPage
