/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    Image,
    ImageBackground,
    StatusBar,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    DeviceEventEmitter
} from "react-native";
import BaseTitlePage from "../widget/BaseTitlePage";
import styles, {screenWidth, statusHeight} from "../../style";
import * as constant from "../../style/constant";
import I18n from "../../style/i18n";
import Svg, {G, Path} from "react-native-svg";
import CommonIconText from "../common/CommonIconText";
import Icon from "react-native-vector-icons/Feather";
import * as Config from "../../config";
import productDao from "../../dao/productDao";
import {Actions} from "react-native-router-flux";
import vUserDao from "../../dao/vUserDao";
import PersonalPage from "./PersonalPage";
import {white} from "../../style/constant";
import {loginPage} from "../../utils/PageUtils";
import AnalyticsUtil from "../../utils/AnalyticsUtil";

/**
 * 商城
 */
class MallPage extends Component {

    constructor(props) {
        super(props);

        this._renderHeader = this._renderHeader.bind(this);

        this.state = {
            userInfo: {},
            maxProgress: 2000,
            productData: [],
            isShow: false,
        }
    }

    initUserInfo() {
        vUserDao.localUserInfo().then((res) => {
            this.setState({
                userInfo: res
            });
            if (vUserDao.isLogin(res)) {
                constant.REBATE = res.grade.rebate;
            } else {
                constant.REBATE = 100;
            }
        })
    }

    componentDidMount() {
        this.initUserInfo();
        this._getProductList()

        this.subscription = DeviceEventEmitter.addListener(constant.CHANGE_PERSONAL, () => {
            //接收到详情页发送的通知，刷新数据
            this.initUserInfo();
            this._getProductList();
        });
    }

    _getProductList() {
        let params = "pageNum=1" + "&pageSize=" + Config.PAGE_SIZE;

        productDao.mallDaoGet("product?" + params)
            .then((res) => {
                if (res.code === 200) {
                    this.setState({
                        productData: res.data
                    })
                } else {
                }
            })
    }

    componentWillUnmount() {
        this.subscription.remove();
        AnalyticsUtil.onPageEnd("MallPage");
    }
    componentWillMount(){
        AnalyticsUtil.onPageBegin("MallPage");
    }


