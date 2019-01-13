/**
 * Created by mai on 2017/11/12.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    BackHandler, TouchableOpacity, Image
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
class SuccessModal extends Component {

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        if (this.refs.ConfirmModal) {
            this.refs.ConfirmModal.open();

            this.timer = setTimeout(() => {
                Actions.pop();
            }, 3000);
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.props.finishFunc && this.props.finishFunc();
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

                        <Image source={require("../../img/success.png")}
                               style={{height: 56, width: 56, marginTop: 15}}/>

                        <Text style={[styles.middleTextBlackCharter]}>{I18n("Success")}</Text>

                        <Text
                            style={[styles.middleTextGray, {
                                marginTop: 5,
                                marginBottom: 20,
                                textAlign: 'center'
                            }]}>{I18n("SuccessTip")}</Text>

                    </View>
                </View>
            </Modal>
        )
    }
}

SuccessModal.propTypes = {
    finishFunc: PropTypes.func,
};

export default SuccessModal;