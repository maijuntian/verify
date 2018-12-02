/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {Image, ImageBackground, StatusBar, Text, View, TouchableOpacity, FlatList} from "react-native";
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

/**
 * 商城
 */
class MallPage extends Component {

    constructor(props) {
        super(props);

        this._renderHeader = this._renderHeader.bind(this);

        this.state = {
            maxProgress: 2000,
            productData: [],
        }
    }

    componentDidMount() {
        this._getProductList()
    }

    _getProductList() {
        productDao.mallDaoGet("product?count=6")
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
    }


    _renderHeader() {
        let progress = 1261;

        let maxWidth = (screenWidth - 60 - 10);
        let progressWidth = (maxWidth * progress / this.state.maxProgress);

        let bg_max = "M5 8 l" + maxWidth + " 0";
        let bg_progress = "M5 8 l" + progressWidth + " 0";
        let tipMarginLeft = progressWidth - 10;
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'dark-content'}/>
                <View style={[{
                    marginTop: 15 + statusHeight,
                    height: 86,
                    width: screenWidth
                }, styles.flexDirectionRowNotFlex, styles.centerH]}>
                    <ImageBackground
                        source={require("../../img/bg_user_icon.png")}
                        style={[{height: 86, width: 86, borderRadius: 43, marginLeft: 27,}, styles.centered]}>
                        <Image style={[{height: 72, width: 72, borderRadius: 36,},]}
                               source={require("../../img/picture_girl.png")}
                        />
                    </ImageBackground>

                    <View style={[styles.flexDirectionColumnNotFlex, {marginLeft: 10, paddingBottom: 10}]}>
                        <Text style={[{marginTop: 5}, styles.largeTextBlackCharter]}>Lisa Lewis</Text>
                        <Text style={[{marginTop: 5}, styles.subMinText]}>1261 {I18n("Integral")}</Text>
                        <Text style={[{marginTop: -3}, styles.subMinText]}></Text>
                    </View>

                    <View style={[
                        styles.absoluteFull, styles.flexDirectionColumnNotFlex, styles.centerV, {
                            marginRight: 30,
                            zIndex: -999,
                            alignItems: 'flex-end'
                        }]}>
                        <TouchableOpacity
                            activeOpacity={constant.activeOpacity}
                            style={[{
                                borderWidth: 1, borderColor: constant.subLightTextColor, height: 56, width: 56,
                                borderRadius: 28
                            }, styles.centered]}
                            onPress={() => {
                                Actions.ScanQrCodePage();
                            }}>

                            <Image
                                style={[{height: 26, width: 26,}]}
                                source={require("../../img/icon_scan.png")}/>

                        </TouchableOpacity>

                    </View>
                </View>

