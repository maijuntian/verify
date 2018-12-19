/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, StatusBar, TouchableOpacity, FlatList} from "react-native";
import styles, {screenHeight, statusHeight} from "../../style";
import BaseTitlePage from "../widget/BaseTitlePage";
import i18n from "../../style/i18n";
import * as Constant from "../../style/constant";
import Icon from 'react-native-vector-icons/Feather'
import {Actions} from "react-native-router-flux";
import vUserDao from "../../dao/vUserDao";
import ImagePicker from "react-native-image-picker";

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
    allowsEditing: false,
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
    }

    _title() {
        return i18n("Personal")
    }

    initUserInfo() {
        vUserDao.localUserInfo().then((res) => {
            this.setState({
                userInfo: res
            });
        })
    }

    _showPickerImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log(response);
            if (response.didCancel) {
            } else if (response.error) {
                console.log("ImagePicker error-->" + response.error);
            } else {
                console.log("ImagePicker uri-->" + response.uri);
                console.log("ImagePicker data-->" + response.data);
            }
        })
    }

    _reader() {

        return (
            <View style={styles.flexDirectionColumn}>

                <TouchableOpacity
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 10
                    }]}
                    onPress={this._showPickerImage()}>

                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Picture")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <Image style={[{height: 40, width: 40, borderRadius: 20}]}
                               source={{uri: this.state.userInfo.icon}}/>

                        <Icon
                            style={[{marginLeft: 12}]}
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
                            style={[{marginLeft: 12}]}
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

                        <Text style={[{}, styles.middleTexBlackCharter]}>{this.state.userInfo.sex}</Text>

                        <Icon
                            style={[{marginLeft: 12}]}
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

                    }}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Birthday")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <Text style={[{}, styles.middleTexBlackCharter]}>{this.state.userInfo.birthday}</Text>

                        <Icon
                            style={[{marginLeft: 12}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </TouchableOpacity>

                <View style={styles.dividerLineF6}/>

                <View style={[styles.flexDirectionColumn, styles.justifyEnd]}>

                    <TouchableOpacity
                        activeOpacity={Constant.activeOpacity}
                        style={[{
                            marginHorizontal: 36,
                            marginBottom: 16,
                            borderColor: "#D7D7D7",
                            borderWidth: 1,
                            borderRadius: 20,
                            paddingVertical: 10,
                        }, styles.centered]} onPress={() => {

                    }}>
                        <Text style={[{color: "#F26262", fontSize: 14,}]}>{i18n("Sign_out")}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

export default PersonalPage