    _renderHeader() {

        let banner = constant.APP_TYPE === 2 ? require("../../img/exchange_gifts_cn.png") : require("../../img/exchange_gifts.png");

        let userView;
        if (vUserDao.isLogin(this.state.userInfo)) {
            let maxWidth = (screenWidth - 60 - 10);
            let progressWidth = 0;
            if (this.state.userInfo.grade.endScore === this.state.userInfo.grade.startScore) {
                progressWidth = maxWidth;
            } else {
                let progress = this.state.userInfo.scores - this.state.userInfo.grade.startScore;
                progressWidth = (maxWidth * progress / (this.state.userInfo.grade.endScore - this.state.userInfo.grade.startScore));
            }

            let bg_max = "M5 8 l" + maxWidth + " 0";
            let bg_progress = "M5 8 l" + progressWidth + " 0";
            let tipMarginLeft = progressWidth - 10;

            let rankIcon = require("../../img/silver.png");
            switch (this.state.userInfo.grade.gradeName) {
                case "Copper":
                    rankIcon = require("../../img/copper.png");
                    break;
                case "Silver":
                    rankIcon = require("../../img/silver.png");
                    break;
                case "Gold":
                    rankIcon = require("../../img/gold.png");
                    break;
            }

            let rateView = this.state.userInfo.grade.rebate === 100 ? <View/> : <View style={[
                styles.absoluteFull, styles.flexDirectionColumnNotFlex, styles.centerV, {
                    marginRight: 30,
                    zIndex: -999,
                    alignItems: 'flex-end'
                }]}>
                <View style={[{
                    borderRadius: 20,
                    width: 56,
                    backgroundColor: "#404040"
                }, styles.flexDirectionRowNotFlex, styles.centered]}>
                    <Text style={[styles.smallTextWhite]}>{(100 - this.state.userInfo.grade.rebate)}%</Text>
                    <Text style={[{marginTop: 3}, styles.minTextWhite]}> off</Text>
                </View>
            </View>

            userView = <View style={styles.flexDirectionColumnNotFlex}>
                <View style={[{
                    marginTop: 15 + statusHeight,
                    height: 86,
                    width: screenWidth
                }, styles.flexDirectionRowNotFlex, styles.centerH]}>

                    <TouchableOpacity
                        activeOpacity={constant.activeOpacity}
                        onPress={() => {
                            Actions.PersonalPage();
                        }}>
                        <ImageBackground
                            source={require("../../img/bg_user_icon.png")}
                            style={[{height: 86, width: 86, borderRadius: 43, marginLeft: 27,}, styles.centered]}>
                            <Image style={[{height: 72, width: 72, borderRadius: 36,},]}
                                   source={{uri: this.state.userInfo.icon}}
                            />
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={[styles.flexDirectionColumnNotFlex, {marginLeft: 10, paddingBottom: 10}]}>
                        <Text
                            style={[{marginTop: 5, width: screenWidth - 140}, styles.largeTextBlackCharter]}
                            numberOfLines={1}>{this.state.userInfo.nickname}</Text>
                        <Text
                            style={[{marginTop: 5}, styles.subMinText]}>{this.state.userInfo.points} {I18n("Integral")}</Text>
                        <Text style={[{marginTop: -3}, styles.subMinText]}></Text>
                    </View>

                    <View style={[
                        styles.absoluteFull, styles.flexDirectionColumnNotFlex, styles.centerV, {
                            marginTop: 30,
                            alignItems: 'flex-end'
                        }]}>

                        <TouchableOpacity
                            activeOpacity={constant.activeOpacity}
                            onPress={() => {
                                Actions.CheckInPage();
                            }}>
                            <View style={[{
                                borderColor: constant.grayBg,
                                borderWidth: 1,
                                borderRadius: 5,
                                width: 86,
                                height: 22,
                                marginRight: -1,
                            }, styles.centered]}>
                                <CommonIconText
                                    textStyle={[styles.b40MinText]}
                                    text={I18n("Check_in")}
                                    icon={require("../../img/check_in1.png")}
                                    iconStyle={[{height: 7, width: 9}]}/>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={[{marginTop: 15}, styles.flexDirectionColumnNotFlex]}>
                    <View style={[styles.flexDirectionRowNotFlex, {marginLeft: 30, height: 20}]}>
                        <Text style={[styles.b40MinText, {marginTop: 3}]}>{I18n("Rank")}:</Text>
                        <Image style={[{marginLeft: 4, height: 22, width: 22}]}
                               source={rankIcon}/>
                        {rateView}
                    </View>

                    <View style={[{height: 50, marginTop: -20}, styles.flexDirectionColumnNotFlex]}>

                        <ImageBackground
                            style={[{
                                marginLeft: tipMarginLeft + 30 - ((this.state.userInfo.scores + "").length === 5 ? 5 : 0),
                                height: (this.state.userInfo.scores + "").length === 5 ? 24 : 19,
                                width: (this.state.userInfo.scores + "").length === 5 ? 41 : 31,
                                marginTop: (this.state.userInfo.scores + "").length === 5 ? 0 : 5,
                                opacity: this.state.isShow ? 1 : 0,
                                backgroundColor: white,
                            }, styles.centerH]}
                            source={require("../../img/integral_score.png")}>

                            <Text
                                style={[{marginTop: (this.state.userInfo.scores + "").length === 5 ? 2 : 0}, styles.subMinText]}>{this.state.userInfo.scores}</Text>

                        </ImageBackground>
                        <TouchableOpacity
                            style={[{marginLeft: 30,}]}
                            activeOpacity={constant.activeOpacity}
                            onPress={() => {
                                this.setState({isShow: true});

                                this.timer && clearTimeout(this.timer);

                                this.timer = setTimeout(() => {
                                    this.setState({isShow: false});
                                }, 3000);
                            }}>
                            <Svg height="24" width={bg_max}>
                                <G fill="none" stroke={constant.grayBg}>
                                    <Path strokeLinecap="round" strokeWidth="8" d={bg_max}/>
                                </G>
                                <G fill="none" stroke={constant.grayBlack}>
                                    <Path strokeLinecap="round" strokeWidth="8" d={bg_progress}/>
                                </G>
                            </Svg>
                        </TouchableOpacity>

                        <View style={[styles.absoluteFull, styles.flexDirectionColumnNotFlex, {
                            marginRight: 30,
                            zIndex: -999,
                            alignItems: 'flex-end',
                            marginTop: 35,
                        }]}>

                            <Text style={[styles.subMinText,]}>{this.state.userInfo.grade.endScore}</Text>
                        </View>
                    </View>

                </View>
                <View style={[{marginTop: 15, backgroundColor: constant.grayBg, height: 1, width: screenWidth}]}/>
            </View>
        } else {
            userView = <View style={styles.flexDirectionColumnNotFlex}>
                <View style={[{
                    marginTop: 15 + statusHeight,
                    height: 86,
                    width: screenWidth
                }, styles.flexDirectionRowNotFlex, styles.centerH]}>

                    <ImageBackground
                        source={require("../../img/bg_user_icon.png")}
                        style={[{height: 86, width: 86, borderRadius: 43, marginLeft: 27,}, styles.centered]}>
                        <Image style={[{height: 72, width: 72, borderRadius: 36,},]}
                               source={require("../../img/icon_user_head_default.png")}
                        />
                    </ImageBackground>

                    <View style={[styles.flexDirectionColumnNotFlex, {marginLeft: 10,}]}>
                        <TouchableOpacity
                            activeOpacity={constant.activeOpacity}
                            onPress={() => {
                                loginPage();
                            }}>
                            <View style={[{
                                borderColor: "#EFEFEF",
                                borderWidth: 1,
                                borderRadius: 13,
                                width: 91,
                                height: 26,
                            }, styles.centered]}>
                                <Text
                                    style={[styles.smallTextBlack]}>{I18n("Sign_in")}</Text>
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={[{marginTop: 3}, styles.subsMinText]}> {I18n("login_tip")}</Text>
                    </View>

                </View>

                <View style={[{marginTop: 10, backgroundColor: constant.grayBg, height: 1, width: screenWidth}]}/>
            </View>
        }

        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'dark-content'}/>

