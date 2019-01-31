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

/**
 * 登录
 */
class RegisterPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            account: "",
            password: "",
            isPwd: true,
        }
    }

    componentDidMount() {
    }


    _title() {
        return i18n("Register");
    }

    _rightPress() {
        Actions.LoadingModal({text: i18n("Saving"), backExit: false});
        Keyboard.dismiss();
        vUserDao.updateInfo({"nickname": this.state.nickname}).then((res) => {
            this.exitLoading();
            if (res.code === 200) {
                this.state.userInfo.nickname = this.state.nickname;
                vUserDao.saveLocalUserInfo(this.state.userInfo).then((res) => {
                    DeviceEventEmitter.emit(Constant.CHANGE_PERSONAL);
                    Actions.pop();
                })
            } else {
                Toast.show(res.message);
            }
        })
    }

    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    _reader() {

        let inputIconWidth = 20;
        let dividerWidth = screenWidth - 76;
        let inputWidth = dividerWidth - inputIconWidth;

        let pwdIcon = this.state.isPwd ? require("../../img/icon_eye_n.png") : require("../../img/icon_eye_s.png");

        return (
            <View style={[{
                marginTop: 44,
                marginHorizontal: 40,
                width: screenWidth - 80,
            }, styles.flexDirectionColumnNotFlex]}>

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
                    <TouchableOpacity activeOpacity={Constant.activeOpacity}
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
                    <TouchableOpacity activeOpacity={Constant.activeOpacity}
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

                    <Text style={styles.subLightSMinText}>{i18n("pwd_tip")}</Text>
                </View>

                <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                  onPress={() => {

                                      Keyboard.dismiss();
                                      let type;
                                      console.log("@-->" + this.state.account.indexOf("@"))
                                      if (this.state.account.indexOf("@") > 0) {
                                          type = "email";
                                      } else {
                                          type = "phone";
                                      }

                                      if (this.state.account === "") {
                                          Toast(i18n("Please_input_account"));
                                          return;
                                      }

                                      if (this.state.password === "") {
                                          Toast(i18n("Please_input_password"));
                                          return;
                                      }

                                      if (this.state.password.length < 6) {
                                          Toast(i18n("pwd_tip"));
                                          return;
                                      }

                                      Actions.LoadingModal({text: i18n("Sending"), backExit: false});
                                      if (type === "phone") {
                                          vUserDao.snsCode(this.state.account).then((res) => {
                                              this.exitLoading();
                                              console.log("res--->" + JSON.stringify(res));
                                              if (res.code === 200) {
                                                  Actions.replace("Register2Page",{
                                                      "account": this.state.account,
                                                      "password": this.state.password,
                                                      "type": type,
                                                  });
                                              } else {
                                                  Toast(res.message);
                                              }
                                          });
                                      } else {
                                          vUserDao.emailCode(this.state.account).then((res) => {
                                              this.exitLoading();
                                              console.log("res--->" + JSON.stringify(res));
                                              if (res.code === 200) {
                                                  Actions.replace("Register2Page",{
                                                      "account": this.state.account,
                                                      "password": this.state.password,
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
                        marginTop: 80,
                        borderColor: "#D7D7D7",
                        borderRadius: 6,
                        borderWidth: 1
                    }, styles.centered,]}>
                        <Text style={styles.smallTextGrayBlue}>{i18n("Continue")}</Text>
                    </View>
                </TouchableOpacity>

                <View style={[{
                    marginTop: 17,
                    width: screenWidth - 80
                }, styles.flexDirectionRowNotFlex, styles.centered,]}>

                    <Text style={styles.subLightSMinText}>{i18n("sign_tip")}</Text>
                    <Text style={[{
                        color: "#1C1C1C",
                        textDecorationLine: "underline",
                        fontSize: Constant.sminTextSize,
                    },]}>{i18n("User_Agreement2")}</Text>
                </View>
            </View>
        )
    }
}

export default RegisterPage
