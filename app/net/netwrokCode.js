import {Actions} from "react-native-router-flux";
import I18n from '../style/i18n'
import Toast from '../components/common/ToastProxy'

//网络错误
export const NETWORK_ERROR = 1;
//网络超时
export const NETWORK_TIMEOUT = 2;
//网络返回数据格式化一次
export const NETWORK_JSON_EXCEPTION = 3;


export const SUCCESS = 200;


export default function (code, statusText) {

    return {
        code: code,
        message: I18n('netError'),
    }
}