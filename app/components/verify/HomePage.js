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
    Platform,
    PushNotificationIOS,
    Linking,
    DeviceEventEmitter, NativeModules
} from "react-native";
import {IDFA} from 'react-native-idfa';
import styles, {screenHeight, screenWidth, statusHeight} from "../../style";
import * as Constant from "../../style/constant";
import CommonIconNameItem from "../common/CommonIconNameItem";
import {Actions} from 'react-native-router-flux';
import I18n from "../../style/i18n";
import vUserDao from "../../dao/vUserDao";
import SplashScreen from "../widget/native/SplashNative";
import product from "../../store/actions/product";
import Toast from "../common/ToastProxy";
import LoginPage from "./LoginPage";
import {loginPage} from "../../utils/PageUtils";
import AnalyticsUtil from "../../utils/AnalyticsUtil";
import toast from "../common/ToastProxy";
import DeviceInfo from "react-native-device-info";

var Geolocation = require('Geolocation');

/**
 * 主页
 */
class HomePage extends Component {

    constructor(props) {
        super(props);
        this._handleOpenURL = this._handleOpenURL.bind(this);
    }

    componentWillMount() {
        this.subscription = DeviceEventEmitter.addListener(Constant.CHANGE_PERSONAL, () => {
            //接收到详情页发送的通知，刷新数据
            if (this.linkingUrl)
                this.parseCode(this.linkingUrl);
        });

        AnalyticsUtil.onPageBegin("HomePage");

        if (Platform.OS === 'ios') {
            PushNotificationIOS.requestPermissions();
        }
    }

    componentWillUnmount() {
        AnalyticsUtil.onPageEnd("HomePage");
        Linking.removeEventListener('url', this._handleOpenURL);
    }

    _handleOpenURL(event) {
        this.linkingUrl = event.url.split("code=")[1];
        this.parseCode(this.linkingUrl);
    }

    componentDidMount() {
        Linking.addEventListener('url', this._handleOpenURL);
        Linking.getInitialURL().then((url) => {
            if (url) {
                this.linkingUrl = url.split("code=")[1];
                this.parseCode(this.linkingUrl);
            }
        }).catch(err => console.error('An error occurred', err));
        this.checkVersion();
        this.getLocation();

        Constant.DEVICE_ID = DeviceInfo.getUniqueID();
        console.log("DEVICE_ID--->" + Constant.DEVICE_ID);
        /* if (Platform.OS === 'ios') {
             IDFA.getIDFA().then((idfa) => {
                 console.log("idfa--->" + idfa);
                 Constant.DEVICE_ID = idfa;
             })
                 .catch((e) => {
                     console.error(e);
                 });
         } else {
             const IMEI = require('react-native-imei');
             IMEI.getImei().then(imeiList => {
                 console.log("imeiList--->" + imeiList);
                 Constant.DEVICE_ID = imeiList;
             });
         }*/
    }


    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    //获取位置
    getLocation() {
        Geolocation.getCurrentPosition(
            location => {
                Constant.longitude = location.coords.longitude;
                Constant.latitude = location.coords.latitude;
                var result = "速度：" + location.coords.speed +
                    "\n经度：" + location.coords.longitude +
                    "\n纬度：" + location.coords.latitude +
                    "\n准确度：" + location.coords.accuracy +
                    "\n行进方向：" + location.coords.heading +
                    "\n海拔：" + location.coords.altitude +
                    "\n海拔准确度：" + location.coords.altitudeAccuracy +
                    "\n时间戳：" + location.timestamp;
                console.log(result);
            },
            error => {
                console.log("获取位置失败：" + error)
            }
        );
    }

    parseCode(codeStr) {
        console.log('schema url is: ' + codeStr);
        if (codeStr.indexOf("/a/") !== -1) {
            vUserDao.isLoginAsync().then((res) => {
                if (res) {
                    this.recognizeCode(codeStr);
                } else {
                    loginPage();
                }
            });
        } else {
            this.recognizeCode(codeStr);
        }

    }

