/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity, DeviceEventEmitter,
} from "react-native";
import styles, {screenHeight, screenWidth, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import * as Constant from "../../style/constant";
import Icon from 'react-native-vector-icons/Feather'
import BaseTitlePage from "../widget/BaseTitlePage";
import {Actions} from "react-native-router-flux";
import vUserDao from "../../dao/vUserDao";
import Toast from "../common/ToastProxy";

/**
 * 登录
 */
class OrderConfirmPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            addressStr: this.props.addressStr,
            productStr: this.props.productStr,
            product: {},
            address: {},
        }
    }

    componentDidMount() {
        this.initData();
        this.subscription = DeviceEventEmitter.addListener(Constant.CHANGE_DEFAULT_ADDRESS, (addressStr) => {
            //接收到详情页发送的通知，刷新数据
            let address = JSON.parse(addressStr);
            this.setState({
                address: address,
            });
        });
    }

    componentWillUnmount() {
        this.subscription.remove();
    };

    initData() {
        let product = JSON.parse(this.state.productStr);
        let address = JSON.parse(this.state.addressStr);
        this.setState({
            product: product,
            address: address,
        })
    }

    _title() {
        return i18n("Order_Confirmation");
    }


    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    exitConfirm() {
        if (Actions.currentScene === 'ConfirmModal') {
            Actions.pop();
        }
    }

    exitSuccess() {
        if (Actions.currentScene === 'SuccessModal') {
            Actions.pop();
        }
    }

    _reader() {

        return (
            <View style={[styles.flexDirectionColumn]}>

                <View style={styles.dividerLineF6}/>

                <TouchableOpacity style={[styles.flexDirectionRowNotFlex, styles.centerH]}
                                  onPress={() => {
                                      Actions.OrderAddressPage();
                                  }}>

                    <View style={[{
                        marginLeft: 16,
                        marginVertical: 16,
                        width: screenWidth - 86
                    }, styles.flexDirectionColumnNotFlex]}>

                        <Text
                            style={[styles.middleTexBlackCharter]}>{this.state.address.address}</Text>
                        <View style={[styles.flexDirectionRowNotFlex, styles.centerH]}>
                            <Text style={[{}, styles.middleTextGrayBlueCharter]}>{this.state.address.contacts}</Text>
                            <Text style={[{marginLeft: 17}, styles.minTextsGray]}>{this.state.address.phone}</Text>
                        </View>

                    </View>
                    <View
                        style={[{marginRight: 16}, styles.flexDirectionColumn, styles.alignItemsEnd, styles.centerV]}>

                        <Icon
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>
                    </View>

                </TouchableOpacity>
                <View style={styles.dividerLineE6}/>

                <Text style={[styles.smallTextBlack, {
                    marginLeft: 16,
                    paddingVertical: 10
                }]}>{i18n("List")}</Text>

                <View style={[{
                    paddingBottom: 27,
                    paddingLeft: 16,
                    paddingRight: 18
                }, styles.flexDirectionRowNotFlex, styles.centerV]}>
                    <Image style={[{height: 85, width: 85}]}
                           source={{uri: this.state.product.icon}}
                           resizeMode={"center"}/>
                    <View
                        style={[{
                            width: screenWidth - 210,
                            marginLeft: 13
                        }, styles.flexDirectionRowNotFlex, styles.centerH]}>

                        <Text
                            style={styles.middleTextBlackCharter}>{this.state.product.productName}</Text>

                    </View>

                    <View style={[{
                        width: 90,
                        paddingRight: 13
                    }, styles.flexDirectionRowNotFlex, styles.justifyEnd, styles.centerH]}>
                        <Text
                            style={[{}, styles.normalTextBlack]}>x1</Text>
                    </View>
                </View>
                <View style={styles.dividerLineE6}/>
                <View style={[styles.flexDirectionColumn, styles.justifyEnd]}>
                    <View style={styles.dividerLineE6}/>
                    <View style={styles.flexDirectionRowNotFlex}>
                        <View style={[{
                            width: screenWidth * 2 / 3,
                            height: 55
                        }, styles.flexDirectionRowNotFlex, styles.centered]}>
                            <Text style={[styles.minTextBlack]}>{i18n("Total")}:</Text>
                            <Text
                                style={[styles.smallTextBlack, {marginHorizontal: 3}]}>{this.state.product.discount}</Text>
                            <Text style={[styles.minTextBlack]}>{i18n("integral")}</Text>
                        </View>

                        <TouchableOpacity style={[{
                            width: screenWidth / 3,
                            height: 55,
                            backgroundColor: "#7DA75F"
                        }, styles.centered]}
                                          activeOpacity={Constant.activeOpacity}
                                          onPress={() => {

                                              Actions.ConfirmModal({
                                                  text: this.state.product.discount + "",
                                                  backExit: true,
                                                  confirmFun: () => {
                                                      this.exitConfirm();
                                                      Actions.LoadingModal({text: i18n("Redeeming"), backExit: false});
                                                      vUserDao.redeem(this.state.product.code, this.state.address).then((res) => {
                                                          if (res.code === 200) {
                                                              vUserDao.localUserInfo().then((data) => {
                                                                  data.points = data.points - this.state.product.discount;
                                                                  return vUserDao.saveLocalUserInfo(data)
                                                              }).then((result) => {
                                                                  DeviceEventEmitter.emit(Constant.CHANGE_PERSONAL);
                                                                  this.exitLoading();
                                                                  Actions.SuccessModal({
                                                                      finishFunc: () => {
                                                                          Actions.pop();
                                                                      }
                                                                  });
                                                              })

                                                          } else {
                                                              Toast(res.message);
                                                          }
                                                      })

                                                  }
                                              });
                                          }}>
                            <Text style={[styles.middleTextWhite]}>{i18n("Confirm")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}

export default OrderConfirmPage
