import Api from '../net'
import Address from '../net/address'
import {API} from "../style/constant";

const authenticationDao = async (url) => {
    let res = await Api.netFetch(url);
    return res.data;
};

const mallDaoGet = async (url, ) => {
    let res = await Api.netFetch(API +"mall/"+ url, "POST");
    return res.data;
}

export default {
    authenticationDao,
    mallDaoGet
}