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
import styles, {screenHeight, screenWidth, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import * as constant from "../../style/constant";
import {Actions} from "react-native-router-flux";
import vUserDao from "../../dao/vUserDao";
import Toast from '../../components/common/ToastProxy';
import Icon from "react-native-vector-icons/Feather";


/**
 * 登录
 */
class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: "",
            password: "",
            isPwd: true,
        }
    }

    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    render() {

        let iconWidth = screenWidth * 0.417;
        let iconHeight = iconWidth * 0.6111;

        let inputIconWidth = 20;
        let dividerWidth = screenWidth - 76;
        let inputWidth = dividerWidth - inputIconWidth;

        let pwdIcon = this.state.isPwd ? require("../../img/icon_eye_n.png") : require("../../img/icon_eye_s.png");

        return (

            <View style={[{backgroundColor: "#f4f3f4"}, styles.flexDirectionColumn, styles.centerH]}>
                <StatusBar hidden={true}/>

                <View style={{width: screenWidth}}>
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
                <Image source={require("../../img/logo.png")}
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
                        <TextInput
                            style={[styles.middleTexBlack, {
                                width: inputWidth,
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
                                   resizeMode={"center"}
                                   source={require("../../img/icon_clear.png")}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.dividerLineE6, {width: dividerWidth}]}/>

                    <View style={[{marginTop: 15}, styles.flexDirectionRowNotFlex, styles.centerH,]}>
                        <TextInput
                            style={[styles.middleTexBlack, {
                                width: inputWidth,
                                paddingVertical: 5,
                            }]}
                            underlineColorAndroid='transparent'
                            placeholder={i18n("Password")}
                            secureTextEntry={this.state.isPwd}
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}/>
                        <TouchableOpacity activeOpacity={constant.activeOpacity}
                                          onPress={() => {
                                              this.setState({isPwd: !this.state.isPwd})
                                          }}>
                            <Image style={[{height: inputIconWidth, width: inputIconWidth, marginRight: 10}]}
                                   resizeMode={"center"}
                                   source={pwdIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.dividerLineE6, {width: dividerWidth}]}/>
                    <View style={[{marginTop: 17}, styles.flexDirectionRowNotFlex, styles.centerH,]}>
                        <Image style={[{height: 12, width: 12, marginRight: 2}]}
                               resizeMode={"center"}
                               source={require("../../img/icon_info.png")}/>

                        <Text style={styles.subLightSMinText}>{i18n("sign_tip")}</Text>
                        <Text style={[{
                            color: "#1C1C1C",
                            textDecorationLine: "underline",
                            fontSize: constant.sminTextSize,
                        },]}>{i18n("User_Agreement2")}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={constant.activeOpacity}
                                      onPress={() => {
                                          Keyboard.dismiss();
                                          Actions.LoadingModal({text: i18n("Logining"), backExit: false});
                                          vUserDao.login(this.state.account, this.state.password).then((res) => {
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
                                                  Actions.pop();
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

                <View
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingTop: 12,
                        paddingLeft: 38,
                        paddingRight: 38
                    }]}>
                    <Text style={[{
                        color: "#1C1C1C",
                        textDecorationLine: "underline",
                        fontSize: constant.minTextSize,
                    },]}>{i18n("Forgot_password")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>
                        <TouchableOpacity activeOpacity={constant.activeOpacity}
                                          onPress={() => {
                                              Actions.RegisterPage();
                                          }}>
                            <Text style={[{
                                color: "#1C1C1C",
                                textDecorationLine: "underline",
                                fontSize: constant.minTextSize,
                            },]}>{i18n("Create_new_account")}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }
}

export default LoginPage
