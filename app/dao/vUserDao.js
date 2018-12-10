import Api from '../net'
import {API} from "../style/constant";
import {AsyncStorage} from "react-native";
import * as Constant from "../style/constant";


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

const localUserInfo = async () => {
    let userInfo = await AsyncStorage.getItem(Constant.USER_INFOV);
    if (userInfo) {
        return JSON.parse(userInfo);
    }
    return {};
}

const pointsHistory = async () => {
    let res = await Api.getFetch(API + "/user/points/collect");
    return res.data;
}

const addressList = async () => {
    let res = await Api.getFetch(API + "/user/info/address");
    return res.data;
}

const giftList = async (params) => {
    let res = await Api.getFetch(API + "/user/info/redeem/records" + params);
    if(res.data.code === 200){
        res.data = res.data.data.list;
    }
    return res.data;
}


export default {
    login,
    userinfo,
    localUserInfo,
    pointsHistory,
    addressList,
    giftList,
}