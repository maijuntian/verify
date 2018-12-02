import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import * as Constant from '../../style/constant'
import Icon from 'react-native-vector-icons/Feather'
import styles, {navBarHeight, statusHeight} from "../../style";

/**
 * 标题栏
 */
class CommonTitleBar extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        let rightIcon = this.props.onRightPress ? <View style={[styles.flexDirectionRow, styles.justifyEnd]}>
            <TouchableOpacity
                style={[{height: 25, width: 25, marginRight: 8}]}
                onPress={() => {
                    this.props.onLeftPress && this.props.onLeftPress();
                }}>
                <Icon
                    name={"check"}
                    backgroundColor={Constant.transparentColor}
                    color={Constant.primaryBlackColor} size={25}
                    style={[styles.centered,]}/>
            </TouchableOpacity>

        </View> : <View/>;

        return (

            <View style={[{
                backgroundColor: Constant.mainBackgroundColor,
                height: navBarHeight,
                paddingTop: statusHeight
            }, styles.centerV, styles.flexDirectionRowNotFlex]}>
                <TouchableOpacity
                    style={{height: 25, width: 25, marginLeft: 8}}
                    onPress={() => {
                        this.props.onLeftPress && this.props.onLeftPress();
                    }}>
                    <Icon
                        name={"chevron-left"}
                        backgroundColor={Constant.transparentColor}
                        color={Constant.primaryBlackColor} size={25}
                        style={[styles.centered,]}/>
                </TouchableOpacity>

                {rightIcon}

                <View style={[styles.absoluteFull, {
                    zIndex: -999,
                    paddingTop: statusHeight
                }, styles.centered]}>
                    <Text style={styles.normalTextBlack_Charter}>{this.props.title}</Text>
                </View>
            </View>

        )
    }
}

CommonTitleBar.propTypes = {
    title: PropTypes.string,
    onLeftPress: PropTypes.func,
    onRightPress: PropTypes.func,
};

export default CommonTitleBar;