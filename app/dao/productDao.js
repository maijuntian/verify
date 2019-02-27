import Api from '../net'
import Address from '../net/address'
import {API} from "../style/constant";

const authenticationDao = async (url) => {
    let res = await Api.netFetch(url);
    return res.data;
};

const mallDaoGet = async (url,) => {
    let res = await Api.netFetch(API + "mall/" + url, "GET");
    if (res.data.code === 200) {
        res.data.data = res.data.data.list;
    }
    return res.data;
}

const feedback = async (code, feedback) => {
    let res = await Api.netFetch(API + "/source/authentication/" + code + "/feedback", "POST", {"feedback": feedback}, true, null, false);
    return res.data;
}


export default {
    authenticationDao,
    mallDaoGet,
    feedback,
}