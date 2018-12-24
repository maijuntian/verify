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

const giftList = async (params) => {
    let res = await Api.getFetch(API + "/user/info/redeem/records?" + params);
    if (res.data.code === 200) {
        res.data.data = res.data.data.list;
    }
    return res.data;
}

const updateInfo = async (params) => {
    let res = await Api.netFetch(API + "/user/info/base/update", "POST", params, true, null, false);
    return res.data;
}

//
const getCheckInRecord = async () => {

    let startMoment = moment().subtract(moment().format("D")-1, "days").hour(0).minute(0).second(0);
    let startTime = startMoment.format(Constant.TIME_FORMAT);
    console.log("startTime--->" + startTime);


    let endTime = startMoment.add(1, "months").subtract(1, "days").hour(23).minute(59).second(59).format(Constant.TIME_FORMAT);
    console.log("endTime--->" + endTime);

     let res = await Api.netFetch(API + "/user/check-in/record", "POST", {
         "startTime": startTime,
         "endTime": endTime, "pageNum": 1, "pageSize": 31
     }, false, null, false);
     if (res.data.code === 200) {
         res.data.data = res.data.data.list;
     }
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
    giftList,
    getCheckInRecord,
}