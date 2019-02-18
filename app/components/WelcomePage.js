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
            let i = 1/0;
            vUserDao.isLoginAsync().then((res)=>{
                if(res){
                    console.log("开始获取用户信息---》");
                    return vUserDao.userinfo();
                } else {
                    Actions.reset("root");
                    return null;
                }
            }).then((res)=>{
                Actions.reset("root");
            });
        }, 2000);
    }

    render() {
        let iconWidth = screenWidth * 0.417;
        let iconHeight = iconWidth * 0.6111;
        return (
            <View style={[styles.mainBox, {backgroundColor: Constant.white}]}>
                <StatusBar hidden={true}/>
                <View style={[styles.centered, {flex: 1}]}>
                    <Image source={require("../img/logo.png")}
                           resizeMode={"stretch"}
                           style={{width: iconWidth, height: iconHeight}}/>
                    <View
                        style={[styles.absoluteFull, styles.centered, {justifyContent: "flex-end"}, {marginBottom: 61}]}>
                        <Text
                            style={[styles.subSmallText, {fontSize: constant.smallTextSize}]}>www.viverify.com</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default WelcomePage
