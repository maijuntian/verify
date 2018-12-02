/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {Dimensions, Image, FlatList, ScrollView, Text, ImageBackground, View, TouchableOpacity} from "react-native";
import styles, {screenWidth, shadowRadius} from "../../style";
import * as Constant from "../../style/constant";
import BaseTitlePage from "../widget/BaseTitlePage";
import I18n from "../../style/i18n";
import {PagerPan, TabBar, TabView} from "react-native-tab-view";
import CommonProductHeader from "../common/CommonProductHeader";
import CommonIconText from "../common/CommonIconText";
import {Actions} from "react-native-router-flux";

const config = {
    ["MANUFACTURER"]: "Registered By",
    ["LOGISTICS"]: "Transferred to",
    ["CUSTOMS"]: "Registered By",
    ["DEALER"]: "Transferred to",
};

/**
 * 追溯
 */
class ProductHistoryPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this._renderScene = this._renderScene.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._renderPager = this._renderPager.bind(this);
        this.state = {
            dataStr: this.props.responseStr,
            data: {
                product: {},
                tracingResults: [],
            },
            index: 0,
            infos: [{key: "1"}, {key: "2"}],
            routes: [
                {key: '1', title: I18n('INFO')},
                {key: '2', title: I18n('JOURNEY')},
            ],
        }
    }

    _leftPress() {
        Actions.pop();
    }


    componentDidMount() {
        this.refreshData();
    }

    refreshData() {
        let dataJson = JSON.parse(this.state.dataStr);
        this.setState({
            data: dataJson
        })
    }

    _title() {
        return I18n("tracing_results");
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

        let identity = config[data.identity];

        let iconPoint;
        console.log("test--->" + index + "   " + (this.state.data.tracingResults.length - 1))
        if (index === 0 || index === (this.state.data.tracingResults.length - 1)) {
            iconPoint = require("../../img/icon_point1.png");
        } else {
            iconPoint = require("../../img/icon_point2.png");
        }

        let icon;
        switch (data.identity) {
            case "MANUFACTURER":
                icon = require("../../img/info_distillery.png");
                break;
            case "LOGISTICS":
                icon = require("../../img/info_logistics.png");
                break;
            case "CUSTOMS":
                icon = require("../../img/info_customs.png");
                break;
            case "DEALER":
                icon = require("../../img/info_shops.png");
                break;
        }

        let lineV = index !== this.state.data.tracingResults.length - 1 ? <View style={[{
            width: 1,
            marginTop: -3,
            backgroundColor: "#C5C5C5"
        }, styles.flexDirectionColumn]}/> : <View/>;

        let contentV;

        if (index === 0) {
            contentV = <View style={[styles.flexDirectionColumnNotFlex, {marginLeft: 10}]}>
                <Text
                    style={[{marginTop: -3}, styles.subSmallText]}>Product</Text>
                <Text
                    style={[styles.smallTextBlack, {marginTop: -3}]}>Manuka Honey</Text>
                <Text
                    style={[{marginTop: 17}, styles.subSmallText]}>Batch</Text>
                <Text
                    style={[styles.smallTextBlack, {marginTop: -3}]}>2 tons</Text>
            </View>
        } else if (index === 1) {
            contentV = <View style={[styles.flexDirectionColumnNotFlex, {marginLeft: 10}]}>
                <Text
                    style={[{marginTop: 20}, styles.subSmallText]}>Logistic Provider</Text>
                <Text
                    style={[styles.smallTextBlack, {marginTop: -3}]}>DB Schenker</Text>
            </View>
        } else {
            contentV = <View style={[styles.flexDirectionColumnNotFlex, {marginLeft: 10}]}>
                <Text
                    style={[{marginTop: 20}, styles.subSmallText]}>Retailer</Text>
                <Text
                    style={[styles.smallTextBlack, {marginTop: -3}]}>Woolworths</Text>
            </View>
        }

        let imageView = <Image style={[{height: 75, width: 75,}]}
                               source={{uri: data.imgUrl}}
                               resizeMode={"center"}/>;

        let touchImage = data.identity === "MANUFACTURER" ? <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                                                              onPress={() => {
                                                                                  Actions.AboutHistoryPage({"responseStr": JSON.stringify(this.state.data.product)})
                                                                              }}>
            {imageView}
        </TouchableOpacity> : imageView;

        return (
            <View
                style={[{paddingHorizontal: Constant.normalMarginEdge}, styles.flexDirectionRowNotFlex]}>
                <Image source={icon}
                       style={{height: 20, width: 20, marginTop: 40}}/>

                <View
                    style={[{marginLeft: 2}, styles.flexDirectionColumnNotFlex, styles.centerH]}>
                    {lineH}
                    <Image source={iconPoint}
                           style={{height: 15, width: 15, marginTop: index !== 0 ? 0 : 45}}/>

                    {lineV}
                </View>
                <ImageBackground source={require("../../img/frame_bg.png")} style={[{
                    marginLeft: 15,
                    marginTop: 20, width: 275
                }]}
                                 resizeMode={"stretch"}>

                    <View
                        style={[{
                            width: 275,
                            paddingVertical: 15,
                            paddingLeft: 20,
                            paddingRight: 15,
                        }, styles.flexDirectionColumn]}>
                        <Text style={[styles.subMinText]}>{data.time}</Text>
                        <Text style={[styles.subSmallText]}>{identity}</Text>
                        <Text style={[styles.normalTextBlack_Charter]}>{data.name}</Text>

                        <View
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

                            {contentV}
                        </View>

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

    _renderScene = ({route}) => {
        switch (route.key) {
            case '1':
                let dataList = this.state.data.tracingResults;
                let items = [];
                dataList.forEach((data, index) => {
                    items.push(this._renderItem(index, data))
                });

                return (
                    <View style={{backgroundColor: Constant.grayBg, paddingBottom: 50}}>
                        {items}
                    </View>
                );
            case '2':
                return (
                    <View style={{backgroundColor: Constant.grayBg, height: screenWidth * 1.3}}>
                        <Image style={[{height: screenWidth * 1.3, width: screenWidth}]}
                               source={require("../../img/map.png")}
                               resizeMode={"cover"}/>

                    </View>
                );
        }
    }

    _reader() {
        return (
            <ScrollView>
                <View style={styles.mainBox}>
                    <View style={[{
                        paddingHorizontal: 3 * Constant.normalMarginEdge,
                        paddingTop: 2 * Constant.normalMarginEdge,
                        backgroundColor: Constant.white,
                    }]}>

                        <CommonProductHeader data={this.state.data.product}
                                             iconPress={() => {
                                                 Actions.AboutHistoryPage({"responseStr": JSON.stringify(this.state.data.product)})
                                             }}/>

                        <View style={[styles.flexDirectionRowNotFlex, {marginTop: 8}]}>
                            <Text style={[styles.subMinText,]}>{I18n("Batch_Produced_by")}</Text>
                            <Text
                                style={[styles.minTextBlack, {marginLeft: 3}]}>{this.state.data.product.manufacturerName}</Text>
                        </View>
                        <View style={[styles.flexDirectionRowNotFlex, {marginTop: 8}]}>
                            <Text style={[styles.subMinText,]}>{I18n("Quantity")}</Text>
                            <Text style={[styles.minTextBlack, {marginLeft: 3}]}>12</Text>
                        </View>
                        <View style={[styles.flexDirectionRowNotFlex, {marginTop: 8}]}>
                            <Text style={[styles.subMinText,]}>{I18n("Produced")}</Text>
                            <Text style={[styles.minTextBlack, {marginLeft: 3}]}>3 months ago</Text>
                        </View>
                    </View>

                    <TabView
                        style={{
                            flex: 1,
                            // height: this.state.index === 0 ? 240 * 3 + 100 : screenWidth * 1.3
                        }}
                        lazy={true}
                        swipeEnabled={true}
                        navigationState={this.state}
                        renderScene={this._renderScene.bind(this)}
                        renderTabBar={this._renderHeader}
                        renderPager={this._renderPager}
                        onIndexChange={this._handleIndexChange}
                        initialLayout={{
                            height: 0,
                            width: Dimensions.get('window').width,
                        }}
                        useNativeDriver
                    />
                </View>
            </ScrollView>
        )
    }
}

export default ProductHistoryPage