    recognizeCode(codeStr) {
        if (codeStr.indexOf("viverify.com") !== -1) {
            Actions.LoadingModal({backExit: false});
            product.authentication(codeStr).then((res) => {
                this.exitLoading();
                this.linkingUrl = null;
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
                        Actions.ProductHistoryPage({
                            "responseStr": JSON.stringify(res.data),
                            code: res.code
                        });
                    } else {
                        // Actions.popAndPush("AntiFakePage", {"responseStr": JSON.stringify(res.data)});
                        Actions.AntiFakePage({"responseStr": JSON.stringify(res.data), code: res.code});
                    }
                } else {
                    Toast(I18n("illegalCodeTip"));
                }

            })
        } else {
            Toast(I18n("illegalCodeTip"));
        }
    }


    checkVersion() {
        if (Platform.OS === 'ios') {
            NativeModules.upgrade.upgrade(Constant.APPLE_ID, (msg) => {
                if ('YES' === msg) {
                    PushNotificationIOS.setApplicationIconBadgeNumber(1);
                    vUserDao.saveVersionUrl(msg).then((res) => {
                            console.log("保存>>" + res);
                            DeviceEventEmitter.emit(Constant.CHANGE_VERSION);
                        }
                    );
                } else {
                    vUserDao.removeVersionUrl().then((res) => {
                            DeviceEventEmitter.emit(Constant.CHANGE_VERSION);
                        }
                    );
                    PushNotificationIOS.setApplicationIconBadgeNumber(0);
                }
            })
        } else {
            vUserDao.version(DeviceInfo.getVersion()).then((res) => {
                if (res.code === 200) {
                    if (!res.data.latest) {

                        vUserDao.saveVersionUrl(res.data.androidUrl).then((res) => {
                                console.log("保存>>" + res);
                            }
                        );

                        DeviceEventEmitter.emit(Constant.CHANGE_VERSION);

                        if (res.data.force) { //强制更新
                            this._showUpgradeForce(res);
                        } else if (res.data.notifiy) { //需要提醒
                            //确认是否提醒过了
                            vUserDao.hasAlarmVersion(res.data.version).then((res2) => {
                                if (res2) {
                                    console.log("已经提醒过更新--->" + res2);
                                } else {
                                    //没提醒过
                                    vUserDao.saveAlarmVersion(res.data.version).then((res3) => {
                                            console.log("保存2>>" + res3);
                                        }
                                    );
                                    this._showUpgrade(res);
                                }
                            })
                        }
                    } else {
                        console.log("已经是最新版本--->");
                        vUserDao.removeVersionUrl().then((res) => {
                                console.log("删除>>" + res);
                                DeviceEventEmitter.emit(Constant.CHANGE_VERSION);
                            }
                        );
                    }
                }
            });
        }
    }

    _showUpgrade(res) {

        Actions.CommonConfirmModal2({
            text: res ? res.message : I18n("version_tip"),
            backExit: true,
            text_ok: I18n("Update"),
            text_cancel: I18n("Later"),
            confirmFun: () => {
                if (Platform.OS === 'ios') {
                    //跳转到APP Stroe
                    NativeModules.upgrade.openAPPStore(this.state.APPLE_ID);
                } else {
                    NativeModules.upgrade.upgrade(res.data.androidUrl);
                }
            }
        });
    }

    _showUpgradeForce(res) {

        Actions.CommonConfirmModal3({
            text: res ? res.message : I18n("version_tip"),
            backExit: false,
            text_ok: I18n("Update"),
            confirmFun: () => {
                if (Platform.OS === 'ios') {
                    //跳转到APP Stroe
                    NativeModules.upgrade.openAPPStore(this.state.APPLE_ID);
                } else {
                    NativeModules.upgrade.upgrade(res.data.androidUrl);
                }
                SplashScreen.exit();
            }
        });
    }

    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    render() {
        let logoImage = Constant.APP_TYPE === 2 ? require("../../img/logo_cn.png") : require("../../img/logo.png");

        let iconWidth = screenWidth * 0.417;
        let iconHeight = iconWidth * 0.6111;

        let secondBtn = /* Constant.APP_TYPE === 1 ?
            <View style={[{marginTop: 70, marginLeft: 16, marginRight: 16}, styles.flexDirectionRowNotFlex]}>

                <CommonIconNameItem
                    itemStyle={[styles.flex, styles.centered,]}
                    iconIndex={"0"}
                    itemTitle={I18n("anti_fake")}
                    onItemPress={() => {
                        Actions.jump("ScanQrCodePage");
                    }}/>
                <CommonIconNameItem
                    itemStyle={[styles.flex, styles.centered,]}
                    iconIndex={"1"}
                    itemTitle={I18n("Code_Authentication")}
                    onItemPress={() => {
                        Actions.jump("ScanQrCodePage");
                    }
                    }
                />
            </View> : */<View
            style={[{marginTop: 70, marginLeft: 16, marginRight: 16}, styles.flexDirectionRowNotFlex]}>

            <CommonIconNameItem
                itemStyle={[styles.flex, styles.centered,]}
                iconIndex={"1"}
                itemTitle={I18n("Code_Authentication")}
                onItemPress={() => {
                    Actions.jump("ScanQrCodePage");
                }
                }
            />
            <CommonIconNameItem
                itemStyle={[styles.flex, styles.centered,]}
                iconIndex={"2"}
                itemTitle={I18n("nfc_anti_fake")}
                onItemPress={() => {
                    Actions.jump("NFCScanPage");
                }}/>
        </View>;

        return (
            <View style={[styles.mainBox, styles.centerH]}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'dark-content'}/>
                <Image source={logoImage}
                       resizeMode={"stretch"}
                       style={[{height: iconHeight, width: screenWidth * 0.417, marginTop: 100 + statusHeight}]}/>

                {secondBtn}

                <View
                    style={[styles.absoluteFull, styles.centered, {
                        zIndex: -999,
                        justifyContent: "flex-end"
                    }, {marginBottom: 40}]}>
                    <Text style={[{color: "#C4C4C4", fontSize: 12}]}>{I18n("home_tip")}</Text>
                </View>
            </View>
        )
    }
}

export default HomePage
