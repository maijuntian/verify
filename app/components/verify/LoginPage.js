/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, StatusBar, TouchableOpacity, TextInput} from "react-native";
import styles, {screenHeight, screenWidth, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import CommonIconText from "../common/CommonIconText";
import * as constant from "../../style/constant";


/**
 * 登录
 */
class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: "",
        }
    }

    render() {

        let iconWidth = screenWidth * 0.417;
        let iconHeight = iconWidth * 0.6111;

        let inputIconWidth = 20;
        let dividerWidth = screenWidth - 76;
        let inputWidth = dividerWidth - inputIconWidth;
        return (
            <View style={[{backgroundColor: "#f4f3f4"}, styles.flexDirectionColumn, styles.centerH]}>
                <StatusBar hidden={true}/>
                <Image source={require("../../img/logo.png")}
                       resizeMode={"stretch"}
                       style={{marginTop: 70 + statusHeight, width: iconWidth, height: iconHeight}}/>

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
                                paddingVertical:5,
                            }]}
                            underlineColorAndroid='transparent'
                            placeholder={i18n("Mobile_number")}
                            onChangeText={(text) => this.setState({account: text})}
                            value={this.state.account}/>
                        <Image style={[{height: inputIconWidth, width: inputIconWidth,}]}
                               resizeMode={"center"}
                               source={require("../../img/icon_search.png")}/>
                    </View>
                    <View style={[styles.dividerLineE6, {width: dividerWidth}]}/>

                    <View style={[{marginTop: 15}, styles.flexDirectionRowNotFlex, styles.centerH,]}>
                        <TextInput
                            style={[styles.middleTexBlack, {
                                width: inputWidth,
                                paddingVertical:5,
                            }]}
                            underlineColorAndroid='transparent'
                            placeholder={i18n("Password")}
                            onChangeText={(text) => this.setState({account: text})}
                            value={this.state.account}/>
                        <Image style={[{height: inputIconWidth, width: inputIconWidth}]}
                               resizeMode={"center"}
                               source={require("../../img/icon_search.png")}/>
                    </View>
                    <View style={[styles.dividerLineE6, {width: dividerWidth}]}/>
                    <View style={[{marginTop: 15}, styles.flexDirectionRowNotFlex, styles.centerH,]}>
                    </View>
                </View>
            </View>
        )
    }
}

export default LoginPage
