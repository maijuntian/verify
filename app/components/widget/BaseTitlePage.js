/**
 * Created by mai on 2017/11/10.
 */

import React, {Component} from 'react';
import {View} from "react-native";
import styles from "../../style";
import CommonTitleBar from "../common/CommonTitleBar";
import {Actions} from "react-native-router-flux";

/**
 * 基础title
 */
class BaseTitlePage extends Component {

    constructor(props) {
        super(props);

        this._title = this._title.bind(this);
        this._leftPress = this._leftPress.bind(this);
        this._reader = this._reader.bind(this);
        this._isBackground = this._isBackground.bind(this);
    }

    _title() {
        return "";
    }

    _leftPress() {
        Actions.pop();
    }

    _reader() {

    }

    _isBackground() {
        return true;
    }

    render() {
        return (
            <View style={this._isBackground() ? styles.mainBox : styles.flexDirectionColumn}>
                <CommonTitleBar title={this._title()}
                                onLeftPress={this._leftPress}/>
                {this._reader()}
            </View>
        )
    }
}

export default BaseTitlePage
