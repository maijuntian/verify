/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    FlatList,
    ScrollView,
    Text,
    ImageBackground,
    View,
    TouchableOpacity,
    WebView,
    Linking
} from "react-native";
import styles, {screenHeight, screenWidth, shadowRadius} from "../../style";
import * as Constant from "../../style/constant";
import BaseTitlePage from "../widget/BaseTitlePage";
import I18n from "../../style/i18n";
import {PagerPan, TabBar, TabView} from "react-native-tab-view";
import CommonProductHeader from "../common/CommonProductHeader";
import CommonIconText from "../common/CommonIconText";
import {Actions} from "react-native-router-flux";
import AnalyticsUtil from "../../utils/AnalyticsUtil";
import {loginPage} from "../../utils/PageUtils";

const ASPECT_RATIO = screenWidth / screenHeight;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

/**
 * 追溯
 */
class ProductHistoryPage2 extends BaseTitlePage {

    _isBackground() {
        return false;
    }

    constructor(props) {
        super(props);
        this._renderScene = this._renderScene.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._renderPager = this._renderPager.bind(this);
        this.state = {
            code: this.props.code,
            dataStr: this.props.responseStr,
            data: {
                product: {},
                tracingResults: [],
            },
            index: 1,
            infos: [{key: "1"}, {key: "2"}],
            routes: [
                {key: '1', title: I18n('INFO')},
                {key: '2', title: I18n('JOURNEY')},
            ],
            polyline: [],
            markers: [],
            latitude: LATITUDE,
            longitude: LONGITUDE,
            polylineT: [
                {
                    latitude: LATITUDE + 0.1,
                    longitude: LONGITUDE + 0.1,
                },
                {
                    latitude: LATITUDE - 0.1,
                    longitude: LONGITUDE - 0.1,
                },
                {
                    latitude: LATITUDE - (2 * 0.1),
                    longitude: LONGITUDE - (2 * 0.1),
                },
                {
                    latitude: LATITUDE - (3 * 0.1),
                    longitude: LONGITUDE - (3 * 0.1),
                },
            ],
            markersT: [
                {
                    latlng: {
                        latitude: LATITUDE + 0.1,
                        longitude: LONGITUDE + 0.1,
                    },
                    title: "a",
                    description: "testa"
                },
                {
                    latlng: {
                        latitude: LATITUDE - 0.1,
                        longitude: LONGITUDE - 0.1,
                    },
                    title: "b",
                    description: "testa"
                },
                {
                    latlng: {
                        latitude: LATITUDE - (0.1 * 2),
                        longitude: LONGITUDE - (0.1 * 2),
                    },
                    title: "c",
                    description: "testa"
                },
                {
                    latlng: {
                        latitude: LATITUDE - (0.1 * 3),
                        longitude: LONGITUDE - (0.1 * 3),
                    },
                    title: "d",
                    description: "testa"
                },
            ]
        }
    }

    _leftPress() {
        Actions.pop();
    }

    componentWillMount() {
        AnalyticsUtil.onPageBegin("ProductHistoryPage2");

        this.refreshData();
    }

    componentDidMount() {
        Linking.getInitialURL()
    }

    componentWillUnmount() {
        AnalyticsUtil.onPageEnd("ProductHistoryPage2");
    }

    refreshData() {
        let dataJson = JSON.parse(this.state.dataStr);

        let polyline = [];
        let markers = [];
        let latitude = LATITUDE;
        let longitude = LONGITUDE;

        dataJson.tracingResults.forEach((data, index) => {
            polyline.push({
                latitude: data.latitude,
                longitude: data.longitude,
            })
            markers.push({
                latlng: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                },
                title: data.name,
            })

            if (index === (dataJson.tracingResults.length / 2)) {
                latitude = data.latitude;
                longitude = data.longitude;
            }
        });

