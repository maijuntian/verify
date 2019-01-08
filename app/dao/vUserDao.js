import Api from '../net'
import {API} from "../style/constant";
import {AsyncStorage} from "react-native";
import * as Constant from "../style/constant";
import moment from "moment";

const login = async (username, password) => {
    let res = await Api.netFetch(API + "/user/auth/login", "POST", {
        username: username,
        password: password
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

const pointsHistory = async (params) => {
    let res = await Api.getFetch(API + "/user/points/collect?" + params);
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

const getDefaultAddress = async () => {
    let res = await Api.getFetch(API + "/user/info/address/default");
    return res.data;
}


const giftList = async (params) => {
    let res = await Api.getFetch(API + "/user/info/redeem/records?" + params);
    if (res.data.code === 200) {
        res.data.data = res.data.data.list;
    }
    return res.data;
}

const authRecord = async (params) => {
    let res = await Api.getFetch(API + "/user/auth/record?" + params);
    if (res.data.code === 200) {
        res.data.data = res.data.data.list;
    }
    return res.data;
}


const updateInfo = async (params) => {
    let res = await Api.netFetch(API + "/user/info/base", "PUT", params, true, null, false);
    return res.data;
}

const updateAvatar = async (uri) => {
    let file = {uri: uri, type: 'multipart/form-data', name: "image.png"};
    let formData = new FormData();
    formData.append("file", file);
    let res = await Api.netFetch(API + "/user/info/base/avatar", "PUT", formData, false, {"Content-Type": "multipart/form-data"}, false, true);
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
    let res = await Api.getFetch(API + "/user/check-in/record?" + params);
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
    let res = await Api.netFetch(API + "/mall/product/redeem?code=" + code, "POST", params, true, null, false);
    return res.data;
}


export default {
    login,
    userinfo,
    localUserInfo,
    saveLocalUserInfo,
    updateInfo,
    pointsHistory,
    addressList,
    saveAddress,
    getDefaultAddress,
    giftList,
    getCheckInRecord,
    authRecord,
    updateAvatar,
    checkIn,
    redeem
}