                {userView}

                <View style={[styles.centered, {width: screenWidth, padding: 10}]}>
                    <Image style={[{height: 26, width: 188,}]}
                           source={banner}/>

                    <View style={[styles.absoluteFull, styles.centerV,
                        {
                            marginRight: 10,
                            zIndex: -999,
                            alignItems: 'flex-end',
                        }]}>

                        <TouchableOpacity activeOpacity={constant.activeOpacity} onPress={() => {
                            Actions.ProductListPage();
                        }}>
                            <View style={[styles.flexDirectionRowNotFlex, styles.centerH,]}>
                                <Text
                                    style={[styles.gray6ASmallText]}>{I18n("More")}</Text>

                                <Icon
                                    name={"chevron-right"}
                                    backgroundColor={constant.transparentColor}
                                    color={constant.primaryBlackColor} size={15}
                                    style={[styles.centered, {paddingLeft: 2}]}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <Image source={require("../../img/banner.png")}
                       style={[{height: 112, width: screenWidth}]}/>

            </View>
        )
    }


    render() {

        let dividerW = screenWidth * 0.02;
        return (
            <FlatList
                style={{backgroundColor: constant.grayBg, flex: 1,}}
                data={this.state.productData}
                ListHeaderComponent={this._renderHeader()}
                numColumns={2}
                renderItem={({item, index}) => {
                    let marginRight = index % 2 === 0 ? 0 : dividerW;
                    return (
                        <TouchableOpacity
                            activeOpacity={constant.activeOpacity}
                            onPress={() => {
                                Actions.ProductDetailPage({"productStr": JSON.stringify(item)});
                            }}>
                            <View
                                style={[{
                                    width: ((screenWidth - dividerW * 3) / 2),
                                    marginRight: marginRight,
                                    marginLeft: dividerW,
                                    marginTop: dividerW,
                                }, styles.mainBgColor, styles.flexDirectionColumnNotFlex]}>
                                <Image style={[{
                                    height: (screenWidth - dividerW * 3) / 2,
                                    width: (screenWidth - dividerW * 3) / 2
                                }]}
                                       source={{uri: item.icon}}
                                       resizeMode={"stretch"}/>

                                <View style={[{height: 75}]}>
                                    <Text style={[{
                                        marginLeft: 10,
                                        marginTop: 14,
                                        marginRight: 10
                                    }, styles.sminText9Dgray]}
                                          numberOfLines={2}
                                          ellipsizeMode='tail'>{item.productName}</Text>

                                    <View style={[{
                                        marginLeft: 10,
                                        marginTop: 5
                                    }, styles.flexDirectionRowNotFlex, styles.centerH]}>
                                        <Text
                                            style={[styles.smallTextBlack]}>{item.discount === 0 ? item.pointsDisplay : item.discountDisplay} {I18n("Integral")}</Text>
                                        <Text style={[{
                                            marginLeft: 5,
                                            textDecorationLine: "line-through"
                                        }, styles.minTextsGray]}>{item.discount === 0 ? "" : item.pointsDisplay}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }
}

export default MallPage
