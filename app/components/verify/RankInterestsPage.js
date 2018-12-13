/**
 * Created by mai on 2017/11/7.
 */

import React, {Component} from 'react';
import {
    View, Image, StatusBar, Platform, Animated, Easing, Text, ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import BaseTitlePage from "../widget/BaseTitlePage";
import i18n from "../../style/i18n";
import {screenWidth} from "../../style";

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
                <Image style={[{width: screenWidth, height: 2.147 * screenWidth}]}
                       resizeMode={"stretch"}
                       source={require("../../img/rank_tip.png")}>
                </Image>
            </ScrollView>
        )
    }
}

export default RankInterestsPage
