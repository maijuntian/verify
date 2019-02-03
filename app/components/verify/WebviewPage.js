/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    WebView
} from "react-native";
import i18n from "../../style/i18n";
import BaseTitlePage from "../widget/BaseTitlePage";

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

        return (
            <WebView source={{uri: this.state.url}}
                     startInLoadingState={true}/>
        )
    }
}

export default WebviewPage
