/**
 * Created by mai on 2017/11/11.
 */

import moment from 'moment';
import I18n from '../style/i18n'
import * as Constant from "../style/constant";

const second = 1000;
const min = second * 60;
const hour = min * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 30 * 11;

/**
 * 时间转化
 */
export function resolveTime(longTime) {
    if (!longTime)
        return "";
    let now = moment().toDate().getTime();
    let time = moment(longTime).toDate().getTime();
    let delta = now - time;
    return calcTimer(delta, time)
}


function calcTimer(delta, ori) {
    let res = '';
    let list = Object.keys(calculator).sort((a, b) => b - a);
    for (let i = 0, key = list[i]; key; key = list[++i]) {
        if (delta > key) {
            let a = Math.floor(delta / key);
            let b = delta % key;
            res = calculator[key](a, b, ori);
            break
        }
    }
    if (res === '') {
        res = I18n('justNow')
    }
    return res
}

const calculator = {
    [year]: (a, b, ori) => {
        return moment(ori).format('YYYY-MM-DD')
    },
    [week]: (a, b, ori) => {
        return moment(ori).format('MM-DD HH:mm')
    },
    [day]: (a, b, ori) => {
        return a + I18n('daysAgo')
    },
    [hour]: (a, b) => {
        return a + I18n('hoursAgo')
    },
    [min]: (a, b) => {
        return a + I18n('minutesAgo')
    },
    [second]: (a, b) => {
        return I18n('justNow')
    }
};


/**
 * 时间转化
 */
export default function formatDate(date) {
    if (!date)
        return "";
    return moment(date, Constant.EN_DATE_FORMAT).format(Constant.DATE_FORMAT);
}

export const isBehind = (before, next) => {
    let beforeDay = moment(before, Constant.EN_DATE_FORMAT).get("dayOfYear");
    let nextDay = moment(next, Constant.EN_DATE_FORMAT).get("dayOfYear");
    let beforeDay2 = moment(before, Constant.EN_DATE_FORMAT).get("day");
    let nextDay2 = moment(next, Constant.EN_DATE_FORMAT).get("day");
    return beforeDay === nextDay - 1 && beforeDay2 === nextDay2 - 1;
}
