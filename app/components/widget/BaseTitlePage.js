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
        this._rightPress = this._rightPress.bind(this);
        this._isRightPress = this._isRightPress.bind(this);
    }

    _title() {
        return "";
    }

    _leftPress() {
        Actions.pop();
    }

    _isRightPress() {
        return false;
    }

    _rightPress() {

    }

    _reader() {

    }

    _isBackground() {
        return true;
    }

    render() {
        return (
            <View style={this._isBackground() ? styles.mainBox : styles.mainBox2}>
                <CommonTitleBar title={this._title()}
                                onLeftPress={this._leftPress}
                                onRightPress={this._isRightPress() ? this._rightPress : null}/>
                {this._reader()}
            </View>
        )
    }
}

export default BaseTitlePage
