/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    WebView
} from "react-native";
import i18n from "../../style/i18n";
import BaseTitlePage from "../widget/BaseTitlePage";
import * as Constant from "../../style/constant";

/**
 * 登录
 */
class WebviewPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            title: this.props.title,
        }
    }


    _title() {
        return this.state.title;
    }

    _reader() {
        let headers = {"user-agent": "viverify"};
        headers.Region = Constant.REGION;

        if (Constant.latitude !== "" && Constant.longitude !== "") {
            headers.Gps = "longitude=" + Constant.longitude + ";latitude=" + Constant.latitude;
        }
        headers.Version = Constant.VERSION;
        if (Constant.DEVICE_ID !== "")
            headers.Device_Id = Constant.DEVICE_ID;
        return (
            <WebView source={{uri: this.state.url, headers: headers}}
                     startInLoadingState={true}/>
        )
    }
}

export default WebviewPage
