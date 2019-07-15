/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {ScrollView, Text, View, Image} from "react-native";
import BaseTitlePage from "../widget/BaseTitlePage";
import I18n from "../../style/i18n";
import {screenWidth} from "../../style";
import * as Constant from "../../style/constant";
import styles from "../../style";
import AnalyticsUtil from "../../utils/AnalyticsUtil";

/**
 * 关于
 */
class AboutProductPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            dataStr: this.props.responseStr,
            product: {
            },
        }
    }

    componentWillMount() {
        AnalyticsUtil.onPageBegin("AboutProductPage");
        this.refreshData();
    }


    componentWillUnmount(){
        AnalyticsUtil.onPageEnd("AboutProductPage");
    }

    refreshData() {
        let dataJson = JSON.parse(this.state.dataStr);
        this.setState({
            product: dataJson
        })
    }

    _title() {
        return I18n("Product_Description");
    }


    _reader() {
        return (
            <ScrollView>
                <View style={[styles.mainBox, styles.flexDirectionColumnNotFlex, styles.centerH]}>
                    <Image source={{uri: this.state.product.productIcon}}
                           style={{height: 160, width: screenWidth,}}
                           resizeMode={"contain"}/>

                    <Text
                        style={[{padding: 20, flexShrink: 1}, styles.subSmallText]}>{this.state.product.productDesc}</Text>
                </View>
            </ScrollView>

        )
    }
}

export default AboutProductPage
