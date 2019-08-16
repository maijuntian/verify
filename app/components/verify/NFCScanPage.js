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
import AnalyticsUtil from "../../utils/AnalyticsUtil";
import toast from "../common/ToastProxy";
import NfcManager, {Ndef, ByteParser} from 'react-native-nfc-manager';
import {loginPage} from "../../utils/PageUtils";
import product from "../../store/actions/product";

/**
 * 登录
 */
class NFCScanPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this._startNfc = this._startNfc.bind(this);
    }

    _title() {
        return i18n("Scan");
    }

    componentDidMount() {
      /*  NfcManager.isSupported()
            .then(supported => {
                if (supported) {
                    this._startNfc();
                }
            })*/
    }


    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    componentWillUnmount() {
        AnalyticsUtil.onPageEnd("NFCScanPage");
        this._stopDetection();
    }

    componentWillMount() {
        AnalyticsUtil.onPageBegin("NFCScanPage");
    }

    _reader() {

        return (
            <View style={[styles.flexDirectionColumn, styles.centerH]}>
                <View style={[styles.flexDirectionRowNotFlex, {marginTop: 82,}]}>
                    <Text style={[{color: "#666666", fontSize: 14}]}>{i18n("scan_tip1")}</Text>
                    <Image style={[{height: 23, width: 36}]}
                           source={require("../../img/nfc_img2.png")}/>
                    <Text style={[{color: "#666666", fontSize: 14}]}>  {i18n("scan_tip2")}</Text>
                </View>

                <Text style={[{color: "#666666", fontSize: 14}]}>  {i18n("scan_tip3")}</Text>

                <Image style={[{
                    height: screenWidth * 0.88 * 1.03869,
                    width: screenWidth * 0.88,
                    marginLeft: screenWidth * 0.12,
                    marginTop: 10
                }]}
                       source={require("../../img/nfc_img1.png")}/>
            </View>
        )
    }


    _startNfc() {
        NfcManager.start({
            onSessionClosedIOS: () => {
                console.log('ios session closed');
            }
        })
            .then(result => {
                console.log('start OK', result);
                this._startDetection();
            })
            .catch(error => {
                console.warn('start fail', error);
            })

        if (Platform.OS === 'android') {
            NfcManager.getLaunchTagEvent()
                .then(tag => {
                    console.log('launch tag', tag);
                    if (tag) {
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            NfcManager.isEnabled()
                .then(enabled => {
                })
                .catch(err => {
                    console.log(err);
                })
            NfcManager.onStateChanged(
                event => {
                    if (event.state === 'on') {
                    } else if (event.state === 'off') {
                    } else if (event.state === 'turning_on') {
                        // do whatever you want
                    } else if (event.state === 'turning_off') {
                        // do whatever you want
                    }
                }
            )
                .then(sub => {
                    this._stateChangedSubscription = sub;
                    // remember to call this._stateChangedSubscription.remove()
                    // when you don't want to listen to this anymore
                })
                .catch(err => {
                    console.warn(err);
                })
        }
    }

    _onTagDiscovered = tag => {
        console.log('Tag Discovered', tag);

        if (tag.ndefMessage && tag.ndefMessage.length > 0) {
            tag.ndefMessage[0].payload.splice(0, 1);
            let uri = ByteParser.byteToString(tag.ndefMessage[0].payload);
            console.log('Tag Discovered2', uri);
            this.parseCode("https://" + uri);
        }
    };


    _startDetection = () => {
        NfcManager.registerTagEvent(this._onTagDiscovered)
            .then(result => {
                console.log('registerTagEvent OK', result)
            })
            .catch(error => {
                console.warn('registerTagEvent fail', error)
            })
    }

    _stopDetection = () => {
        NfcManager.unregisterTagEvent()
            .then(result => {
                console.log('unregisterTagEvent OK', result)
            })
            .catch(error => {
                console.warn('unregisterTagEvent fail', error)
            })
    }


    parseCode(codeStr) {
        console.log("uri-->" + codeStr);
        this.lastCodeStr = codeStr;

        if (codeStr.indexOf("/a/") !== -1) {
            vUserDao.isLoginAsync().then((res) => {
                if (res) {
                    this.recognizeCode(codeStr);
                } else {
                    loginPage();
                }
            })
        } else {
            this.recognizeCode(codeStr);
        }

    }

    recognizeCode(codeStr) {
        if (codeStr.indexOf("viverify.com") !== -1) {
            Actions.LoadingModal({backExit: false});
            product.authentication(codeStr).then((res) => {
                this.exitLoading();

                if (res.code && (res.code === 200 || res.code === 410 || res.code === 208)) {
                    if (codeStr.indexOf("/u/") !== -1) {
                        vUserDao.isLoginAsync().then((res2) => {
                            if (res2) {
                                Actions.replace("ProductHistoryAntiFakePage", {
                                    "responseStr": JSON.stringify(res.data),
                                    code: res.code
                                });
                            } else {
                                Actions.replace("ProductHistoryPage2", {
                                    "responseStr": JSON.stringify(res.data),
                                    code: res.code
                                });
                            }
                        })
                    } else if (codeStr.indexOf("/t/") !== -1) {
                        // Actions.ProductHistoryPage({"responseStr": JSON.stringify(res.data)});
                        Actions.replace("ProductHistoryPage", {
                            "responseStr": JSON.stringify(res.data),
                            code: res.code
                        });
                    } else {
                        // Actions.popAndPush("AntiFakePage", {"responseStr": JSON.stringify(res.data)});
                        Actions.replace("ProductHistoryAntiFakePage", {
                            "responseStr": JSON.stringify(res.data),
                            code: res.code
                        });
                    }
                } else {
                    Toast(i18n("illegalCodeTip"));
                    Actions.pop();
                }

            })
        } else {
            Toast(i18n("illegalCodeTip"));
            Actions.pop();
        }
    }
}

export default NFCScanPage
