import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Easing,
    Image,
    ImageBackground,
    InteractionManager, TouchableOpacity, Alert, DeviceEventEmitter
} from 'react-native';

import {RNCamera} from 'react-native-camera'
import {Actions} from 'react-native-router-flux';
import product from "../../store/actions/product";
import BaseTitlePage from "../widget/BaseTitlePage";
import AntiFakePage from "./AntiFakePage";
import Toast from '../common/ToastProxy';
import Icon from "react-native-vector-icons/Feather";
import * as Constant from "../../style/constant";
import styles, {screenWidth, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import {readerQR} from "react-native-lewin-qrcode";
import * as Config from "../../config";
import productDao from "../../dao/productDao";
import vUserDao from "../../dao/vUserDao";

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
        this.subscription = DeviceEventEmitter.addListener(Constant.CHANGE_PERSONAL, () => {
            //接收到详情页发送的通知，刷新数据
            this.parseCode(this.lastCodeStr);
        });
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.startAnimation();
        })
    }

    componentWillUnmount() {
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

        if (e.type === "QR_CODE") { //二维码
            this.parseCode(e.data);
        }
    }

    parseCode(codeStr) {

        this.lastCodeStr = codeStr;

        this.setState({
            show: false
        });


        if (codeStr.indexOf("authentication") !== -1) {
            vUserDao.isLoginAsync().then((res) => {
                if (res) {
                    this.recognizeCode(codeStr);
                } else {
                    Actions.LoginPage();
                }
            })
        } else {
            this.recognizeCode(codeStr);
        }

    }

    recognizeCode(codeStr) {
        Actions.LoadingModal({backExit: false});
        product.authentication(codeStr).then((res) => {
            this.exitLoading();

            if (res.code && (res.code === 200 || res.code === 410 || res.code === 208)) {
                if (codeStr.indexOf("tracing") !== -1) {
                    // Actions.ProductHistoryPage({"responseStr": JSON.stringify(res.data)});
                    Actions.replace("ProductHistoryPage", {"responseStr": JSON.stringify(res.data)});
                } else {
                    // Actions.popAndPush("AntiFakePage", {"responseStr": JSON.stringify(res.data)});
                    Actions.replace("AntiFakePage", {"responseStr": JSON.stringify(res.data), code: res.code});
                }
            } else {
                Toast(i18n("illegalCodeTip"));
                Actions.pop();
            }

        })
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
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
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

                    <View style={[styles.absoluteFull, styles.flexDirectionRowNotFlex,]}>
                        <TouchableOpacity
                            style={[{height: 25, width: 25, marginTop: statusHeight, marginLeft: 15}]}
                            activeOpacity={Constant.activeOpacity}
                            onPress={() => {
                                Actions.pop();
                            }}>
                            <Image source={require("../../img/icon_back_white.png")}
                                   style={[{height: 25, width: 25},]}/>
                        </TouchableOpacity>

                        <View style={[styles.flexDirectionRow, styles.justifyEnd, {
                            marginTop: statusHeight,
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