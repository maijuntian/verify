/**
 * Created by mai on 2017/11/7.
 */
import React, {StyleSheet, Dimensions, PixelRatio, Platform, StatusBar} from "react-native";
import * as constant from "./constant"

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;
export const navBarHeight = (Platform.OS === 'ios') ? constant.iosnavHeaderHeight : constant.andrnavHeaderHeight;
export const statusHeight = (Platform.OS === 'android') ? StatusBar.currentHeight : 25;
export const drawerWidth = screenWidth / 3 * 2;

export const shadowRadius = (Platform.OS === 'android') ? 5 : 2;
export const elevation = (Platform.OS === 'android') ? 2 : 1;

export const fontFamilyCharter = "Charter";

const styles = StyleSheet.create({
    routerStyle: {
        //设置router的样式
        flex: 1,
        backgroundColor: constant.mainBackgroundColor,
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,

    },
    navigationBar: {
        backgroundColor: constant.primaryColor,
        paddingTop: StatusBar.currentHeight,
        height: navBarHeight,
    },
    titleTextStyle: {
        color: constant.titleTextColor,
        fontSize: constant.normalTextSize,
        fontWeight: "bold"
    },
    mainBgColor: {
        backgroundColor: constant.white
    },
    mainBox: {
        backgroundColor: constant.white,
        flex: 1
    },
    flex: {
        flex: 1,
    },
    flexDirectionRow: {
        flexDirection: 'row',
        flex: 1,
    },
    flexDirectionColumn: {
        flexDirection: "column",
        flex: 1,
    },
    flexDirectionRowNotFlex: {
        flexDirection: 'row',
    },
    flexDirectionColumnNotFlex: {
        flexDirection: "column",
    },
    justifyCenter: {
        justifyContent: "center"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center"
    },
    centerV: {
        justifyContent: "center",
    },
    centerH: {
        alignItems: "center"
    },
    justifyBetween: {
        justifyContent: "space-between"
    },
    alignItemsEnd: {
        alignItems: "flex-end"
    },
    justifyEnd: {
        justifyContent: "flex-end"
    },
    welcomeText: {
        color: constant.primaryColor,
        fontSize: constant.largetTextSize,
        fontWeight: "bold",
        textAlign: "center",
    },
    smallTextWhite: {
        color: constant.TextColorWhite,
        fontSize: constant.smallTextSize
    },
    smallText: {
        color: constant.mainTextColor,
        fontSize: constant.smallTextSize
    },
    smallTextBlack: {
        color: constant.primaryBlackColor,
        fontSize: constant.smallTextSize
    },
    subLightSmallText: {
        color: constant.subLightTextColor,
        fontSize: constant.smallTextSize
    },
    miLightSmallText: {
        color: constant.miWhite,
        fontSize: constant.smallTextSize
    },
    subSmallText: {
        color: constant.subTextColor,
        fontSize: constant.smallTextSize
    },
    subMinText: {
        color: constant.subTextColor,
        fontSize: constant.minTextSize,
    },
    subsMinText: {
        color: constant.subTextColor,
        fontSize: constant.sminTextSize,
    },
    middleText: {
        color: constant.mainTextColor,
        fontSize: constant.middleTextWhite
    },
    normalText: {
        color: constant.mainTextColor,
        fontSize: constant.normalTextSize
    },
    subNormalText: {
        color: constant.subTextColor,
        fontSize: constant.normalTextSize
    },
    normalTextWhite: {
        color: constant.TextColorWhite,
        fontSize: constant.normalTextSize
    },
    normalTextMitWhite: {
        color: constant.miWhite,
        fontSize: constant.normalTextSize
    },
    normalTextLight: {
        color: constant.primaryLightColor,
        fontSize: constant.normalTextSize
    },
    normalTextBlack: {
        color: constant.primaryBlackColor,
        fontSize: constant.normalTextSize
    },
    normalTextBlack_Charter: {
        color: constant.primaryBlackColor,
        fontSize: constant.normalTextSize,
        fontFamily: fontFamilyCharter,
    },
    minTextBlack: {
        color: constant.primaryBlackColor,
        fontSize: constant.minTextSize,
    },
    minTextsGray: {
        color: constant.textGray,
        fontSize: constant.minTextSize,
    },
    minTextWhite: {
        color: constant.white,
        fontSize: constant.minTextSize,
    },
    sminTextWhite: {
        color: constant.white,
        fontSize: constant.sminTextSize,
    },
    middleTextWhite: {
        color: constant.TextColorWhite,
        fontSize: constant.middleTextWhite
    },
    middleTexBlack: {
        color: constant.primaryBlackColor,
        fontSize: constant.middleTextWhite,
    },
    normalTextGrayCharter:{
        color: constant.text_gray,
        fontSize: constant.middleTextWhite,
        fontFamily: fontFamilyCharter,
    },

    largeText: {
        color: constant.mainTextColor,
        fontSize: constant.bigTextSize
    },
    largeTextWhite_Charter: {
        color: constant.TextColorWhite,
        fontSize: constant.bigTextSize,
        fontFamily: fontFamilyCharter,
    },

    largeTextWhite: {
        color: constant.TextColorWhite,
        fontSize: constant.bigTextSize
    },
    largeTextBlack: {
        color: constant.primaryBlackColor,
        fontSize: constant.bigTextSize
    },
    largeTextBlackCharter: {
        color: constant.primaryBlackColor,
        fontSize: constant.bigTextSize,
        fontFamily: fontFamilyCharter,
    },
    superLargeTextBlackCharter: {
        color: constant.primaryBlackColor,
        fontSize: constant.largetTextSize,
        fontFamily: fontFamilyCharter,
    },
    absoluteFull: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 999,
    },
    shadowCard: {
        shadowColor: constant.cardShadowColor,
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.7,
        shadowRadius: shadowRadius,
        elevation: 2,
        backgroundColor: constant.cardBackgroundColor
    },

    shadowText: {
        textShadowColor: constant.cardShadowColor,
        textShadowOffset: {width: 0, height: 0.4},
        textShadowRadius: 0.4
    },
    inCode: {
        color: constant.subTextColor,
        backgroundColor: '#eeeeee',
        borderColor: '#dddddd',
        borderRadius: 3,
        borderWidth: 1,
        padding: constant.normalMarginEdge,
    },
    pCode: {
        color: constant.subTextColor,
        backgroundColor: '#eeeeee',
        borderColor: '#cccccc',
        borderRadius: 1,
        borderWidth: 1,
        padding: constant.normalMarginEdge,
    },

    dividerLine:{
        width:screenWidth,
        height:0.5,
        backgroundColor:"#A1A2B6"
    }
});

export default styles;

