/**
 * Created by mai on 2017/11/7.
 */

import React, {Component} from 'react';
import {
    View, Image, StatusBar, Platform, Animated, Easing, Text
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles, {screenHeight, screenWidth} from "../style"
import I18n from '../style/i18n'
import loginActions from '../store/actions/login'
import userActions from '../store/actions/user'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Constant from "../style/constant"
import SplashScreen from './widget/native/SplashNative'
import LottieView from 'lottie-react-native';
import * as constant from "../style/constant"

/**
 * 欢迎页
 */
class WelcomePage extends Component {

    constructor(props) {
        super(props);
        this.toNext = this.toNext.bind(this);
        this.state = {
            progress: new Animated.Value(0),
        };
    }


    componentDidMount() {
        //处理白屏
        if (Platform.OS === 'android') {
            SplashScreen.hide();
        }
        this.toNext()
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
        }).start();
    }


    toNext(res) {
        setTimeout(() => {
            Actions.reset("root");
        }, 2100);
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
