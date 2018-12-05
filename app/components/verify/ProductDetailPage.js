/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, StatusBar, TouchableOpacity, ScrollView} from "react-native";
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
        this.state = {
            productStr: this.props.productStr,
            product:{},
        }
    }

    _title() {
        return I18n("Detail")
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData() {
        let dataJson = JSON.parse(this.state.productStr);
        this.setState({
            product: dataJson
        })
    }



    _reader() {
        return (
            <View style={[styles.flexDirectionColumn]}>
                <Image source={{uri: this.state.product.focusImg}}
                       style={{height: 200, width: screenWidth,}}
                       resizeMode={"cover"}/>

                <View style={[{
                    marginTop: 10,
                    marginLeft: 20,
                    marginRight: 12,
                }, styles.flexDirectionRowNotFlex, styles.justifyEnd, styles.alignItemsEnd]}>
                    <Text style={[{}, styles.normalTextBlack_Charter, styles.flex]}>{this.state.product.productName}</Text>
                    <View style={[{
                        borderRadius: 20,
                        width: 56,
                        height: 20,
                        marginBottom: 8,
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

                    <View style={[styles.flexDirectionRow, styles.alignItemsEnd]}>
                        <Text style={[styles.subMinText, {marginBottom: 3,}]}>{I18n("Integral")}：</Text>
                        <Text style={[styles.normalTextBlack]}>{this.state.product.points}</Text>
                        <Text style={[{
                            marginLeft: 3,
                            marginBottom: 3,
                            textDecorationLine: "line-through",
                        }, styles.smallTextGray,]}>20000</Text>
                    </View>

                    <Text style={[{}, styles.subMinText,]}>{I18n("Integral")}</Text>

                    <Image source={require("../../img/gold.png")}
                           style={{height: 14, width: 14, marginLeft: 3}}
                           resizeMode={"cover"}/>
                </View>

                <View style={[{marginTop: 14}, styles.dividerLineF6]}/>

                <View style={[styles.flexDirectionColumn, styles.justifyEnd]}>

                    <ScrollView>
                        <View style={[{paddingVertical: 8, paddingHorizontal: 30}]}>
                            <Text style={styles.minTextsGray}>{this.state.product.productDesc}</Text>
                        </View>
                    </ScrollView>

                    <View style={[styles.dividerLineF6]}/>

                    <View style={[{paddingHorizontal: 36, paddingVertical: 14,},]}>

                        <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                          onPress={() => {

                                          }}>

                            <View style={[{
                                borderWidth: 1,
                                borderRadius: 30,
                                paddingVertical: 10,
                                borderColor: Constant.textGray,
                            }, styles.flexDirectionRowNotFlex, styles.centered]}>
                                <Text style={[styles.smallTextBlack]}>{I18n("Exchange")}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        )
    }
}

export default ProductDetailPage
