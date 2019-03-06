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
import vUserDao from "../../dao/vUserDao";
import Toast from '../common/ToastProxy';

/**
 * 详情
 */
class ProductDetailPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            productStr: this.props.productStr,
            product: {},
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

    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    _reader() {

        let rankIcon;
        switch (this.state.product.needUserGrade) {
            case "Gold":
                rankIcon = require("../../img/gold.png");
                break;
            case "Silver":
                rankIcon = require("../../img/silver.png");
                break;
            case "Copper":
                rankIcon = require("../../img/copper.png");
                break;
            default:
                rankIcon = require("../../img/gold.png");
                break;
        }

        let rebateView = Constant.REBATE === 100 ? <View/> : <View style={[{
            borderRadius: 20,
            width: 56,
            height: 20,
            marginBottom: 8,
            backgroundColor: "#404040"
        }, styles.flexDirectionRowNotFlex, styles.centered]}>
            <Text style={[styles.smallTextWhite]}>{100 - Constant.REBATE}%</Text>
            <Text style={[{marginTop: 3}, styles.minTextWhite]}> off</Text>
        </View>

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
                    <Text
                        style={[{}, styles.normalTextBlack_Charter, styles.flex]}>{this.state.product.productName}</Text>
                    {rebateView}
                </View>

                <View style={[{
                    marginLeft: 20,
                    marginRight: 12,
                }, styles.flexDirectionRowNotFlex, styles.justifyEnd, styles.alignItemsEnd]}>

                    <View style={[styles.flexDirectionRow, styles.alignItemsEnd]}>
                        <Text style={[styles.subMinText, {marginBottom: 3,}]}>{I18n("Integral")}: </Text>
                        <Text
                            style={[styles.normalTextBlack]}>{this.state.product.discount === 0 ? this.state.product.points : this.state.product.discount}</Text>
                        <Text style={[{
                            marginLeft: 5,
                            marginBottom: 2,
                            textDecorationLine: "line-through",
                        }, styles.smallTextGray,]}>{this.state.product.discount === 0 ? "" : this.state.product.points}</Text>
                    </View>

                    <Text style={[{paddingBottom: 3}, styles.subMinText,]}>{I18n("Rank")}: </Text>

                    <Image source={rankIcon}
                           style={{height: 22, width: 22,}}
                           resizeMode={"contain"}/>
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
                                              vUserDao.localUserInfo().then((userInfo) => {
                                                  if (vUserDao.isLogin(userInfo)) {
                                                      if (parseInt(userInfo.points) < parseInt(this.state.product.discount === 0 ? this.state.product.points : this.state.product.discount)) {
                                                          Toast(I18n("exchange_gift_tip"));
                                                          return;
                                                      }

                                                      Actions.LoadingModal({
                                                          text: I18n("Order_confirming"),
                                                          backExit: false
                                                      });

                                                      vUserDao.getDefaultAddress().then((res) => {
                                                          this.exitLoading();
                                                          if (res.code === 200) {
                                                              let addressStr = JSON.stringify(res.data);
                                                              if (addressStr === "null" || addressStr === null) {
                                                                  Actions.OrderAddressEditPage({
                                                                      addressStr: "",
                                                                      productStr: this.state.productStr
                                                                  });
                                                              } else {
                                                                  Actions.OrderConfirmPage({
                                                                      addressStr: addressStr,
                                                                      productStr: this.state.productStr
                                                                  });
                                                              }
                                                          } else {
                                                              Toast(res.message);
                                                          }

                                                      });
                                                  } else {
                                                      Actions.LoginPage();
                                                  }
                                              })

                                          }}>

                            <View style={[{
                                borderWidth: 1,
                                borderRadius: 30,
                                paddingVertical: 10,
                                borderColor: Constant.textGray,
                            }, styles.flexDirectionRowNotFlex, styles.centered]}>
                                <Text style={[{
                                    color: "#586575",
                                    fontSize: Constant.smallTextSize
                                }]}>{I18n("Exchange")}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        )
    }
}

export default ProductDetailPage
