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

        return (

            <TouchableOpacity  style={[{width: 150}]} onPress={() => {
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
};

export default CommonIconTextButton;