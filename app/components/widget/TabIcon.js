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
    View, DeviceEventEmitter,
} from 'react-native';

import * as Constant from '../../style/constant'
import styles from '../../style'
import I18n from '../../style/i18n'
import vUserDao from "../../dao/vUserDao";
import AnalyticsUtil from "../../utils/AnalyticsUtil";


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

        this.state = {
            isRedPoint: false,
        };
    }

    initRedPoint() {
        vUserDao.getVersionUrl().then((res) => {
            this.setState({
                isRedPoint: !!res
            });
        })
    }

    componentWillUnmount() {
        this.subscription2.remove();
    }

    componentWillMount() {

        this.initRedPoint();
        this.subscription2 = DeviceEventEmitter.addListener(Constant.CHANGE_VERSION, () => {
            this.initRedPoint();
        });
    }

    render() {

        let icon;
        let tabTitle;
        let redView = <View/>;
        if (this.props.tabIconName === "tabHome") {
            icon = this.props.focused ? require("../../img/icon_home_s.png") : require("../../img/icon_home_n.png");
            tabTitle = I18n("home");
        } else if (this.props.tabIconName === "tabMall") {
            icon = this.props.focused ? require("../../img/icon_mall_s.png") : require("../../img/icon_mall_n.png");
            tabTitle = I18n("mall");
        } else {
            icon = this.props.focused ? require("../../img/icon_me_s.png") : require("../../img/icon_me_n.png");
            tabTitle = I18n("me");
            if (this.state.isRedPoint)
                redView = <View
                    style={[styles.absoluteFull, {
                        height: 5,
                        width: 5,
                        backgroundColor: 'red',
                        borderRadius: 2.5,
                        marginLeft: Constant.APP_TYPE === 2 ? 25 : 40
                    }]}/>;
        }

        let color = this.props.focused ? Constant.tabSelectedColor : Constant.tabUnSelectColor;


        return (
            <View style={styles.centered}>
                <Image source={icon}
                       style={{width: 22, height: 18}}/>
                <Text style={[{color: color}, {fontSize: Constant.smallTextSize}]}>{tabTitle}</Text>
                {redView}
            </View>
        );
    }
}

TabIcon.propTypes = propTypes;

export default TabIcon;