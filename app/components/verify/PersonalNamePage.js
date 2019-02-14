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

/**
 * 登录
 */
class PersonalNamePage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            nickname: "",
        }
    }

    componentDidMount() {
        this.initUserInfo();
    }

    initUserInfo() {
        vUserDao.localUserInfo().then((res) => {
            this.setState({
                userInfo: res,
                nickname: res.nickname
            });
        })
    }

    _title() {
        return i18n("Name");
    }

    _isRightPress() {
        return true;
    }

    _rightPress() {
        if(this.state.nickname === ""){
            Toast(i18n("Please_input_name"));
            return;
        }
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

        return (
            <View style={[{backgroundColor: "#F5F5F5"}, styles.flexDirectionColumn]}>

                <View style={styles.dividerLineF6}/>

                <View
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 18,
                        paddingLeft: 16,
                        paddingRight: 20,
                        backgroundColor: Constant.white
                    }]}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Name")}</Text>

                    <TextInput
                        style={[styles.middleTexBlackCharter, {width: 250, textAlign: "right"}]}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({nickname: text})}
                        value={this.state.nickname}>
                    </TextInput>
                </View>

            </View>
        )
    }
}

export default PersonalNamePage
