import Api from '../net'
import {API} from "../style/constant";
import {AsyncStorage, DeviceEventEmitter} from "react-native";
import * as Constant from "../style/constant";
import moment from "moment";

const login = async (username, password) => {
    let res = await Api.netFetch(API + "/user/auth/login", "POST", {
        username: username,
        password: password
    }, true, null, false);
    return res.data;
}

const phoneLogin = async (phone, code) => {
    let res = await Api.netFetch(API + "/user/auth/login/phone", "POST", {
        phone: phone,
        code: code
    }, true, null, false);
    return res.data;
}


const userinfo = async () => {
    let res = await Api.getFetch(API + "/user/info");
    if (res.data.code === 200) {
        AsyncStorage.setItem(Constant.USER_INFOV, JSON.stringify(res.data.data));
    }
    return res.data;
}
const clearInfo = () => {
    Api.clearAuthorization();
    AsyncStorage.removeItem(Constant.USER_INFOV);
}

const saveLocalUserInfo = async (data) => {
    return AsyncStorage.setItem(Constant.USER_INFOV, JSON.stringify(data));
}

const localUserInfo = async () => {
    let userInfo = await AsyncStorage.getItem(Constant.USER_INFOV);
    if (userInfo) {
        return JSON.parse(userInfo);
    }
    return {};
}

const isLogin = (userInfo) => {
    if (!userInfo || JSON.stringify(userInfo) === "{}") {
        return false;
    }
    return true;
}

const isLoginAsync = async () => {
    let userInfo = await AsyncStorage.getItem(Constant.USER_INFOV);
    return !!userInfo;
}

const pointsHistory = async (params) => {
    let res = await Api.getFetch(API + "/user/points?" + params);
    if (res.code === 200) {
        res.data.data = res.data.data.list;
    }
    return res.data;
}

const addressList = async (params) => {
    let res = await Api.getFetch(API + "/user/info/address?" + params);
    if (res.data.code === 200) {
        res.data.data = res.data.data.list;
    }
    return res.data;
}

const saveAddress = async (params) => {
    let res = await Api.netFetch(API + "/user/info/address", (params.id === null || params.id === "") ? "POST" : "PUT", params, true, null, false);
    return res.data;
}

const deleteAddress = async (id) => {
    let res = await Api.netFetch(API + "/user/info/address/" + id, "DELETE", null, false, null, false);
    return res.data;
}

const getDefaultAddress = async () => {
    let res = await Api.getFetch(API + "/user/info/address/default");
    return res.data;
}


const giftList = async (params) => {
    let res = await Api.getFetch(API + "/user/redeem?" + params);
    if (res.data.code === 200) {
        res.data.data = res.data.data.list;
    }
    return res.data;
}

const authRecord = async (params) => {
    let res = await Api.getFetch(API + "/user/source/authentication?" + params);
    if (res.data.code === 200) {
        res.data.data = res.data.data.list;
    }
    return res.data;
}


const updateInfo = async (params) => {
    let res = await Api.netFetch(API + "/user/info/base", "PUT", params, true, null, false);
    return res.data;
}

const updateInfoPhone = async (params) => {
    let res = await Api.netFetch(API + "/user/info/base/phone", "PUT", params, true, null, false);
    return res.data;
}

const updateAvatar = async (uri) => {
    let file = {uri: uri, type: 'multipart/form-data', name: "image.png"};
    let formData = new FormData();
    formData.append("file", file);
    let res = await Api.netFetch(API + "/user/info/base/avatar", "POST", formData, false, {"Content-Type": "multipart/form-data"}, false, true);
    return res.data;
}

