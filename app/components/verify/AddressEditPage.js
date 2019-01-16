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
class AddressEditPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            addressStr: this.props.addressStr,
            id: "",
            address: "",
            contacts: "",
            defaultB: true,
            phone: "",
        }
    }

    componentDidMount() {
        if (this.state.addressStr !== null && this.state.addressStr !== "") {
            let address = JSON.parse(this.state.addressStr);
            this.setState({
                id: address.id,
                address: address.address,
                contacts: address.contacts,
                defaultB: address.default,
                phone: address.phone,
            })
        }
    }

    _title() {
        return i18n("Receiving_address");
    }


    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    _save() {
        Actions.LoadingModal({text: i18n("Saving"), backExit: false});
        vUserDao.saveAddress({
            id: this.state.id,
            address: this.state.address,
            contacts: this.state.contacts,
            default: this.state.defaultB,
            phone: this.state.phone,
        }).then((res) => {
            this.exitLoading();
            if (res.code === 200) {
                DeviceEventEmitter.emit(Constant.CHANGE_ADDRESS);
                Actions.pop();
            } else {
                Toast(res.message);
            }
        });
    }

    _delete() {
        Actions.LoadingModal({text: i18n("Deleting"), backExit: false});
        vUserDao.deleteAddress(
            this.state.id
        ).then((res) => {
            this.exitLoading();
            if (res.code === 200) {
                DeviceEventEmitter.emit(Constant.CHANGE_ADDRESS);
                Actions.pop();
            } else {
                Toast(res.message);
            }
        });
    }

    _reader() {

        let switchIcon = this.state.defaultB ? require("../../img/switch_on.png") : require("../../img/switch_off.png");

        let editView;

        if (this.state.id === null || this.state.id === "") {
            editView = <View style={[{paddingHorizontal: 36, paddingVertical: 14,},]}>

                <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                  onPress={() => {
                                      this._save();
                                  }}>

                    <View style={[{
                        borderWidth: 1,
                        borderRadius: 20,
                        paddingVertical: 10,
                        borderColor: Constant.textGray,
                    }, styles.flexDirectionRowNotFlex, styles.centered]}>
                        <Text style={[{
                            color: Constant.grayBlue,
                            fontSize: Constant.smallTextSize
                        }]}>{i18n("Save")}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        } else {
            editView = <View style={[{paddingHorizontal: 22, paddingVertical: 14,}, styles.flexDirectionRowNotFlex]}>

                <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                  onPress={() => {
                                      this._delete();
                                  }}>

                    <View style={[{
                        borderWidth: 1,
                        borderRadius: 20,
                        paddingVertical: 10,
                        width: (screenWidth - 72) / 2,
                        borderColor: Constant.textGray,
                    }, styles.flexDirectionRowNotFlex, styles.centered]}>
                        <Text style={[{
                            color: "red",
                            fontSize: Constant.smallTextSize
                        }]}>{i18n("Delete")}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                  onPress={() => {
                                      this._save();
                                  }}>

                    <View style={[{
                        borderWidth: 1,
                        borderRadius: 20,
                        marginLeft: 28,
                        paddingVertical: 10,
                        width: (screenWidth - 72) / 2,
                        borderColor: Constant.textGray,
                    }, styles.flexDirectionRowNotFlex, styles.centered]}>
                        <Text style={[{
                            color: Constant.grayBlue,
                            fontSize: Constant.smallTextSize
                        }]}>{i18n("Save")}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        }

        return (
            <View style={[{backgroundColor: "white"}, styles.flexDirectionColumn]}>


                <View style={styles.dividerLineF6}/>

                <View
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 20,
                    }]}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}
                          multiline={true}>{i18n("Address")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <TextInput
                            style={[styles.middleTexBlackCharter, {
                                width: 200,
                                textAlign: "right",
                            }]}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({address: text})}
                            value={this.state.address}>
                        </TextInput>
                        <Icon
                            style={[{marginLeft: 12}]}
                            name={"chevron-right"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={15}/>

                    </View>

                </View>


                <View style={styles.dividerLineF6}/>

                <View
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 20,
                    }]}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Contacts")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <TextInput
                            style={[styles.middleTexBlackCharter, {
                                width: 200,
                                textAlign: "right",
                            }]}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({contacts: text})}
                            value={this.state.contacts}>
                        </TextInput>

                    </View>

                </View>

                <View style={styles.dividerLineF6}/>

                <View
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 20,
                    }]}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Phone")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <TextInput
                            style={[styles.middleTexBlackCharter, {
                                width: 200,
                                textAlign: "right",
                            }]}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => {
                                const newText = text.replace(/[^\d]+/, '');
                                this.setState({phone: newText})
                            }}
                            keyboardType={"phone-pad"}
                            value={this.state.phone}>
                        </TextInput>

                    </View>

                </View>

                <View style={styles.dividerLineF6}/>


                <View
                    activeOpacity={Constant.activeOpacity}
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingVertical: 20,
                        paddingLeft: 16,
                        paddingRight: 20,
                    }]}>
                    <Text style={[{color: Constant.gray9d, fontSize: 14}]}>{i18n("Set_as_default")}</Text>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>

                        <TouchableOpacity
                            activeOpacity={Constant.activeOpacity}
                            onPress={() => {
                                this.setState({defaultB: !this.state.defaultB})
                            }}>

                            <Image
                                style={[{
                                    width: 60,
                                    height: 30,
                                }]}
                                source={switchIcon}>
                            </Image>

                        </TouchableOpacity>

                    </View>

                </View>

                <View style={styles.dividerLineF6}/>
                <View style={[styles.flexDirectionColumn, styles.justifyEnd]}>


                    {editView}

                </View>
            </View>
        )
    }
}

export default AddressEditPage
