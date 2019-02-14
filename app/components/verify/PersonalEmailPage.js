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
class PersonalNamePage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
        }
    }


    _title() {
        return i18n("Email_address");
    }

    _isRightPress() {
        return true;
    }

    _rightPress() {
        if(this.state.email === ""){
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

    _reader() {

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
                        style={[styles.middleTexBlackCharter, {width: screenWidth-140, textAlign: "right"}]}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}>
                    </TextInput>
                </View>

            </View>
        )
    }
}

export default PersonalNamePage