        this.setState({
            data: dataJson,
            polyline: polyline,
            markers: markers,
            latitude: latitude,
            longitude: longitude,
        });

    }

    _title() {
        return I18n("anti_fake");
    }

    _handleIndexChange = index => {
        this.setState({index: index})
    };

    _renderPager = props => (
        <PagerPan {...props} />
    );

    _renderHeader = props =>
        <TabBar {...props}
                useNativeDrivers
                style={[{
                    backgroundColor: Constant.white, shadowOffset: {
                        width: 0,
                        height: 0
                    },
                    shadowOpacity: 0,
                    shadowRadius: 0,
                    elevation: 0,
                }
                    ,]}
                labelStyle={{color: Constant.primaryBlackColor}}
                tabStyle={{color: Constant.text_gray,}}
                indicatorStyle={[{
                    backgroundColor: Constant.grayBlue,
                    marginHorizontal: 15,
                    width: (screenWidth - 60) / 2,
                    height: 1,
                }, styles.centered]}
        />
    ;

    _renderItem(index, data) {

        let lineH = index !== 0 ? <View style={[{
            height: 40,
            width: 1,
            backgroundColor: "#C5C5C5"
        }]}/> : <View/>;

        let identity = data.behavior;

        let iconPoint;
        console.log("test--->" + index + "   " + (this.state.data.tracingResults.length - 1))
        if (index === 0 || index === (this.state.data.tracingResults.length - 1)) {
            iconPoint = require("../../img/icon_point1.png");
        } else {
            iconPoint = require("../../img/icon_point2.png");
        }

        let lineV = index !== this.state.data.tracingResults.length - 1 ? <View style={[{
            width: 1,
            marginTop: -3,
            backgroundColor: "#C5C5C5"
        }, styles.flexDirectionColumn]}/> : <View/>;

        let imageView = <Image style={[{height: 75, width: 75,}]}
                               source={{uri: data.imgUrl}}
                               resizeMode={"contain"}/>;

        let touchImage = data.identity === "MANUFACTURER" ? <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                                                              onPress={() => {
                                                                                  Actions.AboutHistoryPage({"responseStr": JSON.stringify(this.state.data)})
                                                                              }}>
            {imageView}
        </TouchableOpacity> : imageView;

        let contentV;

        if (data.data === null || data.data.length === 0) {
            contentV = <View/>;
        } else if (data.data.length === 2) {
            contentV = <View
                style={[{marginVertical: 10}, styles.flexDirectionRowNotFlex]}>

                <View style={[{
                    height: 84,
                    width: 84,
                    borderColor: "#E6E6E6",
                    borderWidth: 1,
                    borderRadius: 3
                }, styles.centered]}>

                    {touchImage}

                </View>
                <View style={[styles.flexDirectionColumnNotFlex, {marginLeft: 10}]}>
                    <Text
                        style={[{marginTop: -3}, styles.subSmallText]}>{data.data[0].key}</Text>
                    <Text
                        style={[styles.smallTextBlack, {marginTop: -3}]}>{data.data[0].value}</Text>
                    <Text
                        style={[{marginTop: 17}, styles.subSmallText]}>{data.data[1].key}</Text>
                    <Text
                        style={[styles.smallTextBlack, {marginTop: -3}]}>{data.data[1].value}</Text>
                </View>
            </View>
        } else if (data.data.length === 1) {
            contentV = <View
                style={[{marginVertical: 10}, styles.flexDirectionRowNotFlex]}>

                <View style={[{
                    height: 84,
                    width: 84,
                    borderColor: "#E6E6E6",
                    borderWidth: 1,
                    borderRadius: 3
                }, styles.centered]}>
                    {touchImage}
                </View>
                <View style={[styles.flexDirectionColumnNotFlex, {marginLeft: 10}]}>
                    <Text
                        style={[{marginTop: 20}, styles.subSmallText]}>{data.data[0].key}</Text>
                    <Text
                        style={[styles.smallTextBlack, {marginTop: -3}]}>{data.data[0].value}</Text>
                </View>
            </View>
        }

        return (
            <View key={index}
                  style={[{paddingHorizontal: Constant.normalMarginEdge}, styles.flexDirectionRowNotFlex]}>
                <Image source={{uri: data.identityIcon}}
                       style={{height: 20, width: 20, marginTop: 40}}
                       resizeMode={"contain"}/>

                <View
                    style={[{marginLeft: 2}, styles.flexDirectionColumnNotFlex, styles.centerH]}>
                    {lineH}
                    <Image source={iconPoint}
                           style={{height: 15, width: 15, marginTop: index !== 0 ? 0 : 45}}/>

                    {lineV}
                </View>
                <ImageBackground source={require("../../img/frame_bg.png")} style={[{
                    marginLeft: 15,
                    marginTop: 20, width: screenWidth - 90
                }]}
                                 resizeMode={"stretch"}>

                    <View
                        style={[{
                            width: screenWidth - 90,
                            paddingVertical: 15,
                            paddingLeft: 20,
                            paddingRight: 15,
                        }, styles.flexDirectionColumn]}>
                        <Text style={[styles.subMinText]}>{data.time}</Text>
                        <Text style={[styles.subSmallText]}>{identity}</Text>
                        <Text style={[styles.normalTextBlack_Charter]}>{data.name}</Text>

                        {contentV}

                        <CommonIconText
                            iconStyle={[{height: 10, width: 8}]}
                            icon={require("../../img/info_location.png")}
                            text={data.location}
                            textStyle={[styles.smallTextBlack]}/>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    _renderScene = () => {
        let dataList = this.state.data.tracingResults;
        switch (this.state.index) {
            case 1:
                let items = [];
                dataList.forEach((data, index) => {
                    items.push(this._renderItem(index, data))
                });

                return (
                    <View style={[{backgroundColor: Constant.grayBg, paddingBottom: 50}]}>
                        <View style={styles.centerH}>
                            <Text style={[{
                                marginVertical: 40,
                                textAlign: 'center'
                            }, styles.gray6AsmallText]}>{I18n("unlogin_tip")}</Text>

                            <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                              onPress={() => {
                                                  loginPage();
                                              }}>
                                <Text style={[{
                                    marginBottom: 20, paddingHorizontal: 60, height: 36,
                                    borderColor: "#C5C5C5",
                                    borderWidth: 1,
                                    paddingTop: 8,
                                    textAlign: 'center',
                                    borderRadius: 14,
                                }, styles.middleTexBlack]}>{I18n("Sign_in")}</Text>
                            </TouchableOpacity>
                        </View>
                        {items}
                    </View>
                );
            case 2:
                return (
                    <WebView
                        style={[styles.flex]}
                        source={{uri: Constant.API_MAP + this.state.data.code + "/map"}}
                        startInLoadingState={true}/>
                    /*{/!*<View style={{backgroundColor: Constant.grayBg, height: screenWidth * 1.3}}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={{
                                height: screenWidth * 1.3,
                                width: screenWidth,
                            }}
                            region={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            }}>
                            <Polyline
                                coordinates={this.state.polyline}
                                strokeColor="rgba(122,125,127,1)"
                                strokeWidth={2}
                                lineDashPattern={[5, 2, 3, 2]}
                            />
                            {this.state.markers.map(marker => (
                                <Marker
                                    coordinate={marker.latlng}
                                    title={marker.title}
                                    image={require("../../img/icon_point1.png")}
                                    anchor={{x: 0.5, y: 0.5}}
                                />
                            ))}
                        </MapView>

                    </View>*!/}*/
                );
        }
    }

    _reader_real() {
        let bottomView = this._renderScene();
        let dataItems = [];

        this.state.data.data.forEach((data, index) => {
            dataItems.push((<View style={[styles.flexDirectionRowNotFlex, {marginTop: 8}]}>
                <Text style={[styles.subMinText,]}>{data.key}</Text>
                <Text
                    style={[styles.minTextBlack, {marginLeft: 3}]}>{data.value}</Text>
            </View>));
        });
        return (

            <View style={styles.flexDirectionColumn}>
                <View style={[{
                    paddingHorizontal: 3 * Constant.normalMarginEdge,
                    paddingTop: 2 * Constant.normalMarginEdge,
                    backgroundColor: Constant.white,
                }, styles.flexDirectionColumnNotFlex]}>

                    <CommonProductHeader data={this.state.data}
                                         iconPress={() => {
                                             Actions.AboutHistoryPage({"responseStr": JSON.stringify(this.state.data)})
                                         }}/>

                    {dataItems}
                </View>

                <View style={[{paddingTop: 14, backgroundColor: Constant.white}, styles.flexDirectionRowNotFlex,]}>

                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        if (this.state.index !== 1) {
                            this.setState({index: 1});
                        }
                    }}>
                        <View style={[{
                            paddingVertical: 8,
                            width: screenWidth / 2,
                        }, styles.flexDirectionRowNotFlex, styles.centered]}>

                            <Text
                                style={[(this.state.index === 1) ? styles.minTextBlack : styles.minTextsGray]}>{I18n("INFO")}</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        if (this.state.index !== 2) {
                            this.setState({index: 2});
                        }
                    }}>
                        <View style={[{
                            paddingVertical: 8,
                            width: screenWidth / 2,
                        }, styles.flexDirectionRowNotFlex, styles.centered]}>

                            <Text
                                style={[(this.state.index === 2) ? styles.minTextBlack : styles.minTextsGray]}>{I18n("JOURNEY")}</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.flexDirectionRowNotFlex, {backgroundColor: Constant.white}]}>
                    <View style={[{
                        marginLeft: 15,
                        width: screenWidth / 2 - 30,
                        height: 2,
                        backgroundColor: (this.state.index === 1) ? Constant.grayBlue : Constant.white
                    }]}/>
                    <View style={[{
                        marginLeft: 30,
                        width: screenWidth / 2 - 30,
                        height: 2,
                        backgroundColor: (this.state.index === 2) ? Constant.grayBlue : Constant.white
                    }]}/>
                </View>
                {bottomView}
            </View>
        )
    }

    _reader() {

        if (this.state.index === 1) {
            return (
                <ScrollView>
                    {this._reader_real()}
                </ScrollView>

            )
        } else {
            return this._reader_real();
        }
    }
}

export default ProductHistoryPage2
