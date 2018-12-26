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
import {Actions} from 'react-native-router-flux'
import * as Config from "../../config";
import vUserDao from "../../dao/vUserDao";
import AddressPage from "./AddressPage";
import RankInterestsPage from "./RankInterestsPage";

/**
 * 我的
 */
class MePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
            items: [{key: I18n("Personal")}
                , {key: I18n('Integral_detail')}
                , {key: I18n("My_prize")}
                , {key: I18n("Verification_record")}
                , {key: I18n("Check_in_record")}
                , {key: I18n("Rights_and_interests")}
                , {key: I18n("Receiving_address")}]

        }
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
        DeviceEventEmitter.addListener(Constant.CHANGE_PERSONAL,()=>{
            //接收到详情页发送的通知，刷新数据
            this.initUserInfo();
        });
    }

    componentWillUnmount() {
    }


    render() {
        return (
            <View style={styles.mainBox}>
                <ImageBackground source={require("../../img/me_bg.png")}
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
                            style={[{marginLeft: 10}, styles.largeTextWhite_Charter]}>{this.state.userInfo.nickname}</Text>
                        <View style={[styles.flexDirectionRow, {
                            justifyContent: 'flex-end',
                        },]}>

                            <View style={[{
                                borderColor: Constant.white,
                                borderWidth: 1,
                                marginRight: -1,
                                borderTopLeftRadius: 5,
                                borderBottomLeftRadius: 5,
                                width: 86,
                                height: 18,
                            }, styles.centered]}>
                                <CommonIconText
                                    textStyle={[styles.minTextWhite]}
                                    text={I18n("Check_in")}
                                    icon={require("../../img/check_in2.png")}
                                    iconStyle={[{height: 7, width: 9}]}/>
                            </View>
                        </View>
                    </View>

                    <View style={[{marginTop: 15, marginLeft: 30,}, styles.flexDirectionRowNotFlex,]}>
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
                            marginEnd: 30,
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

                <FlatList
                    style={{marginVertical: 13}}
                    data={this.state.items}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity style={[{
                                paddingHorizontal: 26,
                                paddingVertical: 13
                            }, styles.flexDirectionRowNotFlex, styles.centerH]} onPress={() => {
                                switch (index) {
                                    case 0:
                                        Actions.PersonalPage();
                                        break;
                                    case 1:
                                        Actions.PointsActivityPage();
                                        break;
                                    case 2:
                                        Actions.GiftListPage();
                                        break;
                                    case 3:
                                        Actions.VerifyHistoryPage();
                                        break;
                                    case 4:
                                        Actions.CheckInPage();
                                        break;
                                    case 5:
                                        Actions.RankInterestsPage();
                                        break;
                                    case 6:
                                        Actions.AddressPage();
                                }
                            }}>

                                <Text style={styles.smallTextBlack}>{item.key}</Text>


                                <View style={[styles.absoluteFull, {
                                    zIndex: -999,
                                    alignItems: 'flex-end',
                                    marginRight: 26,
                                    marginTop: 15,
                                }]}>
                                    <Icon
                                        name={"chevron-right"}
                                        backgroundColor={Constant.transparentColor}
                                        color={Constant.primaryBlackColor} size={15}/>
                                </View>
                            </TouchableOpacity>
                        )
                    }}/>
            </View>
        )
    }
}

export default MePage
