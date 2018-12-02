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

/**
 * 关于
 */
class AboutHistoryPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            dataStr: this.props.responseStr,
            product: {
            },
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData() {
        let dataJson = JSON.parse(this.state.dataStr);
        this.setState({
            product: dataJson
        })
    }

    _title() {
        return I18n("About");
    }


    _reader() {
        return (
            <ScrollView>
                <View style={[styles.mainBox, styles.flexDirectionColumnNotFlex, styles.centerH]}>
                    <Image source={{uri: this.state.product.manufacturerFocusImg}}
                           style={{height: 160, width: screenWidth,}}
                           resizeMode={"cover"}/>

                    <Image
                        source={{uri: this.state.product.manufacturerIcon}}
                        style={[{
                            height: 97,
                            width: 97,
                            backgroundColor: Constant.primaryLightColor,
                            marginVertical: 20
                        }]}
                        resizeMode={"cover"}/>

                    <Text
                        style={[{paddingHorizontal: 20, flexShrink: 1}, styles.subSmallText]}>{this.state.product.manufacturerDesc}</Text>
                </View>
            </ScrollView>

        )
    }
}

export default AboutHistoryPage
