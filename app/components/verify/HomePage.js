/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, StatusBar, TouchableOpacity} from "react-native";
import styles, {screenHeight, screenWidth, statusHeight} from "../../style";
import * as Constant from "../../style/constant";
import CommonIconNameItem from "../common/CommonIconNameItem";
import {Actions} from 'react-native-router-flux';
import I18n from "../../style/i18n";

/**
 * 主页
 */
class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        iconWidth = screenWidth * 0.417;
        iconHeight = iconWidth*0.6622;
        return (
            <View style={[styles.mainBox, styles.centerH]}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'dark-content'}/>
                <Image source={require("../../img/logo.png")}
                       resizeMode={"stretch"}
                       style={[{height: iconHeight, width: screenWidth * 0.417, marginTop: 100 + statusHeight}]}/>


                <View style={[{marginTop: 70, marginLeft: 16, marginRight: 16}, styles.flexDirectionRowNotFlex]}>

                    <CommonIconNameItem
                        itemStyle={[styles.flex, styles.centered,]}
                        iconIndex={"1"}
                        itemTitle={I18n("Code_Authentication")}
                        onItemPress={() => {
                            Actions.jump("ScanQrCodePage");
                        }
                        }
                    />
                    <CommonIconNameItem
                        itemStyle={[styles.flex, styles.centered,]}
                        iconIndex={"2"}
                        itemTitle={I18n("nfc_anti_fake")}
                        onItemPress={() => {
                            console.log("test3")
                        }}/>
                </View>

                <View
                    style={[styles.absoluteFull, styles.centered, {
                        zIndex: -999,
                        justifyContent: "flex-end"
                    }, {marginBottom: 40}]}>
                    <Text style={[{color: "#C4C4C4", fontSize:12}]}>{I18n("home_tip")}</Text>
                </View>
            </View>
        )
    }
}

export default HomePage
