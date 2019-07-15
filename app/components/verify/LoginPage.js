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
    TextInput,
    Keyboard,
    DeviceEventEmitter
} from "react-native";
import styles, {navBarHeight, screenHeight, screenWidth, statusHeight} from "../../style";
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {statusCodes as StatusCodes} from "react-native-google-signin/src/GoogleSignin";
import i18n from "../../style/i18n";
import * as constant from "../../style/constant";
import {Actions} from "react-native-router-flux";
import vUserDao from "../../dao/vUserDao";
import Toast from '../../components/common/ToastProxy';
import Icon from "react-native-vector-icons/Feather";
import toast from "../common/ToastProxy";
import {home} from "../../utils/PageUtils";
import {LocaleConfig} from "react-native-calendars";
import AnalyticsUtil from "../../utils/AnalyticsUtil";


GoogleSignin.configure({
    webClientId: '658458075290-685fam0cumnkbc2vg4nhcosm1q79gulu.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '658458075290-1dds00hpcodmqokcmpsh8h32kftuicku.apps.googleusercontent.com',
});

/**
 * 登录
 */
class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: "",
            password: "",
            isPwd: true,
        }
    }

    componentWillMount() {
        AnalyticsUtil.onPageBegin("LoginPage");
    }

    componentWillUnmount() {
        AnalyticsUtil.onPageEnd("LoginPage");
    }

    _fbLogin() {
        let that = this;
        FBLoginManager.loginWithPermissions(['public_profile', 'email', 'user_friends'], function (error, data) {
            if (!error) {
                console.log("Login data: " + JSON.stringify(data));
                Actions.LoadingModal({text: i18n("Logining"), backExit: false});

                let params = {};
                params.token = data.credentials.token;
                if (data.profile) {
                    let profile = JSON.parse(data.profile);
                    params.email = profile.email;
                    params.icon = profile.picture.data.url;
                    params.id = profile.id;
                    params.name = profile.name;
                }

                vUserDao.facebookLogin(params).then((res) => {
                    if (res.code === 200) {
                        return vUserDao.userinfo();
                    } else {
                        Toast(res.message);
                        return null;
                    }
                }).then((res) => {
                    that.exitLoading();
                    if (res.code === 200) {
                        DeviceEventEmitter.emit(constant.CHANGE_PERSONAL);
                        home(res.data.region);
                        // Actions.pop();
                    } else {
                        Toast(res.message);
                    }
                })
            } else {
                console.log("Error: ", JSON.stringify(error));
            }
        });
    }

    // Somewhere in your code
    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("test-->" + JSON.stringify(userInfo));
            Actions.LoadingModal({text: i18n("Logining"), backExit: false});
            vUserDao.googleLogin(userInfo).then((res) => {
                if (res.code === 200) {
                    return vUserDao.userinfo();
                } else {
                    Toast(res.message);
                    return null;
                }
            }).then((res) => {
                this.exitLoading();
                if (res.code === 200) {
                    DeviceEventEmitter.emit(constant.CHANGE_PERSONAL);
                    home(res.data.region);
                    // Actions.pop();
                } else {
                    Toast(res.message);
                }
            })
        } catch (error) {
            console.log(error.code);
            if (error.code === StatusCodes.SIGN_IN_CANCELLED) {
                toast(i18n("three_login_cancel"));
            }
        }
    };

    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    render() {

        let iconWidth = screenWidth * 0.417;
        let iconHeight = iconWidth * 0.6111;

        let inputIconWidth = 15;
        let dividerWidth = screenWidth - 76;
        let inputWidth = dividerWidth - inputIconWidth;

        let pwdIcon = this.state.isPwd ? require("../../img/icon_eye_n.png") : require("../../img/icon_eye_s.png");

        return (

            <View style={[{backgroundColor: "#f4f3f4"}, styles.flexDirectionColumn, styles.centerH]}>

                <View style={[{
                    width: screenWidth,
                    height: navBarHeight,
                    paddingTop: statusHeight
                }, styles.centerV]}>
                    <TouchableOpacity
                        style={{marginTop: statusHeight, height: 25, width: 25, marginLeft: 8}}
                        onPress={() => {
                            Actions.pop();
                        }}>
                        <Icon
                            name={"chevron-left"}
                            backgroundColor={constant.transparentColor}
                            color={constant.primaryBlackColor} size={25}
                            style={[styles.centered,]}/>
                    </TouchableOpacity>

                </View>
                <Image source={require("../../img/logo.png")}
                       resizeMode={"stretch"}
                       style={{marginTop: 45, width: iconWidth, height: iconHeight}}/>

                <View style={[{
                    marginTop: 44,
                    marginHorizontal: 25,
                    paddingLeft: 13,
                    paddingRight: 13,
                    paddingVertical: 25,
                    width: screenWidth - 50,
                    borderRadius: 8,
                }, styles.flexDirectionColumnNotFlex, styles.mainBgColor]}>

                    <View style={[styles.flexDirectionRowNotFlex, styles.centerH,]}>
                        <TextInput
                            style={[styles.middleTexBlack, {
                                width: inputWidth,
                                paddingVertical: 5,
                            }]}
                            underlineColorAndroid='transparent'
                            placeholder={i18n("Mobile_number_or_email")}
                            onChangeText={(text) => this.setState({account: text})}
                            value={this.state.account}/>
                        <TouchableOpacity activeOpacity={constant.activeOpacity}
                                          onPress={() => {
                                              this.setState({account: ""})
                                          }}>
                            <Image style={[{height: inputIconWidth, width: inputIconWidth, marginRight: 10}]}
                                   resizeMode={"contain"}
                                   source={require("../../img/icon_clear.png")}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.dividerLineE6, {width: dividerWidth}]}/>

                    <View style={[{marginTop: 15}, styles.flexDirectionRowNotFlex, styles.centerH,]}>
                        <TextInput
                            style={[styles.middleTexBlack, {
                                width: inputWidth,
                                paddingVertical: 5,
                            }]}
                            underlineColorAndroid='transparent'
                            placeholder={i18n("Password")}
                            secureTextEntry={this.state.isPwd}
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}/>
                        <TouchableOpacity activeOpacity={constant.activeOpacity}
                                          onPress={() => {
                                              this.setState({isPwd: !this.state.isPwd})
                                          }}>
                            <Image style={[{height: inputIconWidth, width: inputIconWidth, marginRight: 10}]}
                                   resizeMode={"contain"}
                                   source={pwdIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.dividerLineE6, {width: dividerWidth}]}/>
                    <TouchableOpacity activeOpacity={constant.activeOpacity}
                                      onPress={() => {
                                          Actions.WebviewPage({
                                              url: constant.API_USER_AGREEMENT,
                                              title: i18n("User_Agreement")
                                          });
                                      }}>
                        <View style={[{marginTop: 17}, styles.flexDirectionRowNotFlex, styles.centerH,]}>
                            <Image style={[{height: 12, width: 12, marginRight: 2}]}
                                   resizeMode={"contain"}
                                   source={require("../../img/icon_info.png")}/>

                            <Text style={styles.subLightSMinText}>{i18n("sign_tip")}</Text>
                            <Text style={[{
                                color: "#1C1C1C",
                                textDecorationLine: "underline",
                                fontSize: constant.sminTextSize,
                            },]}>{i18n("User_Agreement2")}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={constant.activeOpacity}
                                      onPress={() => {
                                          Keyboard.dismiss();

                                          if (this.state.account === "") {
                                              Toast(i18n("Please_input_Mobile_number_or_email"));
                                              return;
                                          }
                                          if (this.state.password === "") {
                                              Toast(i18n("Please_input_password"));
                                              return;
                                          }

                                          Actions.LoadingModal({text: i18n("Logining"), backExit: false});

                                          vUserDao.login(this.state.account, this.state.password).then((res) => {
                                              if (res.code === 200) {
                                                  return vUserDao.userinfo();
                                              } else {
                                                  Toast(res.message);
                                                  return null;
                                              }
                                          }).then((res) => {
                                              this.exitLoading();
                                              if (res.code === 200) {
                                                  DeviceEventEmitter.emit(constant.CHANGE_PERSONAL);
                                                  home(res.data.region);
                                                  // Actions.pop();
                                              } else {
                                                  Toast(res.message);
                                              }
                                          })
                                      }}>
                        <View style={[{
                            width: screenWidth - 76,
                            paddingVertical: 10,
                            marginTop: 20,
                            borderColor: "#D7D7D7",
                            borderRadius: 6,
                            borderWidth: 1
                        }, styles.centered,]}>
                            <Text style={styles.smallTextGrayBlue}>{i18n("Sign_in")}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View
                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {
                        paddingTop: 12,
                        paddingLeft: 38,
                        paddingRight: 38
                    }]}>
                    <TouchableOpacity activeOpacity={constant.activeOpacity}
                                      onPress={() => {
                                          Actions.ResetPwdPage();
                                      }}>
                        <Text style={[{
                            color: "#1C1C1C",
                            textDecorationLine: "underline",
                            fontSize: constant.minTextSize,
                        },]}>{i18n("Forgot_password")}</Text>

                    </TouchableOpacity>

                    <View style={[, styles.flexDirectionRow, styles.centerH, styles.justifyEnd]}>
                        <TouchableOpacity activeOpacity={constant.activeOpacity}
                                          onPress={() => {
                                              Actions.RegisterPage();
                                          }}>
                            <Text style={[{
                                color: "#1C1C1C",
                                textDecorationLine: "underline",
                                fontSize: constant.minTextSize,
                            },]}>{i18n("Create_new_account")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.flexDirectionColumn, styles.justifyEnd, styles.centerH]}>

                    <View style={[styles.flexDirectionRowNotFlex, styles.centerH]}>
                        <View style={[styles.dividerLineC1]}/>
                        <Text style={[{marginHorizontal: 10}, styles.b40MinText]}>{i18n("Or")}</Text>
                        <View style={[styles.dividerLineC1]}/>
                    </View>

                    <View style={[{marginTop: 15, marginBottom: 50}, styles.flexDirectionRowNotFlex]}>
                        <TouchableOpacity
                            activeOpacity={constant.activeOpacity}
                            onPress={() => {
                                this._fbLogin();
                            }}>
                            <Image source={require("../../img/facebook.png")}
                                   resizeMode={"stretch"}
                                   style={{width: 20, height: 20}}/>

                        </TouchableOpacity>
                        {/* <FBLogin
                            buttonView={<View />}
                            ref={(fbLogin) => {
                                this.fbLogin = fbLogin
                            }}
                            loginBehavior={FBLoginManager.LoginBehaviors.Native}
                            permissions={["email", "user_friends"]}
                            onLogin={(res) => {
                                console.log(res);
                                Toast(JSON.stringify(res));
                            }}
                            onLoginFound={(res) => {
                                console.log(res);
                            }}
                            onLoginNotFound={(res) => {
                                console.log(res);
                            }}
                            onLogout={(res) => {
                                console.log(res);
                            }}
                            onCancel={(res) => {
                                console.log(res);
                                toast(i18n("three_login_cancel"));
                            }}
                            onPermissionsMissing={(res) => {
                                console.log(res);
                                toast(i18n("Unknown_error"));
                            }}
                        />*/}

                        <TouchableOpacity
                            style={[{marginLeft: 58}]}
                            activeOpacity={constant.activeOpacity}
                            onPress={() => {
                                this._signIn();
                            }}>
                            <Image source={require("../../img/google.png")}
                                   resizeMode={"stretch"}
                                   style={{width: 20, height: 20}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default LoginPage
