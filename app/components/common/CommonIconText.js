import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, Image
} from 'react-native';
import styles from "../../style/index"
import PropTypes from 'prop-types';

/**
 * 带图标的text
 */
class CommonIconText extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <View style={[styles.flexDirectionRowNotFlex, styles.centerH]}>
                <Image source={this.props.icon} style={[[...this.props.iconStyle]]}/>
                <Text
                    style={[[...this.props.textStyle], {marginLeft: 5, marginTop: -3}]}>{this.props.text}</Text>
            </View>
        )
    }
}

CommonIconText.propTypes = {
    icon: PropTypes.any,
    iconStyle: PropTypes.any,
    text: PropTypes.string,
    textStyle: PropTypes.any,
};

export default CommonIconText;