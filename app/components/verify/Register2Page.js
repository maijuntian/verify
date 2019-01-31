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
class Register2Page extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            account: this.props.account,
            password: this.props.password,
            type: this.props.type,
            code: "",
            time: 60,
        }
    }

    componentDidMount() {
        this.toNext();
    }


    _title() {
        return i18n("Safety_Checking");
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

        let inputIconWidth = 70;
        let dividerWidth = screenWidth - 80;
        let inputWidth = dividerWidth - inputIconWidth;

        let text;
        if (this.state.time > 0) {
            text = this.state.time + "s";
        } else {
            text = i18n("Send");
        }

        return (
            <View style={[{
                marginTop: 30,
                marginHorizontal: 40,
                width: screenWidth - 80,
            }, styles.flexDirectionColumnNotFlex]}>

                <View style={[styles.flexDirectionRowNotFlex, styles.centerH,]}>
                    <Text
                        style={styles.minTextsGray}>{i18n("Safety_Checking_tip1") + " " + this.state.type + " " + this.state.account + i18n("Safety_Checking_tip2")}</Text>
                </View>

                <View style={[{marginTop: 15}, styles.flexDirectionRowNotFlex, styles.centerH,]}>
                    <TextInput
                        style={[styles.middleTexBlack, {
                            width: inputWidth,
                            paddingVertical: 5,
                        }]}
                        underlineColorAndroid='transparent'
                        placeholder={i18n("Verification_code")}
                        secureTextEntry={this.state.isPwd}
                        onChangeText={(text) => this.setState({code: text})}
                        value={this.state.code}/>
                    <CommonIconTextButton textStyle={[{color: "#586575", fontSize: Constant.smallTextSize}]}
                                          text={text}
                                          iconStyle={[{height: 12, width: 14}]}
                                          icon={require("../../img/icon_send.png")}
                                          activeOpacity={1}
                                          width={inputIconWidth}
                                          onPress={() => {
                                              if (this.state.time <= 0) {
                                                  if (this.state.type === "phone") {
                                                      vUserDao.snsCode(this.state.account).then((res) => {
                                                          if (res.code === 200) {
                                                              this.toNext();
                                                          } else {
                                                              Toast(res.message);
                                                          }
                                                      });
                                                  } else {
                                                      vUserDao.emailCode(this.state.account).then((res) => {
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


                <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                  onPress={() => {
                                      Keyboard.dismiss();

                                      if (this.state.code === "") {
                                          Toast(i18n("Please_input_code"));
                                          return;
                                      }

                                      Actions.LoadingModal({text: i18n("Registering"), backExit: false});
                                      if (this.state.type === "phone") {
                                          vUserDao.phoneRegister(this.state.account, this.state.password, this.state.code).then((res) => {
                                              this.exitLoading();
                                              if (res.code === 200) {
                                                  Toast("Register successful!")
                                                  Actions.pop();
                                              } else {
                                                  Toast(res.message);
                                              }
                                          })
                                      } else {
                                          vUserDao.emailRegister(this.state.account, this.state.password, this.state.code).then((res) => {
                                              this.exitLoading();
                                              if (res.code === 200) {
                                                  Toast("Register successful!")
                                                  Actions.pop();
                                              } else {
                                                  Toast(res.message);
                                              }
                                          })
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

            </View>
        )
    }
}

export default Register2Page
