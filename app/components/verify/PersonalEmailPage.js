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
import AnalyticsUtil from "../../utils/AnalyticsUtil";

/**
 * 登录
 */
class PersonalEmailPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            code: "",
            time: -1,
            isSending: false,
        }
    }
    componentWillMount() {
        AnalyticsUtil.onPageBegin("PersonalEmailPage");
    }


    componentWillUnmount(){
        AnalyticsUtil.onPageEnd("PersonalEmailPage");
        this.subscription.remove();
    }

    _title() {
        return i18n("Email_address");
    }

    _isRightPress() {
        return true;
    }

    _rightPress() {
        if (this.state.email === "") {
            Toast(i18n("Please_input_email"));
            return;
        }

        Actions.LoadingModal({text: i18n("Saving"), backExit: false});
        Keyboard.dismiss();
        vUserDao.updateInfo({"email": this.state.email}).then((res) => {
            if (res.code === 200) {
                vUserDao.localUserInfo().then((data) => {
                    data.email = this.state.email;
                    return vUserDao.saveLocalUserInfo(data)
                }).then((result) => {
                    this.exitLoading();
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
    _reader() {
        let text;
        if (this.state.time > 0) {
            text = this.state.time + "s";
        } else if(this.state.time === 0) {
            text = i18n("Resend");
        } else {
            text = i18n("Send");
        }
        return (
            <View style={[{backgroundColor: "#F5F5F5"}, styles.flexDirectionColumn]}>

                <View
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 18,
                        paddingLeft: 16,
                        paddingRight: 20,
                        backgroundColor: Constant.white
                    }]}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Email_address")}</Text>

                    <TextInput
                        style={[styles.middleTexBlackCharter, {marginLeft: 42, width: screenWidth - 150,}]}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}>
                    </TextInput>
                </View>
                <View style={styles.dividerLineF6}/>

                <View
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 18,
                        paddingLeft: 16,
                        paddingRight: 12,
                        backgroundColor: Constant.white
                    }]}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Code")}</Text>

                    <TextInput
                        style={[styles.middleTexBlackCharter, {
                            marginLeft: 32,
                            width: screenWidth - 165,
                        }]}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({code: text})}
                        value={this.state.code}>
                    </TextInput>
                    <CommonIconTextButton textStyle={[{color: "#586575", fontSize: Constant.smallTextSize}]}
                                          text={text}
                                          iconStyle={[{height: 12, width: 14}]}
                                          icon={require("../../img/icon_send.png")}
                                          activeOpacity={1}
                                          width={78}
                                          onPress={() => {
                                              if (!this.state.isSending && this.state.time <= 0) {
                                                  if (this.state.email === "") {
                                                      Toast(i18n("Please_input_email"));
                                                      return;
                                                  }
                                                  this.state.isSending = true;
                                                  vUserDao.emailCode(this.state.email).then((res) => {
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
            </View>
        )
    }
}

export default PersonalEmailPage
