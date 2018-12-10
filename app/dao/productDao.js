import Api from '../net'
import Address from '../net/address'
import {API} from "../style/constant";

const authenticationDao = async (url) => {
    let res = await Api.netFetch(url);
    return res.data;
};

const mallDaoGet = async (url, ) => {
    let res = await Api.netFetch(API +"mall/"+ url, "POST");
    if(res.data.code === 200){
        res.data = res.data.data.list;
    }
    return res.data;
}


export default {
    authenticationDao,
    mallDaoGet,
}