/**
 * Created by mai on 2017/11/7.
 */

import React, {Component} from 'react';
import {
    View, Image, StatusBar, Platform, Animated, Easing, Text
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles, {screenHeight, screenWidth} from "../style"
import * as Constant from "../style/constant"
import SplashScreen from './widget/native/SplashNative'
import * as constant from "../style/constant"
import vUserDao from "../dao/vUserDao";
import toast from "./common/ToastProxy";

/**
 * 欢迎页
 */
class WelcomePage extends Component {

    constructor(props) {
        super(props);
        this.toNext = this.toNext.bind(this);
    }


    componentDidMount() {
        //处理白屏
        if (Platform.OS === 'android') {
            SplashScreen.hide();
        }
        this.toNext()
    }


    toNext(res) {
        setTimeout(() => {
            vUserDao.login("test", "test").then((res) => {
                if (res.code === 200) {
                    return vUserDao.userinfo();
                } else {
                    toast("Login fail");
                    return null;
                }
            }).then((res) => {
                if (res.code === 200) {
                    Actions.reset("root");
                } else {
                    toast("Login fail");
                }
            })

        }, 2000);
    }

    render() {
        return (
            <View style={[styles.mainBox, {backgroundColor: Constant.white}]}>
                <StatusBar hidden={true}/>
                <View style={[styles.centered, {flex: 1}]}>
                    <Image source={require("../img/logo.png")}
                           resizeMode={"stretch"}
                           style={{width: 150, height: 100}}/>
                    <View
                        style={[styles.absoluteFull, styles.centered, {justifyContent: "flex-end"}, {marginBottom: 61}]}>
                        <Text
                            style={[styles.subSmallText, {fontSize: constant.minTextSize}]}>www.viverify.com</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default WelcomePage
