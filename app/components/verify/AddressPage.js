/**
 *
 * Copyright 2018-present cat_chain
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import * as Constant from "../../style/constant";
import styles, {screenWidth} from "../../style";
import i18n from "../../style/i18n";
import BaseTitlePage from "../widget/BaseTitlePage";
import {FlatList, InteractionManager, Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import vUserDao from "../../dao/vUserDao";
import Toast from '../common/ToastProxy';

class AddressPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this.state = {
            addressData: [],
        }
    }

    _title() {
        return i18n("Receiving_address");
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._refresh();
        })
    }

    /**
     * 刷新
     * */
    _refresh() {
        vUserDao.addressList()
            .then((res) => {
                if (res && res.code === 200) {
                    this.setState({
                        addressData: res.data
                    })
                } else {
                    Toast(res && res.message);
                }
            })
    }

    _reader() {
        return (

            <View style={[styles.flexDirectionColumn, styles.alignItemsEnd]}>

                <FlatList
                    style={[styles.flex]}
                    data={this.state.addressData}
                    renderItem={({item, index}) => {
                        return (
                            <View style={styles.flexDirectionColumnNotFlex}>
                                <TouchableOpacity style={[styles.flexDirectionRowNotFlex, styles.centerH]}
                                                  onPress={() => {
                                                  }}>

                                    <View style={[{
                                        marginLeft: 16,
                                        marginVertical: 16,
                                        width: screenWidth - 86
                                    }, styles.flexDirectionColumnNotFlex]}>

                                        <Text
                                            style={[styles.middleTexBlackCharter]}>{item.address}</Text>
                                        <View style={[styles.flexDirectionRowNotFlex, styles.centerH]}>
                                            <Text style={[{}, styles.middleTextGrayBlueCharter]}>{item.contacts}</Text>
                                            <Text style={[{marginLeft: 17}, styles.minTextsGray]}>{item.phone}</Text>
                                        </View>

                                    </View>
                                    <View
                                        style={[{marginRight: 16}, styles.flexDirectionColumn, styles.alignItemsEnd, styles.centerV]}>

                                        <Icon
                                            name={"chevron-right"}
                                            backgroundColor={Constant.transparentColor}
                                            color={Constant.primaryBlackColor} size={15}/>
                                    </View>

                                </TouchableOpacity>

                                <View style={styles.dividerLineF6}/>
                            </View>
                        )
                    }}/>

                    <TouchableOpacity
                        activeOpacity={Constant.activeOpacity}
                        style={[{
                            width:screenWidth - 72,
                            marginHorizontal: 36,
                            marginBottom: 16,
                            borderColor: "#D7D7D7",
                            borderWidth: 1,
                            borderRadius: 20,
                            paddingVertical: 10,
                        }, styles.centered]} onPress={() => {

                    }}>
                        <Text style={[{}, styles.smallTextBlack]}>{i18n("Add")}</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

export default AddressPage;