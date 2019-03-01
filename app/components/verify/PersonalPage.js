/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, StatusBar, TouchableOpacity, FlatList, DeviceEventEmitter} from "react-native";
import styles, {screenHeight, statusHeight} from "../../style";
import BaseTitlePage from "../widget/BaseTitlePage";
import i18n from "../../style/i18n";
import * as Constant from "../../style/constant";
import Icon from 'react-native-vector-icons/Feather'
import {Actions} from "react-native-router-flux";
import vUserDao from "../../dao/vUserDao";
import ImagePicker from "react-native-image-picker";
import ImagePickerCrop from "react-native-image-crop-picker";
import Toast from '../common/ToastProxy'
import {PersonalBirthdayPage} from "./PersonalBirthdayPage";

const options = {
    title: i18n("Please_choose"),
    cancelButtonTitle: i18n("Cancel"),
    takePhotoButtonTitle: i18n("Take_a_picture"),
    chooseFromLibraryButtonTitle: i18n("Select_from_album"),
    cameraType: 'front',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 1,
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
    }
};

/**
 * 个人资料
 */
class PersonalPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this._showPickerImage = this._showPickerImage.bind(this);
        this.state = {
            userInfo: {},
        }
    }

    componentDidMount() {
        this.initUserInfo();

        this.subscription = DeviceEventEmitter.addListener(Constant.CHANGE_PERSONAL, () => {
            //接收到详情页发送的通知，刷新数据
            this.initUserInfo();
        });
    }

    initUserInfo() {
        vUserDao.localUserInfo().then((res) => {
            this.setState({
                userInfo: res
            });
        })
    }

    componentWillUnmount() {
        this.subscription.remove();
    };

    _title() {
        return i18n("Personal")
    }

    _showPickerImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log(response);
            if (response.didCancel) {
            } else if (response.error) {
                console.log("ImagePicker error-->" + response.error);
            } else {
                ImagePickerCrop.openCropper({
                    width: 400,
                    height: 400,
                    path: response.uri,
                }).then((image) => {
                    console.log(' 图片路径：' + image.path);
                    Actions.LoadingModal({text: i18n("Saving"), backExit: false});
                    vUserDao.updateAvatar(image.path).then((res) => {
                        this.exitLoading();
                        if (res && res.code === 200) {
                            this.state.userInfo.icon = res.data;
                            vUserDao.saveLocalUserInfo(this.state.userInfo).then((res) => {
                                DeviceEventEmitter.emit(Constant.CHANGE_PERSONAL);
                            })
                        } else {
                            Toast(res.message);
                        }
                    });
                });

            }
        })
    }

    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    _reader() {

        let birthView = this.state.userInfo.birthday === Constant.NULL_ ?
            <Text style={[{color: "#C4C4C4"}, styles.middleText]}>{this.state.userInfo.birthday}</Text> :
            <Text style={[{}, styles.middleTexBlackCharter]}>{this.state.userInfo.birthday}</Text>;

        let mobileView = this.state.userInfo.phone === Constant.NULL_ ?
            <Text style={[{color: "#C4C4C4"}, styles.middleText]}>{this.state.userInfo.phone}</Text> :
            <Text style={[{}, styles.middleTexBlackCharter]}>{this.state.userInfo.phone}</Text>;

        let emailView = this.state.userInfo.email === Constant.NULL_ ?
            <Text style={[{color: "#C4C4C4"}, styles.middleText]}>{this.state.userInfo.email}</Text> :
            <Text style={[{}, styles.middleTexBlackCharter]}>{this.state.userInfo.email}</Text>;

        let dividerView = Constant.APP_TYPE === 1 ? <View/> :
            <View style={styles.dividerLineF6}/>
        let mobView = Constant.APP_TYPE === 1 ? <View/> : <TouchableOpacity
            activeOpacity={this.state.userInfo.phone === Constant.NULL_ ? Constant.activeOpacity : 1}
            style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                paddingVertical: 20,
                paddingLeft: 16,
                paddingRight: 10
            }]}
            onPress={() => {
                if (this.state.userInfo.phone === Constant.NULL_) {
                    Actions.PersonalMobilePage();
                }
            }}>
            <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Mobile_Number")}</Text>

            <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                {mobileView}
                <Icon
                    style={[{marginLeft: 5, opacity: this.state.userInfo.email === Constant.NULL_ ? 1 : 0}]}
                    name={"chevron-right"}
                    backgroundColor={Constant.transparentColor}
                    color={Constant.primaryBlackColor} size={15}/>

            </View>

        </TouchableOpacity>;

        return (
            <View style={styles.flexDirectionColumn}>

                <TouchableOpacity
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {
                        this._showPickerImage()
                    }}>

                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Picture")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <Image style={[{height: 40, width: 40, borderRadius: 20}]}
                               source={{uri: this.state.userInfo.icon}}/>

                        <Icon
                            style={[{marginLeft: 5}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </TouchableOpacity>

                <View style={styles.dividerLineF6}/>

                <TouchableOpacity
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {
                        Actions.PersonalNamePage();
                    }}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Name")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <Text style={[{}, styles.middleTexBlackCharter]}>{this.state.userInfo.nickname}</Text>

                        <Icon
                            style={[{marginLeft: 5}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </TouchableOpacity>

                <View style={styles.dividerLineF6}/>
                <TouchableOpacity
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {
                        Actions.PersonalSexPage();
                    }}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Sexuality")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <Text style={[{}, styles.middleTexBlackCharter]}>{this.state.userInfo.gender}</Text>

                        <Icon
                            style={[{marginLeft: 5}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </TouchableOpacity>
                {dividerView}
                {mobView}
                <View style={styles.dividerLineF6}/>

                <TouchableOpacity
                    activeOpacity={this.state.userInfo.email === Constant.NULL_ ? Constant.activeOpacity : 1}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {
                        if (this.state.userInfo.email === Constant.NULL_) {
                            Actions.PersonalEmailPage();
                        }
                    }}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Email_address")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        {emailView}
                        <Icon
                            style={[{marginLeft: 5, opacity: this.state.userInfo.email === Constant.NULL_ ? 1 : 0}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </TouchableOpacity>

                <View style={styles.dividerLineF6}/>

                <TouchableOpacity
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={() => {
                        if (this.state.userInfo.birthday === Constant.NULL_) {
                            Actions.PersonalBirthdayPage();
                        } else {
                            Actions.PersonalBirthdayPage({birthday: this.state.userInfo.birthday});
                        }
                    }}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Birthday")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        {birthView}

                        <Icon
                            style={[{marginLeft: 5}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </TouchableOpacity>


                <View style={styles.dividerLineF6}/>


            </View>
        )
    }
}

export default PersonalPage
