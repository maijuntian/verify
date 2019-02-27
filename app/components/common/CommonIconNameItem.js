import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, Image
} from 'react-native';
import styles from "../../style/index"
import PropTypes from 'prop-types';
import * as Constant from '../../style/constant'

/**
 * 垂直两行图标按键item
 */
class CommonIconNameItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        let icon;

        switch (this.props.iconIndex) {
            case "0":
                icon = require("../../img/icon_traceability2.png");
                break;
            case "1":
                icon = require("../../img/anti_fake1.png");
                break;
            case "2":
                icon = require("../../img/nfc_anti_fake1.png");
                break;
        }

        return (


            <View style={[...this.props.itemStyle]}>
                <TouchableOpacity activeOpacity={Constant.activeOpacity} style={[styles.centered, {width: 100, height: 100}]} onPress={() => {
                    this.props.onItemPress && this.props.onItemPress();
                }}>
                    <Image source={icon} style={[{width: 100, height: 100},]}/>
                </TouchableOpacity>

                <Text
                    style={[{color: "#404040"},  {fontSize: Constant.minTextSize}]}>{this.props.itemTitle}</Text>
            </View>
        )
    }
}

CommonIconNameItem.propTypes = {
    itemStyle: PropTypes.any,
    iconIndex: PropTypes.string,
    itemTitle: PropTypes.string,
    onItemPress: PropTypes.func,
};

export default CommonIconNameItem;