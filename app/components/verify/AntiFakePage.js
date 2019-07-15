/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity, Linking, DeviceEventEmitter} from "react-native";
import BaseTitlePage from "../widget/BaseTitlePage";
import I18n from "../../style/i18n";
import CommonProductHeader from "../common/CommonProductHeader";
import styles, {screenWidth} from "../../style";
import * as Constant from "../../style/constant";
import CommonIconTextButton from "../common/CommonIconTextButton";
import {Actions} from "react-native-router-flux";
import Icon from "react-native-vector-icons/Feather";
import vUserDao from "../../dao/vUserDao";
import AnalyticsUtil from "../../utils/AnalyticsUtil";

/**
 * 防伪
 */
class AntiFakePage extends BaseTitlePage {

    constructor(props) {
        super(props);

        this.state = {
            code: this.props.code,
            dataStr: this.props.responseStr,
            data: {
                suggestion: [],
            }

        }
    }
    componentWillMount() {
        AnalyticsUtil.onPageBegin("AntiFakePage");
    }

    componentWillUnmount(){
        AnalyticsUtil.onPageEnd("AntiFakePage");
    };

    _title() {
        return I18n("Code_Authentication");
    }

    componentDidMount() {
        this.refreshData();

        vUserDao.userinfo().then(res => {
            if (res.code === 200) {
                console.log("刷新用户的积分...")
                DeviceEventEmitter.emit(Constant.CHANGE_PERSONAL);
            }
        });
    }

    refreshData() {
        let dataJson = JSON.parse(this.state.dataStr);
        this.setState({
            data: dataJson
        })
    }

    _reader() {

        let exchangeView = Constant.APP_TYPE === 1 ? <View/> :
            <View style={{marginLeft: 26}}>
                <CommonIconTextButton
                    textStyle={[{color: "#586575", fontSize: Constant.smallTextSize}]}
                    text={I18n("Exchange_gifts")}
                    iconStyle={[{height: 15, width: 15}]}
                    icon={require("../../img/icon_gifts.png")}
                    onPress={() => {
                        Actions.pop();
                        Actions.MallPage();
                    }}/>
            </View>

        let button = this.state.code === 200 ?
            <View style={[styles.flexDirectionRowNotFlex]}>
                <CommonIconTextButton textStyle={[{color: "#586575", fontSize: Constant.smallTextSize}]}
                                      text={I18n("Scan_code")}
                                      iconStyle={[{height: 15, width: 15}]}
                                      icon={require("../../img/icon_scan.png")}
                                      onPress={() => {
                                          Actions.replace("ScanQrCodePage")
                                      }}/>
                {exchangeView}
            </View> : <View style={[styles.flexDirectionRowNotFlex]}>
                <CommonIconTextButton textStyle={[{color: "#586575", fontSize: Constant.smallTextSize}]}
                                      text={I18n("Feedback")}
                                      iconStyle={[{height: 14, width: 15}]}
                                      icon={require("../../img/icon_message.png")}
                                      onPress={() => {
                                          Actions.FeedBackPage({code: this.state.data.code})
                                      }}/>
            </View>;
        let resultView;
        switch (this.state.code) {
            case 200:
                resultView = <View style={[styles.centerH, styles.flexDirectionColumnNotFlex]}>
                    <Text
                        style={[styles.subSmallText, {marginTop: 80}]}>{I18n("Viverify_Code")}</Text>
                    <Text
                        style={[styles.superLargeTextBlackCharter]}>{this.state.data.manufacturerCode}</Text>
                    <Text style={[styles.subSmallText, {
                        marginTop: 10,
                        marginBottom: 80,
                        textAlign: 'center'
                    }]}>{this.state.data.points ? I18n("anti_fake_tip3") + this.state.data.points + I18n("anti_fake_tip3_end") : I18n("anti_fake_tip3_")}</Text>
                    {button}
                </View>;
                break;
            case 410:
                resultView = <View style={[styles.centerH, styles.flexDirectionColumnNotFlex]}>
                    <Text style={[styles.subSmallText, {
                        marginTop: 120,
                        marginBottom: 120,
                        textAlign: 'center'
                    }]}>{I18n("anti_fake_tip33")}</Text>
                    {button}
                </View>;
                break;
            case 208:
                resultView = <View style={[styles.centerH, styles.flexDirectionColumnNotFlex]}>
                    <Text style={[styles.subSmallText, {
                        marginTop: 120,
                        textAlign: 'center'
                    }]}>{I18n("anti_fake_tip41")}</Text>
                    <Text style={[styles.subSmallText, {
                        textAlign: 'center',
                        color: "red",
                    }]}>{this.state.data.authTime}</Text>
                    <Text style={[styles.subSmallText, {
                        marginBottom: 120,
                        textAlign: 'center'
                    }]}>{I18n("anti_fake_tip42")}</Text>
                    {button}
                </View>;
                break;
        }


        return (
            <View style={[{backgroundColor: Constant.grayBg}, styles.flexDirectionColumn]}>
                <View style={[{
                    paddingHorizontal: 3 * Constant.normalMarginEdge,
                    paddingVertical: 2 * Constant.normalMarginEdge,
                    backgroundColor: Constant.white,
                }]}>
                    <CommonProductHeader data={this.state.data}
                                         iconPress={() => {
                                             Actions.AboutHistoryPage({"responseStr": this.state.dataStr})
                                         }}/>
                </View>
                {resultView}

                <View style={[styles.absoluteFull, styles.flexDirectionColumn, {
                    justifyContent: "flex-end",
                    zIndex: -999
                },]}>
                    <View>

                        <FlatList
                            data={this.state.data.suggestion}
                            renderItem={({item, index}) => {
                                return (
                                    <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                                      onPress={() => {
                                                          Linking.openURL(item.url);
                                                      }}>
                                        <View style={[{
                                            height: 46,
                                            backgroundColor: Constant.white
                                        }, styles.flexDirectionColumnNotFlex]}>

                                            <View style={[styles.dividerLineE3]}/>
                                            <View style={[styles.flex, styles.centerV,]}>

                                                <Image source={{uri: item.platformIcon}}
                                                       style={[{height: 20, width: 50, marginLeft: 30}]}
                                                       resizeMode={"contain"}/>
                                            </View>

                                            <View style={[styles.absoluteFull, styles.centerV,
                                                {
                                                    marginRight: 10,
                                                    zIndex: -999,
                                                    alignItems: 'flex-end',
                                                }]}>

                                                <View
                                                    style={[styles.flexDirectionRowNotFlex, styles.centerH, {marginEnd: 14}]}>
                                                    <Text
                                                        style={[{color: "#586575", fontSize: 14}]}>{item.remark}</Text>

                                                    <Icon
                                                        name={"chevron-right"}
                                                        backgroundColor={Constant.transparentColor}
                                                        color={Constant.primaryBlackColor} size={15}
                                                        style={[styles.centered, {paddingLeft: 2}]}/>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />

                    </View>

                </View>
            </View>
        )
    }
}

export default AntiFakePage
