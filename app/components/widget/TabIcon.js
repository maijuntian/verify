/**
 * Created by mai on 2017/2/10.
 */

import React, {
    Component,
} from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    Image,
    View,
} from 'react-native';

import * as Constant from '../../style/constant'
import styles from '../../style'
import I18n from '../../style/i18n'


const config = {
    ["tabHome"]: {["sel"]: "../../img/icon_home_s.png", ["nor"]: "../../img/icon_home_n.png"},
    ["tabMall"]: {["sel"]: "../../img/icon_home_s.png", ["nor"]: "../../img/icon_home_n.png"},
    ["tabMe"]: {["sel"]: "../../img/icon_home_s.png", ["nor"]: "../../img/icon_home_n.png"},
};

const propTypes = {
    focused: PropTypes.bool,
    title: PropTypes.string,
    tabName: PropTypes.string,
    tabIconName: PropTypes.string,
};

/**
 * 底部Tab
 */
class TabIcon extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let iconPath = config[this.props.tabIconName][this.props.focused ? "sel" : "nor"];
        console.log("iconPath==" + iconPath)

        let icon;
        if (this.props.tabIconName === "tabHome") {
            icon = this.props.focused ? require("../../img/icon_home_s.png") : require("../../img/icon_home_n.png")
        } else if (this.props.tabIconName === "tabMall") {
            icon = this.props.focused ? require("../../img/icon_mall_s.png") : require("../../img/icon_mall_n.png")
        } else {
            icon = this.props.focused ? require("../../img/icon_me_s.png") : require("../../img/icon_me_n.png")
        }

        let color = this.props.focused ? Constant.tabSelectedColor : Constant.tabUnSelectColor;

        return (
            <View style={styles.centered}>
                <Image source={icon}
                       style={{width: 22, height: 18}}/>
                <Text style={[{color: color}, {fontSize: Constant.smallTextSize}]}>{this.props.title}</Text>
            </View>
        );
    }
}

TabIcon.propTypes = propTypes;

export default TabIcon;