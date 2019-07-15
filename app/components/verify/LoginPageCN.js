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
    TextInput,
    Keyboard,
    DeviceEventEmitter
} from "react-native";
import styles, {navBarHeight, screenHeight, screenWidth, statusHeight} from "../../style";
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import i18n from "../../style/i18n";
import * as constant from "../../style/constant";
import {Actions} from "react-native-router-flux";
import vUserDao from "../../dao/vUserDao";
import Toast from '../../components/common/ToastProxy';
import Icon from "react-native-vector-icons/Feather";
import CommonIconTextButton from "../common/CommonIconTextButton";
import {home} from "../../utils/PageUtils";
import {LocaleConfig} from "react-native-calendars";
import AnalyticsUtil from "../../utils/AnalyticsUtil";


/**
 * 登录
 */
class LoginPageCN extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: "",
            code: "",
            time: 0,
            isSending: false,
        }
    }


    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    toNext() {
        this.hasSend = true;
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
        AnalyticsUtil.onPageEnd("LoginPageCN");
    }

    componentWillMount(){
        AnalyticsUtil.onPageBegin("LoginPageCN");
    }


    render() {

        let iconWidth = screenWidth * 0.417;
        let iconHeight = iconWidth * 0.6111;

        let inputIconWidth = 15;
        let dividerWidth = screenWidth - 76;
        let inputWidth = dividerWidth - inputIconWidth;

        let inputIconWidth2 = 73;
        let inputWidth2 = dividerWidth - inputIconWidth2;

        let text;
        if (this.state.time > 0) {
            text = this.state.time + "s";
        } else if (this.hasSend) {
            text = i18n("Resend");
        } else {
            text = i18n("Send");
        }

        return (

            <View style={[{backgroundColor: "#f4f3f4"}, styles.flexDirectionColumn, styles.centerH]}>

                <View style={[{
                    width: screenWidth,
                    height: navBarHeight,
                    paddingTop: statusHeight
                }, styles.centerV]}>
                    <TouchableOpacity
                        style={{marginTop: statusHeight, height: 25, width: 25, marginLeft: 8}}
                        onPress={() => {
                            Actions.pop();
                        }}>
                        <Icon
                            name={"chevron-left"}
                            backgroundColor={constant.transparentColor}
                            color={constant.primaryBlackColor} size={25}
                            style={[styles.centered,]}/>
                    </TouchableOpacity>

                </View>
                <Image source={require("../../img/logo_cn.png")}
                       resizeMode={"stretch"}
                       style={{marginTop: 45, width: iconWidth, height: iconHeight}}/>

                <View style={[{
                    marginTop: 44,
                    marginHorizontal: 25,
                    paddingLeft: 13,
                    paddingRight: 13,
                    paddingVertical: 25,
                    width: screenWidth - 50,
                    borderRadius: 8,
                }, styles.flexDirectionColumnNotFlex, styles.mainBgColor]}>

                    <View style={[styles.flexDirectionRowNotFlex, styles.centerH,]}>

                        <Text style={[styles.middleTextGrayBlue,]}>手    机</Text>

                        <TextInput
                            style={[styles.middleTexBlack, {
                                width: inputWidth,
                                marginLeft: 5,
                                paddingVertical: 5,
                            }]}
                            underlineColorAndroid='transparent'
                            placeholder={i18n("Mobile_number_or_email")}
                            onChangeText={(text) => this.setState({account: text})}
                            value={this.state.account}/>
                        <TouchableOpacity activeOpacity={constant.activeOpacity}
                                          onPress={() => {
                                              this.setState({account: ""})
                                          }}>
                            <Image style={[{height: inputIconWidth, width: inputIconWidth, marginRight: 10}]}
                                   resizeMode={"contain"}
                                   source={require("../../img/icon_clear.png")}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.dividerLineE6, {width: dividerWidth}]}/>

                    <View style={[{marginTop: 15}, styles.flexDirectionRowNotFlex, styles.centerH,]}>

                        <Text style={[styles.middleTextGrayBlue,]}>验证码</Text>
                        <TextInput
                            style={[styles.middleTexBlack, {
                                width: inputWidth2 - 53,
                                marginLeft: 5,
                                paddingVertical: 5,
                            }]}
                            underlineColorAndroid='transparent'
                            placeholder={i18n("Verification_code")}
                            onChangeText={(text) => this.setState({code: text})}
                            value={this.state.code}/>
                        <CommonIconTextButton textStyle={[{color: "#586575", fontSize: constant.smallTextSize}]}
                                              text={text}
                                              iconStyle={[{height: 12, width: 14}]}
                                              icon={require("../../img/icon_send.png")}
                                              activeOpacity={1}
                                              width={inputIconWidth2}
                                              paddingVertical={4}
                                              borderRadius={17}
                                              onPress={() => {
                                                  if (!this.state.isSending && this.state.time <= 0) {
                                                      this.state.isSending = true;
                                                      vUserDao.snsCode(this.state.account).then((res) => {
                                                          this.state.isSending = false;
                                                          if (res.code === 200) {
                                                              this.toNext();
                                                          } else {
                                                              Toast(res.message);
                                                          }
                                                      });
                                                  }
                                              }}/>
                    </View>
                    <View style={[styles.dividerLineE6, {width: dividerWidth}]}/>
                    <TouchableOpacity activeOpacity={constant.activeOpacity}
                                      onPress={() => {
                                          Actions.WebviewPage({
                                              url: constant.API_USER_AGREEMENT,
                                              title: i18n("User_Agreement")
                                          });
                                      }}>
                        <View style={[{marginTop: 17}, styles.flexDirectionRowNotFlex, styles.centerH,]}>
                            <Image style={[{height: 12, width: 12, marginRight: 2}]}
                                   resizeMode={"contain"}
                                   source={require("../../img/icon_info.png")}/>

                            <Text style={styles.subLightSMinText}>{i18n("sign_tip")}</Text>
                            <Text style={[{
                                color: "#1C1C1C",
                                textDecorationLine: "underline",
                                fontSize: constant.sminTextSize,
                            },]}>{i18n("User_Agreement2")}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={constant.activeOpacity}
                                      onPress={() => {
                                          Keyboard.dismiss();

                                          if (this.state.account === "") {
                                              Toast(i18n("address_tip_phone"));
                                              return;
                                          }
                                          if (this.state.code === "") {
                                              Toast(i18n("Verification_code"));
                                              return;
                                          }

                                          Actions.LoadingModal({text: i18n("Logining"), backExit: false});

                                          vUserDao.phoneLogin(this.state.account, this.state.code).then((res) => {
                                              if (res.code === 200) {
                                                  return vUserDao.userinfo();
                                              } else {
                                                  Toast(res.message);
                                                  return null;
                                              }
                                          }).then((res) => {
                                              this.exitLoading();
                                              if (res.code === 200) {
                                                  DeviceEventEmitter.emit(constant.CHANGE_PERSONAL);
                                                  home(res.data.region);
                                                  // Actions.pop();
                                              } else {
                                                  Toast(res.message);
                                              }
                                          })
                                      }}>
                        <View style={[{
                            width: screenWidth - 76,
                            paddingVertical: 10,
                            marginTop: 20,
                            borderColor: "#D7D7D7",
                            borderRadius: 6,
                            borderWidth: 1
                        }, styles.centered,]}>
                            <Text style={styles.smallTextGrayBlue}>{i18n("Sign_in")}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default LoginPageCN
