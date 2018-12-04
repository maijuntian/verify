/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, StatusBar, TouchableOpacity} from "react-native";
import styles, {screenHeight, screenWidth, statusHeight} from "../../style";
import * as Constant from "../../style/constant";
import CommonIconNameItem from "../common/CommonIconNameItem";
import {Actions} from 'react-native-router-flux';
import I18n from "../../style/i18n";
import BaseTitlePage from "../widget/BaseTitlePage";

/**
 * 详情
 */
class ProductDetailPage extends BaseTitlePage {

    constructor(props) {
        super(props);
    }

    _title() {
        return I18n("Detail")
    }


    _reader() {

        return (
            <View style={[styles.flexDirectionColumn]}>
                <Image source={{uri: ""}}
                       style={{height: 200, width: screenWidth,}}
                       resizeMode={"cover"}/>
            </View>
        )
    }
}

export default ProductDetailPage
