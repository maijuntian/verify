/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Keyboard,
    TextInput,
    DeviceEventEmitter
} from "react-native";
import styles, {screenHeight, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import * as Constant from "../../style/constant";
import Icon from 'react-native-vector-icons/Feather'
import BaseTitlePage from "../widget/BaseTitlePage";
import vUserDao from "../../dao/vUserDao";
import {Actions} from "react-native-router-flux";
import Toast from '../../components/common/ToastProxy';
import AnalyticsUtil from "../../utils/AnalyticsUtil";

/**
 * 登录
 */
class OrderAddressEditPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            productStr: this.props.productStr,
            address: "",
            contacts: "",
            defaultB: true,
            phone: "",
        }
    }

    componentWillMount() {
        AnalyticsUtil.onPageBegin("OrderAddressEditPage");
    }

    componentWillUnmount(){
        AnalyticsUtil.onPageEnd("OrderAddressEditPage");
    }

    _title() {
        return i18n("Receiving_address");
    }


    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    _reader() {

        let switchIcon = this.state.defaultB ? require("../../img/switch_on.png") : require("../../img/switch_off.png");

        return (
            <View style={[{backgroundColor: "white"}, styles.flexDirectionColumn]}>


                <View style={styles.dividerLineF6}/>

                <View
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingLeft: 16,
                        paddingRight: 20,
                    }]}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}
                          multiline={true}>{i18n("Address")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <TextInput
                            style={[styles.middleTexBlackCharter, {
                                width: 200,
                                height: 70,
                                textAlign: "right",
                            }]}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({address: text})}
                            value={this.state.address}>
                        </TextInput>
                        <Icon
                            style={[{marginLeft: 12}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </View>


                <View style={styles.dividerLineF6}/>

                <View
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingLeft: 16,
                        paddingRight: 20,
                    }]}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Contacts")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <TextInput
                            style={[styles.middleTexBlackCharter, {
                                width: 200,
                                height: 70,
                                textAlign: "right",
                            }]}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({contacts: text})}
                            value={this.state.contacts}>
                        </TextInput>

                    </View>

                </View>

                <View style={styles.dividerLineF6}/>

                <View
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingLeft: 16,
                        paddingRight: 20,
                    }]}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Phone")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <TextInput
                            style={[styles.middleTexBlackCharter, {
                                width: 200,
                                height: 70,
                                textAlign: "right",
                            }]}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => {
                                const newText = text.replace(/[^\d]+/, '');
                                this.setState({phone: newText})
                            }}
                            keyboardType={"phone-pad"}
                            value={this.state.phone}>
                        </TextInput>

                    </View>

                </View>

                <View style={styles.dividerLineF6}/>


                <View
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 20,
                    }]}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Set_as_default")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <TouchableOpacity
                            activeOpacity={Constant.activeOpacity}
                            onPress={() => {
                                this.setState({defaultB: !this.state.defaultB})
                            }}>

                            <Image
                                style={[{
                                    width: 60,
                                    height: 30,
                                }]}
                                source={switchIcon}>
                            </Image>

                        </TouchableOpacity>

                    </View>

                </View>

                <View style={styles.dividerLineF6}/>
                <View style={[styles.flexDirectionColumn, styles.justifyEnd]}>


                    <View style={[{paddingHorizontal: 36, paddingVertical: 14,},]}>

                        <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                          onPress={() => {
                                              Actions.LoadingModal({text: i18n("Saving"), backExit: false});

                                              let params = {
                                                  id: this.state.id,
                                                  address: this.state.address,
                                                  contacts: this.state.contacts,
                                                  default: this.state.defaultB,
                                                  phone: this.state.phone,
                                              };
                                              vUserDao.saveAddress(params).then((res) => {
                                                  this.exitLoading();
                                                  if (res.code === 200) {
                                                      Actions.replace("OrderConfirmPage", {
                                                          productStr: this.state.productStr,
                                                          addressStr: JSON.stringify(params)
                                                      });
                                                  } else {
                                                      Toast(res.message);
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
                                    color: Constant.grayBlue,
                                    fontSize: Constant.smallTextSize
                                }]}>{i18n("Save")}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        )
    }
}

export default OrderAddressEditPage
