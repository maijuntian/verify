import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Easing,
    Image,
    ImageBackground,
    Linking,
    NativeModules,
    InteractionManager, TouchableOpacity, Alert, DeviceEventEmitter, Platform
} from 'react-native';

import {RNCamera} from 'react-native-camera'
import {Actions} from 'react-native-router-flux';
import product from "../../store/actions/product";
import BaseTitlePage from "../widget/BaseTitlePage";
import AntiFakePage from "./AntiFakePage";
import Toast from '../common/ToastProxy';
import Icon from "react-native-vector-icons/Feather";
import * as Constant from "../../style/constant";
import styles, {navBarHeight, screenWidth, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import {readerQR} from "react-native-lewin-qrcode";
import * as Config from "../../config";
import productDao from "../../dao/productDao";
import vUserDao from "../../dao/vUserDao";
import {loginPage} from "../../utils/PageUtils";
import AnalyticsUtil from "../../utils/AnalyticsUtil";
import CommonTitleBar from "../common/CommonTitleBar";

var ImagePicker = require('react-native-image-picker');


class ScanQrCodePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            animate: new Animated.Value(0), // 二维坐标{x:0,y:0}
        }
        this._openPhoto = this._openPhoto.bind(this);
    }

    componentWillMount() {
        AnalyticsUtil.onPageBegin("ScanQrCodePage");
        this.subscription = DeviceEventEmitter.addListener(Constant.CHANGE_PERSONAL, () => {
            //接收到详情页发送的通知，刷新数据
            this.parseCode(this.lastCodeStr);
        });
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.startAnimation();
        });

        // this.parseCode("https://api.viverify.com/source/authentication/union/testtesttesttesttesttesttesttest");
    }

    componentWillUnmount() {
        AnalyticsUtil.onPageEnd("ScanQrCodePage");
        this.state.show = false;
        this.subscription.remove();
    }

    // 动画开始
    startAnimation() {
        if (this.state.show) {
            this.state.animate.setValue(0);
            Animated.timing(this.state.animate, {
                toValue: 1,   // 运动终止位置，比值
                duration: 2500,  // 动画时长
                easing: Easing.linear,  // 线性的渐变函数
                delay: 0.5,// 在一段时间之后开始动画（单位是毫秒），默认为0
            }).start(() => this.startAnimation())
        }
    }

    _openPhoto() {
        console.log('ImagePicker');
        ImagePicker.launchImageLibrary({}, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                if (response.uri) {
                    var path = response.path;
                    if (!path) {
                        path = response.uri;
                    }
                    readerQR(path).then((data) => {
                        console.log("picCode-->" + data);
                        this.parseCode(data);
                    }).catch((err) => {
                        console.log("error-->" + err);
                        Toast(i18n("illegalCodeTip"));
                        Actions.pop();
                    });

                }
            }
        });
    }


    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    barcodeReceived(e) {

        if (!this.state.show) {
            return;
        }
        console.log(e);

        if (e.type === "QR_CODE" || e.type === "org.iso.QRCode") { //二维码
            this.parseCode(e.data);
        }
    }

    parseCode(codeStr) {

        this.lastCodeStr = codeStr;

        this.setState({
            show: false
        });


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


    render() {
        let showF = this.props.show || null;
        console.log("--->" + showF);

        let sWidth = screenWidth * 2 / 3;
        return (
            <View style={[styles.flex,]}>
                <RNCamera
                    onBarCodeRead={this.barcodeReceived.bind(this)}
                    onCameraReady={() => {
                        console.log('ready')
                    }}
                    captureAudio={false}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    notAuthorizedView={<View style={[styles.mainBox]}>
                        <CommonTitleBar title={""}
                                        onLeftPress={() => {
                                            Actions.pop();
                                        }}
                                        onRightPress={null}/>
                        <View style={[styles.flexDirectionColumn, styles.centerH, {paddingHorizontal: 40}]}>
                            <Text style={[styles.normalTextBlack, {marginTop: 180}]}>{i18n("cameraTip1")}</Text>
                            <Text style={[styles.minTextsGray, {marginTop: 5}]}>{i18n("cameraTip2")}</Text>
                            <TouchableOpacity
                                activeOpacity={Constant.activeOpacity}
                                onPress={() => {
                                    if (Platform.OS === 'ios') {
                                        Linking.openURL('app-settings:')
                                            .catch(err => console.log('error', err))
                                    } else {
                                        NativeModules.OpenSettings.openNetworkSettings();
                                    }

                                }}>
                                <Text style={[styles.smallText, {
                                    color: Constant.actionBlue,
                                    marginTop: 50
                                }]}>{i18n("cameraTip3")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                    style={styles.flex}>

                    <View style={[styles.flex, styles.centered,]}>
                        <ImageBackground source={require("../../img/shape_scan.png")}
                                         style={[{width: sWidth, height: sWidth}]}>
                            <Animated.View style={{
                                alignItems: 'center',
                                transform: [{
                                    // translateX: x轴移动
                                    // translateY: y轴移动
                                    translateY: this.state.animate.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, sWidth]
                                    })
                                }]
                            }}>
                                <Text style={{width: sWidth, height: 1, backgroundColor: '#00ff00'}}></Text>
                            </Animated.View>
                        </ImageBackground>
                    </View>

                    <View style={[{
                        height: navBarHeight,
                        paddingTop: statusHeight
                    }, styles.absoluteFull, styles.centerH, styles.flexDirectionRowNotFlex,]}>
                        <TouchableOpacity
                            style={[{height: 25, width: 25, marginLeft: 15}]}
                            activeOpacity={Constant.activeOpacity}
                            onPress={() => {
                                Actions.pop();
                            }}>
                            <Image source={require("../../img/icon_back_white.png")}
                                   style={[{height: 25, width: 25},]}/>
                        </TouchableOpacity>

                        <View style={[styles.flexDirectionRow, styles.justifyEnd, {
                            marginRight: 15
                        }]}>

                            <TouchableOpacity onPress={this._openPhoto}>
                                <Text style={[{
                                    color: Constant.white,
                                    fontSize: Constant.smallTextSize
                                }]}>{i18n("Album")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RNCamera>

            </View>
        );
    }
}

export default ScanQrCodePage