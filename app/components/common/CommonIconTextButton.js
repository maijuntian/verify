import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, Image
} from 'react-native';
import styles from "../../style/index"
import PropTypes from 'prop-types';
import * as Constant from '../../style/constant'

/**
 * 带图标的button
 */
class CommonIconTextButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        let activeOpacity = this.props.activeOpacity ? this.props.activeOpacity : Constant.activeOpacity;
        let width = this.props.width ? this.props.width : 150;
        return (

            <TouchableOpacity
                activeOpacity={activeOpacity}
                style={[{width: width}]} onPress={() => {
                this.props.onPress && this.props.onPress();
            }}>
                <View
                    style={[{
                        borderColor: "#D7D7D7",
                        borderWidth: 1,
                        borderRadius: 21,
                        paddingVertical: 8,
                    }, styles.flexDirectionRowNotFlex, styles.centered]}>
                    <Image source={this.props.icon} style={[[...this.props.iconStyle]]}/>
                    <Text style={[[...this.props.textStyle], {marginLeft: 5}]}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

CommonIconTextButton.propTypes = {
    icon: PropTypes.any,
    iconStyle: PropTypes.any,
    text: PropTypes.string,
    textStyle: PropTypes.any,
    onPress: PropTypes.func,
    width: PropTypes.number,
    activeOpacity: PropTypes.number,
};

export default CommonIconTextButton;