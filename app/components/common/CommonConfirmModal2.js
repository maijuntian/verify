/**
 * Created by mai on 2017/11/12.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    BackHandler, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import styles, {screenWidth, screenHeight} from "../../style/index"
import * as Constant from "../../style/constant"
import I18n from '../../style/i18n'
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';
import {Actions} from "react-native-router-flux";
import LoadingModal from "./LoadingModal";
import vUserDao from "../../dao/vUserDao";
import Toast from "./ToastProxy";


/**
 * 加载中Modal
 */
class ConfirmModal extends Component {

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        if (this.refs.ConfirmModal)
            this.refs.ConfirmModal.open();
    }

    componentWillUnmount() {
    }

    onClose() {
        Actions.pop();
        return true;
    }

    render() {
        return (
            <Modal ref={"ConfirmModal"}
                   style={[{height: screenHeight, width: screenWidth, backgroundColor: "#20000000"}]}
                   position={"center"}
                   onClosed={this.onClose}
                   backdrop={true}
                   backButtonClose={false}
                   swipeToClose={true}
                   backdropOpacity={0.1}>

                <View style={[styles.centered, {flex: 1}]}>
                    <View style={[{
                        width: 270,
                        backgroundColor: Constant.white,
                        borderRadius: 5,
                    }, styles.flexDirectionColumnNotFlex, styles.centered]}>
                        <Text style={[styles.smallTextGray, {
                            marginTop: 30,
                            marginHorizontal: 20
                        }]}>{this.props.text}</Text>
                        <View style={[{marginTop: 30, marginBottom: 20}, styles.flexDirectionRowNotFlex]}>
                            <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                              onPress={() => {
                                                  this.onClose();
                                              }}>

                                <View style={[{
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    height: 36,
                                    width: 100,
                                    borderColor: Constant.textGray,
                                }, styles.flexDirectionRowNotFlex, styles.centered]}>
                                    <Text style={[styles.middleTexBlack]}>{this.props.text_cancel}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                              onPress={() => {
                                                  this.onClose();
                                                  this.props.confirmFun && this.props.confirmFun();
                                              }}>
                                <View style={[{
                                    marginLeft: 15,
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    height: 36,
                                    width: 100,
                                    borderColor: Constant.textGray,
                                }, styles.flexDirectionRowNotFlex, styles.centered]}>
                                    <Text style={[styles.middleTexBlack]}>{this.props.text_ok}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

ConfirmModal.propTypes = {
    text: PropTypes.string,
    backExit: PropTypes.bool,
    confirmFun: PropTypes.func,
    text_ok: PropTypes.string,
    text_cancel: PropTypes.string,
};
ConfirmModal.defaultProps = {
    text: "",
    backExit: true,
};

export default ConfirmModal;