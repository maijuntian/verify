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
import {home} from "../../utils/PageUtils";
import AnalyticsUtil from "../../utils/AnalyticsUtil";

/**
 * 登录
 */
class ResetPwd2Page extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            account: this.props.account,
            newPwd1: "",
            newPwd2: "",
            type: this.props.type,
            code: "",
            time: 60,
            isPwd: true,
            isSending:false,
        }
    }

    componentDidMount() {
        this.toNext();
    }

    componentWillMount() {
        AnalyticsUtil.onPageBegin("ResetPwd2Page");
    }


    componentWillUnmount(){
        AnalyticsUtil.onPageEnd("ResetPwd2Page");
    }

    _title() {
        return i18n("Reset_Password");
    }

    toNext() {
        this.setState({time: 60});
        this.timer = setInterval(() => {
            if (this.state.time > 0) {
                this.setState({
                    time: (this.state.time - 1)
                })
            } else {
                clearInterval(this.timer);
            }
        }, 1000);
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }


    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    login(){
        vUserDao.login(this.state.account, this.state.newPwd1).then((res) => {
            if (res.code === 200) {
                return vUserDao.userinfo();
            } else {
                Toast(res.message);
                return null;
            }
        }).then((res) => {
            this.exitLoading();
            if(res === null)
                return;
            if (res.code === 200) {
                DeviceEventEmitter.emit(Constant.CHANGE_PERSONAL);
                home(res.data.region);
                // Actions.pop();
                // Actions.pop();
            } else {
                Toast(res.message);
            }
        });
    }

    _reader() {

        let inputIconWidth = 78;
        let dividerWidth = screenWidth - 80;
        let inputWidth = dividerWidth - inputIconWidth;

        let text;
        if (this.state.time > 0) {
            text = this.state.time + "s";
        } else {
            text = i18n("Resend");
        }
        let pwdIcon = this.state.isPwd ? require("../../img/icon_eye_n.png") : require("../../img/icon_eye_s.png");

        let typeStr = this.state.type === 'email'? i18n("email"): i18n("phone");
        return (
            <View style={[{
                marginTop: 30,
                marginHorizontal: 40,
                width: screenWidth - 80,
            }, styles.flexDirectionColumnNotFlex]}>

                <Text
                    style={styles.minTextsGray}>{i18n("Safety_Checking_tip1") + " " + typeStr + " " + this.state.account + i18n("Safety_Checking_tip2")}</Text>

                <View style={[{marginTop: 15}, styles.flexDirectionRowNotFlex, styles.centerH,]}>
                    <TextInput
                        style={[styles.middleTexBlack, {
                            width: inputWidth,
                            paddingVertical: 5,
                        }]}
                        underlineColorAndroid='transparent'
                        placeholder={i18n("Verification_code")}
                        onChangeText={(text) => this.setState({code: text})}
                        value={this.state.code}/>
                    <CommonIconTextButton textStyle={[{color: "#586575", fontSize: Constant.smallTextSize}]}
                                          text={text}
                                          iconStyle={[{height: 12, width: 14}]}
                                          icon={require("../../img/icon_send.png")}
                                          activeOpacity={1}
                                          width={inputIconWidth}
                                          onPress={() => {
                                              if (!this.state.isSending && this.state.time <= 0) {
                                                  this.state.isSending = true;
                                                  if (this.state.type === "phone") {
                                                      vUserDao.snsCode(this.state.account).then((res) => {
                                                          this.state.isSending = false;
                                                          if (res.code === 200) {
                                                              this.toNext();
                                                          } else {
                                                              Toast(res.message);
                                                          }
                                                      });
                                                  } else {
                                                      vUserDao.emailCode2(this.state.account).then((res) => {
                                                          this.state.isSending = false;
                                                          if (res.code === 200) {
                                                              this.toNext();
                                                          } else {
                                                              Toast(res.message);
                                                          }
                                                      });
                                                  }
                                              }
                                          }}/>
                </View>
                <View style={[styles.dividerLineE6, {width: dividerWidth, marginTop: 5}]}/>
                <Text
                    style={[styles.minTextsGray, {marginTop: 30, marginBottom: 25}]}>{i18n("reset_pwd_tip2")}</Text>

                <TextInput
                    style={[styles.middleTexBlack, {
                        width: dividerWidth,
                        paddingVertical: 5,
                    }]}
                    secureTextEntry={this.state.isPwd}
                    underlineColorAndroid='transparent'
                    placeholder={i18n("input_new_password")}
                    onChangeText={(text) => this.setState({newPwd1: text})}
                    value={this.state.newPwd1}/>
                <View style={[styles.dividerLineE6, {width: dividerWidth,}]}/>
                <TextInput
                    style={[styles.middleTexBlack, {
                        width: dividerWidth,
                        marginTop: 25,
                        paddingVertical: 5,
                    }]}
                    secureTextEntry={this.state.isPwd}
                    underlineColorAndroid='transparent'
                    placeholder={i18n("Confirm_New_Password")}
                    onChangeText={(text) => this.setState({newPwd2: text})}
                    value={this.state.newPwd2}/>
                <View style={[styles.dividerLineE6, {width: dividerWidth,}]}/>

                <View style={[{marginTop: 15}, styles.flexDirectionRowNotFlex, styles.centerH,]}>
                    <Image style={[{height: 12, width: 12, marginRight: 2}]}
                           resizeMode={"contain"}
                           source={require("../../img/icon_info.png")}/>

                    <Text style={styles.subLightSMinText}>{i18n("pwd_tip")}</Text>
                </View>

                <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                  onPress={() => {
                                      this.setState({isPwd: !this.state.isPwd})
                                  }}>
                    <View style={[{marginTop: 15, marginBottom: 80}, styles.flexDirectionRowNotFlex, styles.centerH,]}>
                        <Image style={[{height: 12, width: 12, marginRight: 2}]}
                               resizeMode={"contain"}
                               source={pwdIcon}/>


                        <Text style={styles.subLightSMinText}>{i18n("Show_password")}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                  onPress={() => {
                                      Keyboard.dismiss();

                                      if (this.state.code === "") {
                                          Toast(i18n("Please_input_code"));
                                          return;
                                      }

                                      if (this.state.newPwd1 === "") {
                                          Toast(i18n("input_pwd_tip1"));
                                          return;
                                      }

                                      if (this.state.newPwd1 !== this.state.newPwd2) {
                                          Toast(i18n("input_pwd_tip3"));
                                          return;
                                      }

                                      if (this.state.newPwd1.length < 6 || this.state.newPwd2.length < 6) {
                                          Toast(i18n("pwd_tip"));
                                          return;
                                      }


                                      Actions.LoadingModal({text: i18n("Resetting"), backExit: false});
                                      vUserDao.resetPwd(this.state.account, this.state.newPwd1, this.state.code).then((res) => {
                                          this.exitLoading();
                                          if (res.code === 200) {
                                              Toast(res.message);
                                              this.login();
                                          } else {
                                              Toast(res.message);
                                          }
                                      })

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

export default ResetPwd2Page
