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
import productDao from "../../dao/productDao";

/**
 * 登录
 */
class FeedBackPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            content: "",
            code: this.props.code,
        }
    }

    componentDidMount() {
    }

    _title() {
        return i18n("Feedback");
    }


    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    _reader() {

        return (
            <View style={[styles.flexDirectionColumn, styles.alignItemsEnd]}>

                <TextInput
                    style={[styles.smallTextBlack, {
                        width: screenWidth - 20,
                        height: 226,
                        borderColor: "#D7D7D7",
                        borderWidth: 1,
                        marginHorizontal: 10,
                        marginTop: 16,
                        borderRadius: 5,
                        textAlignVertical: "top",
                        paddingVertical: 15,
                        paddingHorizontal: 30
                    }]}
                    multiline={true}
                    underlineColorAndroid='transparent'
                    placeholder={i18n("feedback_tip")}
                    onChangeText={(text) => this.setState({content: text})}>
                </TextInput>
                <View style={[styles.flexDirectionColumn, styles.justifyEnd]}>
                    <TouchableOpacity
                        activeOpacity={Constant.activeOpacity}
                        style={[{
                            width: screenWidth * 0.4,
                            marginHorizontal: screenWidth * 0.3,
                            marginBottom: 16,
                            borderColor: "#D7D7D7",
                            borderWidth: 1,
                            borderRadius: 20,
                            paddingVertical: 10,
                        }, styles.centered]}
                        onPress={() => {
                            if (this.state.content === "") {
                                Toast(i18n("Content_cannot_be_empty"));
                            } else {
                                Actions.LoadingModal({text: i18n("Saving"), backExit: false});
                                Keyboard.dismiss();
                                productDao.feedback(this.state.code, this.state.content).then((res) => {
                                    this.exitLoading();
                                    if (res.code === 200) {
                                        Toast(i18n("Feedback_success"))
                                        Actions.pop();
                                    } else {
                                        Toast(res.message);
                                    }
                                })
                            }
                        }}>
                        <Text style={[{
                            color: Constant.grayBlue,
                            fontSize: Constant.smallTextSize
                        }]}>{i18n("Send")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default FeedBackPage
