import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, Image
} from 'react-native';
import PropTypes from 'prop-types';
import * as Constant from '../../style/constant'
import Icon from 'react-native-vector-icons/Feather'
import styles, {navBarHeight, screenWidth, statusHeight} from "../../style";
import {Actions} from "react-native-router-flux";

/**
 * 产品的头部
 */
class CommonProductHeader extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (

            <View style={[{}, styles.flexDirectionColumnNotFlex, styles.centered]}>
                <Text selectable={true}
                      style={[styles.largeTextBlackCharter,]}>
                    {this.props.data.productName}
                </Text>
                <View style={[{height: 100, marginTop: 15}, styles.flexDirectionRowNotFlex,]}>
                    <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                      onPress={() => {
                                          Actions.AboutProductPage({"responseStr": JSON.stringify(this.props.data)})
                                      }}>
                        <Image source={{uri: this.props.data.productIcon}}
                               style={[styles.centerH, {
                                   height: 100, width: 100,
                                   borderRadius: 5,
                               },]}
                               resizeMode={"stretch"}/>
                    </TouchableOpacity>

                    <View style={{width: screenWidth - 170, marginLeft: Constant.normalMarginEdge}}>

                        {/* <View style={[styles.flexDirectionRowNotFlex, styles.centerH,]}>

                        <Text style={styles.subSmallText}>
                            winery:</Text>*/}
                        <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                          onPress={() => {
                                              this.props.iconPress && this.props.iconPress();
                                          }}>
                            <Image style={{height: 20, width: 20, marginLeft: 2}}
                                   resizeMode={"stretch"}
                                   source={{uri: this.props.data.manufacturerIcon}}/>

                        </TouchableOpacity>
                        {/*</View>*/}

                        {/*<View style={[styles.absoluteFull, {zIndex: -999, justifyContent: "flex-end",}]}>*/}
                        <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                          onPress={() => {
                                              Actions.AboutProductPage({"responseStr": JSON.stringify(this.props.data)})
                                          }}>
                            <Text
                                numberOfLines={4}
                                ellipsizeMode={"tail"}
                                style={[styles.subMinText, {marginTop: 12}]}>
                                {this.props.data.shortDesc}</Text>
                        </TouchableOpacity>
                        {/*</View>*/}
                    </View>
                </View>
            </View>
        )
    }
}

CommonProductHeader.propTypes = {
    data: PropTypes.object,
    iconPress: PropTypes.func
};

export default CommonProductHeader;