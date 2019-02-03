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
import styles, {screenHeight, screenWidth, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import * as Constant from "../../style/constant";
import Icon from 'react-native-vector-icons/Feather'
import BaseTitlePage from "../widget/BaseTitlePage";
import vUserDao from "../../dao/vUserDao";
import {Actions} from "react-native-router-flux";
import Toast from '../../components/common/ToastProxy';
import CommonIconTextButton from "../common/CommonIconTextButton";

/**
 * 登录
 */
class ResetPwdPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            account: "",
        }
    }


    _title() {
        return i18n("Reset_Password");
    }


    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    _reader() {

        let inputIconWidth = 20;
        let dividerWidth = screenWidth - 80;
        let inputWidth = dividerWidth - inputIconWidth;

        return (
            <View style={[{
                marginTop: 30,
                marginHorizontal: 40,
                width: screenWidth - 80,
            }, styles.flexDirectionColumnNotFlex]}>

                <View style={[styles.flexDirectionRowNotFlex, styles.centerH,]}>
                    <Text
                        style={styles.minTextsGray}>{i18n("reset_pwd_tip")}</Text>
                </View>

                <View style={[{marginTop: 15}, styles.flexDirectionRowNotFlex, styles.centerH,]}>
                    <TextInput
                        style={[styles.middleTexBlack, {
                            width: inputWidth,
                            paddingVertical: 5,
                        }]}
                        underlineColorAndroid='transparent'
                        placeholder={i18n("Mobile_number_or_email")}
                        onChangeText={(text) => this.setState({account: text})}
                        value={this.state.account}/>
                    <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                      onPress={() => {
                                          this.setState({account: ""})
                                      }}>
                        <Image style={[{height: inputIconWidth, width: inputIconWidth, marginRight: 10}]}
                               resizeMode={"center"}
                               source={require("../../img/icon_clear.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.dividerLineE6, {width: dividerWidth, marginTop: 5, marginBottom: 80}]}/>


                <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                  onPress={() => {
                                      Keyboard.dismiss();
                                      let type;

                                      if (this.state.account === "") {
                                          Toast(i18n("Please_input_account"));
                                          return;
                                      }
                                      if (this.state.account.indexOf("@") > 0) {
                                          type = "email";
                                      } else {
                                          type = "phone";
                                      }


                                      Actions.LoadingModal({text: i18n("Sending"), backExit: false});
                                      if (type === "phone") {
                                          vUserDao.snsCode(this.state.account).then((res) => {
                                              this.exitLoading();
                                              console.log("res--->" + JSON.stringify(res));
                                              if (res.code === 200) {
                                                  Actions.replace("ResetPwd2Page", {
                                                      "account": this.state.account,
                                                      "type": type,
                                                  });
                                              } else {
                                                  Toast(res.message);
                                              }
                                          });
                                      } else {
                                          vUserDao.emailCode2(this.state.account).then((res) => {
                                              this.exitLoading();
                                              console.log("res--->" + JSON.stringify(res));
                                              if (res.code === 200) {
                                                  Actions.replace("ResetPwd2Page", {
                                                      "account": this.state.account,
                                                      "type": type,
                                                  });
                                              } else {
                                                  Toast(res.message);
                                              }
                                          });
                                      }
                                  }}>
                    <View style={[{
                        width: screenWidth - 80,
                        paddingVertical: 10,
                        borderColor: "#D7D7D7",
                        borderRadius: 6,
                        borderWidth: 1
                    }, styles.centered,]}>
                        <Text style={styles.smallTextGrayBlue}>{i18n("Continue")}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}

export default ResetPwdPage