//
const getCheckInRecord = async () => {

    let startMoment = moment().subtract(moment().format("D") - 1, "days").hour(0).minute(0).second(0);
    let startTime = startMoment.format(Constant.TIME_FORMAT);
    console.log("startTime--->" + startTime);

    let endTime = startMoment.add(1, "months").subtract(1, "days").hour(23).minute(59).second(59).format(Constant.TIME_FORMAT);
    console.log("endTime--->" + endTime);

    let params = "startTime=" + startTime + "&endTime=" + endTime + "&pageNum=1&pageSize=31";
    let res = await Api.getFetch(API + "/user/check-in?" + params);
    if (res.data.code === 200) {
        res.data.data = res.data.data.list;
    }
    return res.data;
}

const checkIn = async () => {
    let res = await Api.netFetch(API + "/user/check-in", "POST", {}, true, null, false);
    return res.data;
}

const redeem = async (code, params) => {
    let res = await Api.netFetch(API + "/mall/product/" + code + "/redeem", "POST", params, true, null, false);
    return res.data;
}

const snsCode = async (phone) => {
    let res = await Api.netFetch(API + "/system/sns/verification/" + phone, "POST", null, true, null, false);
    return res.data;
}

const emailCode = async (email) => {
    let res = await Api.netFetch(API + "/system/email/verification/" + email, "POST", null, true, null, false);
    return res.data;
}

const emailCode2 = async (email) => {
    let res = await Api.netFetch(API + "/system/email/reset/password/" + email, "POST", null, true, null, false);
    return res.data;
}

const phoneRegister = async (name, password, verificationCode) => {

    let res = await Api.netFetch(API + "/system/register/phone", "POST", {
        name: name,
        password: password,
        verificationCode: verificationCode
    }, true, null, false);
    return res.data;
}

const resetPwd = async (name, password, verificationCode) => {

    let res = await Api.netFetch(API + "/system/reset/password", "POST", {
        account: name,
        password: password,
        code: verificationCode
    }, true, null, false);
    return res.data;
}

const emailRegister = async (name, password, verificationCode) => {

    let res = await Api.netFetch(API + "/system/register/email", "POST", {
        name: name,
        password: password,
        verificationCode: verificationCode
    }, true, null, false);
    return res.data;
}

const region = async () => {
    let res = await Api.getFetch(API + "/system/region");
    return res.data;
}

const version = async (version) => {
    let res = await Api.getFetch(API + "/system/app/version/" + version);
    return res.data;
}

const saveVersionUrl = async (url) => {
    AsyncStorage.setItem(Constant.VERSION_URL, url);
    return true;
}

const removeVersionUrl = async () => {
    AsyncStorage.removeItem(Constant.VERSION_URL);
    return true;
}

const getVersionUrl = async () => {
    return AsyncStorage.getItem(Constant.VERSION_URL);
}

const hasAlarmVersion = async (version) => {
    return AsyncStorage.getItem(version + "alarm");
}

const saveAlarmVersion = async (version) => {
    AsyncStorage.setItem(version + "alarm", version);
    return true;
}


const facebookLogin = async (params) => {
    let res = await Api.netFetch(API + "user/auth/login/facebook", "POST", params, true, null, false);
    return res.data;
};


const googleLogin = async (params) => {
    let res = await Api.netFetch(API + "/user/auth/login/google", "POST", params, true, null, false);
    return res.data;
};

export default {
    isLogin,
    isLoginAsync,
    login,
    phoneLogin,
    userinfo,
    localUserInfo,
    saveLocalUserInfo,
    updateInfo,
    updateInfoPhone,
    pointsHistory,
    addressList,
    saveAddress,
    deleteAddress,
    getDefaultAddress,
    giftList,
    getCheckInRecord,
    authRecord,
    updateAvatar,
    checkIn,
    redeem,
    snsCode,
    phoneRegister,
    emailCode,
    emailCode2,
    emailRegister,
    clearInfo,
    resetPwd,
    region,
    version,
    saveVersionUrl,
    removeVersionUrl,
    getVersionUrl,
    hasAlarmVersion,
    saveAlarmVersion,
    facebookLogin,
    googleLogin,
}