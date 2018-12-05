/**
 * Created by mai on 2017/11/7.
 */
import {NativeModules, Text} from 'react-native';
import I18n from 'react-native-i18n'
import React from "react";

const {RNI18n} = NativeModules;

I18n.fallbacks = true;

I18n.defaultLocale = "zh-CN";


I18n.translations = {
    'en': {
        appName: 'VerifyAPP',
        netError: 'network error',
        netTimeout: 'network timeout',
        ok: 'ok',
        cancel: 'cancel',

        doublePressExit: 'Click BACK again to exit.',
        loading: 'loading...',

        //========================
        home: "Home",
        mall: "Mall",
        me: "Account",
        traceabillity: "Traceabillity",
        Code_Authentication: "Code Authentication",
        tracing_results: "Tracing Results",
        anti_fake: "Authentication",
        nfc_anti_fake: "NFC Authentication",
        home_tip: "Powered by Viverify® Blockchain technology",
        Batch_Produced_by: "Manufacturer:",
        Quantity: "Quantity:",
        Produced: "Produced:",
        JOURNEY: "Map View",
        INFO: "INFO",
        About: "About",
        Scan_code: "Scan code",
        Feedback: "Feedback",
        Exchange_gifts: "Redeem Gifts",
        anti_fake_tip1: "Authentication",
        anti_fake_tip2: "Congratulations!",
        anti_fake_tip3: "This code has been verified. This is a genuine product.\nCongratulations on your purchase.\nYou get 100 points.",
        anti_fake_tip11: "Authentication",
        anti_fake_tip22: "Sorry!",
        anti_fake_tip33: "This code cannot be verified. This may not \nbe a genuine product.Please contact the seller, \nor provide your feedbacks to us.",
        Check_in: "Check-in",
        Personal: "Personal",
        Integral_detail: "Points Activity",
        My_prize: "My Gift",
        Verification_record: "Verification Record",
        Check_in_record: "Check-in Record",
        Rights_and_interests: "Ranks and Interests",
        Receiving_address: "Delivery Address",
        integral: "points",
        Integral: "Points",
        Grow_up: "Scores",
        Viverify_Code: "ViverifyCode",
        Rank: "Rank",
        Promotion: "Upgrade",
        Get: "Get",
        points_and_upgrade: "points and upgrade.",
        More: "More",
        illegalCodeTip: "You are not scanning a Viverify code.",
    },
    'zh-CN': {
        appName: 'VerifyAPP',
        netError: '网络错误',
        netTimeout: '网络超时',
        ok: '确定',
        cancel: '取消',

        doublePressExit: 'Click BACK again to exit.',
        loading: 'loading...',
        //========================
        home: "Home",
        mall: "Mall",
        me: "Account",
        traceabillity: "Traceabillity",
        Code_Authentication: "Code Authentication",
        tracing_results: "Tracing Results",
        anti_fake: "Authentication",
        nfc_anti_fake: "NFC Authentication",
        home_tip: "Powered by Viverify® Blockchain technology",
        Batch_Produced_by: "Manufacturer:",
        Quantity: "Quantity:",
        Produced: "Produced:",
        JOURNEY: "Map View",
        INFO: "INFO",
        About: "About",
        Scan_code: "Scan code",
        Feedback: "Feedback",
        Exchange_gifts: "Redeem Gifts",
        anti_fake_tip1: "Authentication",
        anti_fake_tip2: "Congratulations!",
        anti_fake_tip3: "This code has been verified. This is a genuine product.\nCongratulations on your purchase.\nYou get 100 points.",
        anti_fake_tip11: "Authentication",
        anti_fake_tip22: "Sorry!",
        anti_fake_tip33: "This code cannot be verified. This may not \nbe a genuine product.Please contact the seller, \nor provide your feedbacks to us.",
        Check_in: "Check-in",
        Personal: "Personal",
        Integral_detail: "Points Activity",
        My_prize: "My Gift",
        Verification_record: "Verification Record",
        Check_in_record: "Check-in Record",
        Rights_and_interests: "Ranks and Interests",
        Receiving_address: "Delivery Address",
        integral: "points",
        Integral: "Points",
        Grow_up: "Scores",
        Viverify_Code: "ViverifyCode",
        Rank: "Rank",
        Promotion: "Upgrade",
        Get: "Get",
        points_and_upgrade: "points and upgrade.",
        More: "More",
        illegalCodeTip: "You are not scanning a Viverify code.",
        Picture: "Picture",
        Name: "Name",
        Sexuality: "Sexuality",
        Birthday: "Birthday",
        Male: "Male",
        Female: "Female",
        Mobile_number: "Mobile number",
        Code: "Code",
        Verification_code: "Verification code",
        Agreed_to_user_agreement: "Agreed to user agreement",
        Login: "Login",
        Sign_in_with_Facebook: "Sign in with Facebook",
        Sing_in_with_Twitter: "Sing in with Twitter",
        send: "send",
        Search: "Search",
        Time: "Time",
        Detail: "Detail",
        refreshing: "Refreshing",
        listEmpty: "Empty",
        loadMoreing: "Loading",
        loadMoreEnd: "No more",
        Exchange: "Exchange",
    }
};

export const changeLocale = function (multilingual) {
    if (multilingual === 'local' || !multilingual) {
        if (__DEV__) {
            if (RNI18n !== undefined && typeof RNI18n !== 'undefined') {
                console.log("language system", RNI18n.languages[0])
            }
        }
        I18n.locale = (RNI18n !== undefined && typeof RNI18n !== 'undefined') ? RNI18n.languages[0].replace(/_/, '-') : ''
    } else {
        I18n.locale = multilingual
    }
    // for ios
    if (I18n.locale.indexOf('zh-Hans') !== -1) {
        I18n.locale = 'zh-CN'
    } else if (I18n.locale.indexOf('zh-Hant') !== -1 || I18n.locale === 'zh-HK' || I18n.locale === 'zh-MO') {
        I18n.locale = 'zh-CN'
    }


};

export default function (name, option1, option2) {
    return I18n.t(name, option1, option2)
}