                <View style={[{marginTop: 15, marginLeft: 30}, styles.flexDirectionColumnNotFlex]}>
                    <View style={[styles.flexDirectionRowNotFlex, {height: 20}]}>
                        <Text style={[styles.subMinText, {marginTop: -1}]}>{I18n("Rank")}:</Text>
                        <Image style={[{marginLeft: 4, height: 15, width: 15}]}
                               source={require("../../img/silver.png")}/>
                        <View style={[
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
                                <Text style={[styles.smallTextWhite]}>5%</Text>
                                <Text style={[{marginTop: 3}, styles.minTextWhite]}>  off</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[{height: 50}, styles.absoluteFull, styles.flexDirectionColumnNotFlex]}>

                        <ImageBackground
                            style={[{marginLeft: tipMarginLeft, height: 19, width: 31, marginTop: 5}, styles.centerH]}
                            source={require("../../img/integral_score.png")}>

                            <Text style={styles.subMinText}>{progress}</Text>

                        </ImageBackground>

                        <Svg height="24" width={bg_max}>
                            <G fill="none" stroke={constant.grayBg}>
                                <Path strokeLinecap="round" strokeWidth="8" d={bg_max}/>
                            </G>
                            <G fill="none" stroke={constant.grayBlack}>
                                <Path strokeLinecap="round" strokeWidth="8" d={bg_progress}/>
                            </G>
                        </Svg>

                        <View style={[styles.absoluteFull, styles.flexDirectionColumnNotFlex, {
                            marginRight: 30,
                            zIndex: -999,
                            alignItems: 'flex-end',
                            marginTop: 35,
                        }]}>

                            <Text style={[styles.subMinText,]}>{this.state.maxProgress}</Text>
                        </View>
                    </View>

                    <View style={[{marginTop: 50}, styles.flexDirectionRowNotFlex, styles.centerH]}>
                        <View
                            style={[{
                                paddingHorizontal: 5,
                                borderColor: constant.grayBg,
                                borderWidth: 1,
                                borderRadius: 5
                            },
                                styles.flexDirectionRowNotFlex, styles.centered]}>
                            <Text style={[styles.minTextBlack]}>{I18n("Promotion")} ▸</Text>
                        </View>

                        <Text
                            style={[{marginLeft: 3}, styles.subsMinText]}>{I18n("Get")} 739 {I18n("points_and_upgrade")} </Text>
                        <View style={[styles.absoluteFull, styles.flexDirectionColumnNotFlex, {
                            zIndex: -999,
                            alignItems: 'flex-end',
                        }]}>

                            <View style={[{
                                borderColor: constant.grayBg,
                                borderWidth: 1,
                                borderRadius: 5,
                                width: 86,
                                height: 18,
                            }, styles.centered]}>
                                <CommonIconText
                                    textStyle={[styles.minTextBlack]}
                                    text={I18n("Check_in")}
                                    icon={require("../../img/check_in1.png")}
                                    iconStyle={[{height: 7, width: 9}]}/>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[{marginTop: 15, backgroundColor: constant.grayBg, height: 1, width: screenWidth}]}/>

                <View style={[styles.centered, {width: screenWidth, padding: 10}]}>
                    <Image style={[{height: 26, width: 188,}]}
                           source={require("../../img/exchange_gifts.png")}/>

                    <View style={[styles.absoluteFull, styles.centerV,
                        {
                            marginRight: 10,
                            zIndex: -999,
                            alignItems: 'flex-end',
                        }]}>

                        <View style={[styles.flexDirectionRowNotFlex, styles.centerH,]}>
                            <Text
                                style={[styles.subSmallText]}>{I18n("More")}</Text>

                            <Icon
                                name={"chevron-right"}
                                backgroundColor={constant.transparentColor}
                                color={constant.primaryBlackColor} size={15}
                                style={[styles.centered, {paddingLeft: 2}]}/>
                        </View>
                    </View>

                </View>

                <Image source={require("../../img/banner.png")}
                       style={[{height: 112, width: screenWidth}]}/>

            </View>
        )
    }


    render() {
        return (
            <FlatList
                style={{backgroundColor: constant.grayBg, flex: 1,}}
                data={this.state.productData}
                ListHeaderComponent={this._renderHeader()}
                numColumns={2}
                renderItem={({item, index}) => {
                    let marginRight = index % 2 === 0 ? 0 : 4;
                    return (
                        <View
                            style={[{
                                paddingLeft: 10,
                                paddingTop: 10,
                                paddingRight: 10,
                                paddingBottom: 20,
                                width: ((screenWidth - 12) / 2),
                                marginRight: marginRight,
                                marginLeft: 4,
                                marginTop: 4,

                            }, styles.mainBgColor, styles.flexDirectionColumnNotFlex]}>
                            <Image style={[{height: 180, width: (screenWidth - 12) / 2 - 20}]}
                                   source={{uri: item.icon}}
                                   resizeMode={"center"}/>

                            <Text style={[styles.normalTextGrayCharter]}
                                  numberOfLines={1}
                                  ellipsizeMode='tail'>{item.productName}</Text>

                            <View style={[styles.flexDirectionRowNotFlex]}>
                                <Text style={[styles.minTextBlack]}>{item.points} {I18n("Integral")}</Text>
                                <Text style={[{
                                    marginLeft: 3,
                                    textDecorationLine: "line-through"
                                }, styles.minTextsGray]}>20000</Text>
                            </View>
                        </View>
                    )
                }}
            />
        )
    }
}

export default MallPage
