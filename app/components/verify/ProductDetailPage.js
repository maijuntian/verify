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
                <Image source={{uri: "fefefe"}}
                       style={{height: 200, width: screenWidth,}}
                       resizeMode={"cover"}/>

                <View style={[{
                    marginTop: 10,
                    marginLeft: 20,
                    marginRight: 12,
                }, styles.flexDirectionRowNotFlex, styles.justifyEnd, styles.alignItemsEnd]}>
                    <Text style={[{}, styles.normalTextBlack_Charter, styles.flex]}>Lafite red wine 1982
                        authentic</Text>
                    <View style={[{
                        borderRadius: 20,
                        width: 56,
                        height: 20,
                        marginBottom:8,
                        backgroundColor: "#404040"
                    }, styles.flexDirectionRowNotFlex, styles.centered]}>
                        <Text style={[styles.smallTextWhite]}>5%</Text>
                        <Text style={[{marginTop: 3}, styles.minTextWhite]}> off</Text>
                    </View>
                </View>

                <View style={[{
                    marginLeft: 20,
                    marginRight: 12,
                }, styles.flexDirectionRowNotFlex, styles.justifyEnd, styles.alignItemsEnd]}>
                    <Text style={[{}, styles.normalTextBlack_Charter, styles.flex]}>Lafite red wine 1982
                        authentic</Text>

                    <Image source={require("../../img/icon_star_n.png")}
                           style={{height: 200, width: screenWidth,}}
                           resizeMode={"cover"}/>
                </View>

            </View>
        )
    }
}

export default ProductDetailPage
