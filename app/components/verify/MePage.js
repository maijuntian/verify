/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {Text, View, Image, ImageBackground, FlatList, TouchableOpacity, DeviceEventEmitter} from "react-native";
import styles, {screenWidth, statusHeight} from "../../style";
import * as Constant from "../../style/constant";
import CommonIconText from "../common/CommonIconText";
import I18n from "../../style/i18n";
import Icon from 'react-native-vector-icons/Feather'
import {Actions} from 'react-native-router-flux';
import * as Config from "../../config";
import vUserDao from "../../dao/vUserDao";

/**
 * 我的
 */
class MePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
            items: [{key: I18n("Profile")}
                , {key: I18n("Verification_record")}
                , {key: I18n('Integral_detail')}
                , {key: I18n("My_prize")}
                , {key: I18n("Check_in_record")}
                , {key: I18n("Receiving_address")}
                , {key: I18n("Rights_and_interests")}
                , {key: I18n("Settings")}]

        };
    }

    initUserInfo() {
        vUserDao.localUserInfo().then((res) => {
            this.setState({
                userInfo: res
            });
        })
    }

    componentDidMount() {
        this.initUserInfo();
        this.subscription = DeviceEventEmitter.addListener(Constant.CHANGE_PERSONAL, () => {
            //接收到详情页发送的通知，刷新数据
            this.initUserInfo();
            /*vUserDao.isLoginAsync().then((res) => {
                if (!res) {
                    Actions.HomePage();
                }
            })*/
        });
    }

    componentWillUnmount() {
        this.subscription.remove();
    };

    checkUserLogin() {
        if (vUserDao.isLogin(this.state.userInfo)) {
            return true;
        }
        Actions.LoginPage();
        return false;
    }

    render() {

        let userView;
        if (vUserDao.isLogin(this.state.userInfo)) {
            userView = <ImageBackground source={require("../../img/me_bg.png")}
                                        style={[{height: 180, width: screenWidth}, styles.flexDirectionColumnNotFlex]}
                                        resizeMode={"stretch"}>
                <View style={[{
                    marginTop: 10 + statusHeight,
                    width: screenWidth,
                    height: 72,
                }, styles.flexDirectionRowNotFlex, styles.centerH]}>
                    <Image style={[{height: 72, width: 72, borderRadius: 36, marginLeft: 30},]}
                           source={{uri: this.state.userInfo.icon}}
                    />

                    <Text
                        style={[{marginLeft: 10, width: screenWidth - 122}, styles.largeTextWhite_Charter]}
                        numberOfLines={1}>{this.state.userInfo.nickname}</Text>
                </View>

                <View style={[{marginTop: 15, marginLeft: 50,}, styles.flexDirectionRowNotFlex,]}>
                    <View style={[styles.flexDirectionRowNotFlex, styles.centered]}>

                        <Image style={[{height: 18, width: 18},]}
                               source={require("../../img/integral_2.png")}/>

                        <Text style={[{
                            marginLeft: 5,
                            color: Constant.transWhite,
                            fontSize: Constant.minTextSize
                        },]}>{I18n("Integral")}: </Text>

                        <Text style={[styles.smallTextWhite]}>{this.state.userInfo.points}</Text>
                    </View>

                    <View style={[styles.flexDirectionRow, {
                        justifyContent: 'flex-end',
                        marginEnd: 50,
                    }]}>
                        <View style={[styles.flexDirectionRowNotFlex, styles.centered]}>

                            <Image style={[{height: 18, width: 18},]}
                                   source={require("../../img/grow_up_2.png")}/>

                            <Text style={[{
                                marginLeft: 5,
                                color: Constant.transWhite,
                                fontSize: Constant.minTextSize
                            },]}>{I18n("Grow_up")}: </Text>

                            <Text style={[styles.smallTextWhite]}>{this.state.userInfo.scores}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        } else {
            userView = <ImageBackground source={require("../../img/me_bg.png")}
                                        style={[{height: 180, width: screenWidth}, styles.flexDirectionColumnNotFlex]}
                                        resizeMode={"stretch"}>
                <View style={styles.flexDirectionColumnNotFlex}>
                    <View style={[{
                        marginTop: 24 + statusHeight,
                        height: 72,
                        width: screenWidth
                    }, styles.flexDirectionRowNotFlex, styles.centerH]}>

                        <Image style={[{height: 72, width: 72, borderRadius: 36, marginLeft: 30},]}
                               source={require("../../img/icon_user_head_default.png")}
                        />

                        <View style={[styles.flexDirectionColumnNotFlex, {marginLeft: 20,}]}>
                            <TouchableOpacity
                                activeOpacity={Constant.activeOpacity}
                                onPress={() => {
                                    Actions.LoginPage();
                                }}>
                                <View style={[{
                                    borderColor: "#EFEFEF",
                                    borderWidth: 1,
                                    borderRadius: 13,
                                    width: 91,
                                    height: 26,
                                }, styles.centered]}>
                                    <Text
                                        style={[styles.smallTextWhite]}>{I18n("Sign_in")}</Text>
                                </View>
                            </TouchableOpacity>
                            <Text
                                style={[{
                                    marginTop: 3,
                                    opacity: 0.33
                                }, styles.sminTextWhite]}> {I18n("login_tip")}</Text>
                        </View>

                    </View>
                </View>
            </ImageBackground>
        }
        return (
            <View style={styles.mainBox}>
                {userView}

                <FlatList
                    data={this.state.items}
                    renderItem={({item, index}) => {

                        let view = index === (this.state.items.length - 1) ? <View/> :
                            <View style={styles.dividerLineF6}/>;

                        return (
                            <View style={styles.flexDirectionColumnNotFlex}>
                                <TouchableOpacity style={[{
                                    paddingHorizontal: 26,
                                    paddingVertical: 20
                                }, styles.flexDirectionRowNotFlex, styles.centerH]} onPress={() => {
                                    switch (index) {
                                        case 0:
                                            if (this.checkUserLogin()) {
                                                Actions.PersonalPage();
                                            }
                                            break;
                                        case 1:
                                            if (this.checkUserLogin()) {
                                                Actions.VerifyHistoryPage();
                                            }
                                            break;
                                        case 2:
                                            if (this.checkUserLogin()) {
                                                Actions.PointsActivityPage();
                                            }
                                            break;
                                        case 3:
                                            if (this.checkUserLogin()) {
                                                Actions.GiftListPage();
                                            }
                                            break;
                                        case 4:
                                            if (this.checkUserLogin()) {
                                                Actions.CheckInPage();
                                            }
                                            break;
                                        case 5:
                                            if (this.checkUserLogin()) {
                                                Actions.AddressPage();
                                            }
                                            break;
                                        case 6:
                                            Actions.RankInterestsPage();
                                            break;
                                        case 7:
                                            Actions.SettingPage({isLogin: vUserDao.isLogin(this.state.userInfo)});
                                            break;
                                    }
                                }}>

                                    <Text style={styles.smallTextBlack}>{item.key}</Text>


                                    <View style={[styles.absoluteFull, {
                                        zIndex: -999,
                                        alignItems: 'flex-end',
                                        marginRight: 33,
                                        marginTop: 24,
                                    }]}>
                                        <Icon
                                            name={"chevron-right"}
                                            backgroundColor={Constant.transparentColor}
                                            color={Constant.primaryBlackColor} size={15}/>
                                    </View>
                                </TouchableOpacity>
                                {view}
                            </View>
                        )
                    }}/>
            </View>
        )
    }
}

export default MePage
