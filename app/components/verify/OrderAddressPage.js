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
import {DeviceEventEmitter, FlatList, InteractionManager, Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import vUserDao from "../../dao/vUserDao";
import PullListView from "../widget/PullLoadMoreListView";
import * as Config from "../../config";
import {Actions} from "react-native-router-flux";


class AddressPage extends BaseTitlePage {

    constructor(props) {
        super(props);
        this._refresh = this._refresh.bind(this);
        this.state = {
            addressData: [],
        };
        this.page = 2;
    }

    _title() {
        return i18n("Receiving_address");
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._refresh();
        });

        this.subscription = DeviceEventEmitter.addListener(Constant.CHANGE_ADDRESS, () => {
            //接收到详情页发送的通知，刷新数据
            this._refresh();
        });
    }

    componentWillUnmount(){
        this.subscription.remove();
    };

    /**
     * 刷新
     * */
    _refresh() {
        let params = "&pageNum=1" + "&pageSize=" + Config.PAGE_SIZE;
        vUserDao.addressList(params)
            .then((res) => {
                let size = 0;
                if (res && res.code === 200) {
                    this.page = 2;
                    this.setState({
                        addressData: res.data
                    });
                    size = res.data.length;
                }
                setTimeout(() => {
                    if (this.refs.pullList) {
                        this.refs.pullList.refreshComplete((size >= Config.PAGE_SIZE), false);
                    }
                }, 500);
            })
    }

    /**
     * 加载更多
     * */
    _loadMore() {
        let params = "&pageNum=" + this.page + "&pageSize=" + Config.PAGE_SIZE;
        vUserDao.addressList(params).then((res) => {
            this.page++;
            let size = 0;
            if (res && res.code === 200) {
                let localData = this.state.addressData.concat(res.data);
                this.setState({
                    addressData: localData
                })
                size = res.data.length;
            }
            setTimeout(() => {
                if (this.refs.pullList) {
                    this.refs.pullList.loadMoreComplete((size >= Config.PAGE_SIZE));
                }
            }, 500);
        });
    }

    _reader() {
        return (

            <View style={[styles.flexDirectionColumn, styles.alignItemsEnd]}>

                <PullListView
                    bgColor={Constant.white}
                    style={{flex: 1}}
                    ref="pullList"
                    render
                    renderRow={(item, index) => {
                        console.log("item-->" + JSON.stringify(item));
                        return (
                            <View style={styles.flexDirectionColumnNotFlex}>
                                <TouchableOpacity style={[styles.flexDirectionRowNotFlex, styles.centerH]}
                                                  onPress={() => {
                                                      DeviceEventEmitter.emit(Constant.CHANGE_DEFAULT_ADDRESS, JSON.stringify(item));
                                                      Actions.pop();
                                                  }}>

                                    <View style={[{
                                        marginLeft: 16,
                                        marginVertical: 16,
                                        width: screenWidth - 86
                                    }, styles.flexDirectionColumnNotFlex]}>

                                        <Text
                                            style={[styles.middleTexBlackCharter]}>{item.address}</Text>
                                        <View style={[styles.flexDirectionRowNotFlex, styles.centerH]}>
                                            <Text style={[{}, styles.middleTextGrayBlue]}>{item.contacts}</Text>
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
                    }}
                    refresh={this._refresh}
                    loadMore={this._loadMore}
                    dataSource={this.state.addressData}
                />

                <TouchableOpacity
                    activeOpacity={Constant.activeOpacity}
                    style={[{
                        width: screenWidth - 72,
                        marginHorizontal: 36,
                        marginBottom: 16,
                        borderColor: "#D7D7D7",
                        borderWidth: 1,
                        borderRadius: 20,
                        paddingVertical: 10,
                    }, styles.centered]}
                    onPress={() => {
                        Actions.AddressEditPage({addressStr: ""});
                    }}>
                    <Text style={[{
                        color: Constant.grayBlue,
                        fontSize: Constant.smallTextSize
                    }]}>{i18n("Add")}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default AddressPage;