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
export const fontFamilyPingFang = "PingFang";

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
    sminText9Dgray: {
        color: constant.gray9d,
        fontSize: constant.sminTextSize
    },
    smallTextWhite: {
        color: constant.TextColorWhite,
        fontSize: constant.smallTextSize
    },
    smallTextGray: {
        color: constant.textGray,
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
    subLightSMinText: {
        color: constant.subLightTextColor,
        fontSize: constant.sminTextSize
    },
    miLightSmallText: {
        color: constant.miWhite,
        fontSize: constant.smallTextSize
    },
    subSmallText: {
        color: constant.subTextColor,
        fontSize: constant.smallTextSize
    },
    gray6ASmallText: {
        color: constant.gray6A,
        fontSize: constant.smallTextSize
    },
    subMinText: {
        color: constant.subTextColor,
        fontSize: constant.minTextSize,
    },
    b40MinText: {
        color: constant.black40,
        fontSize: constant.minTextSize,
    },
    subsMinText: {
        color: constant.subTextColor,
        fontSize: constant.sminTextSize,
    },
    middleText: {
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
    normalTextBlack_PingFang: {
        color: constant.primaryBlackColor,
        fontSize: constant.normalTextSize,
        fontFamily: fontFamilyPingFang,
    },
    minTextBlack: {
        color: constant.primaryBlackColor,
        fontSize: constant.minTextSize,
    },
    minTextBlack_Charter: {
        color: constant.primaryBlackColor,
        fontSize: constant.minTextSize,
        fontFamily: fontFamilyCharter,
    },
    minTextsGray: {
        color: constant.textGray,
        fontSize: constant.minTextSize,
    },
    minTextsGray_PingFang: {
        color: constant.textGray,
        fontSize: constant.minTextSize,
        fontFamily:fontFamilyPingFang,
    },

    minTextWhite: {
        color: constant.white,
        fontSize: constant.minTextSize,
    },
    sminTextWhite: {
        color: constant.white,
        fontSize: constant.sminTextSize,
    },
    sminTextBlack: {
        color: constant.primaryBlackColor,
        fontSize: constant.sminTextSize,
    },
    middleTextWhite: {
        color: constant.TextColorWhite,
        fontSize: constant.middleTextWhite
    },
    middleTextGray: {
        color: constant.textGray,
        fontSize: constant.middleTextWhite
    },
    middleTexBlack: {
        color: constant.primaryBlackColor,
        fontSize: constant.middleTextWhite,
    },
    middleTexBlackCharter: {
        color: constant.primaryBlackColor,
        fontSize: constant.middleTextWhite,
        fontFamily: fontFamilyCharter,
    },
    middleTextGrayBlueCharter: {
        color: constant.grayBlue,
        fontSize: constant.middleTextWhite,
        fontFamily: fontFamilyCharter,
    },
    smallTextGrayBlue: {
        color: constant.grayBlue,
        fontSize: constant.smallTextSize,
    },
    middleTextGrayBlue: {
        color: constant.grayBlue,
        fontSize: constant.middleTextWhite,
    },
    middleTextGrayBlue_PingFang: {
        color: constant.grayBlue,
        fontSize: constant.middleTextWhite,
        fontFamily: fontFamilyPingFang,
    },
    middleTextBlackCharter: {
        color: constant.primaryBlackColor,
        fontSize: constant.middleTextWhite,
        fontFamily: fontFamilyCharter,
    },
    normalTextGrayCharter: {
        color: constant.text_gray,
        fontSize: constant.normalTextSize,
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
    shadowCard_login: {
        shadowColor: constant.lineColor,
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.13,
        shadowRadius: shadowRadius,
        elevation: 4,
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

    dividerLine: {
        width: screenWidth,
        height: 0.5,
        backgroundColor: "#A1A2B6"
    },

    dividerLineF6: {
        width: screenWidth,
        height: 1,
        backgroundColor: "#F6F6F6"
    },

    dividerLineF65: {
        width: screenWidth,
        height: 0.5,
        backgroundColor: "#F6F6F6"
    },

    dividerLineE3: {
        width: screenWidth,
        height: 1,
        backgroundColor: "#E3E3E3"
    },
    dividerLineE6: {
        width: screenWidth,
        height: 1,
        backgroundColor: "#E6E6E6"
    }
});

export default styles;

