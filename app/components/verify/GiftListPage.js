import React, {Component} from "react";
import {Text, TouchableOpacity, View, Image, TextInput, FlatList, InteractionManager} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import * as Constant from "../../style/constant";
import styles, {navBarHeight, screenWidth, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import {Actions} from "react-native-router-flux";
import PullListView from "../widget/PullLoadMoreListView";
import productDao from "../../dao/productDao";
import * as Config from "../../config";
import BaseTitlePage from "../widget/BaseTitlePage";
import moment from "moment";
import vUserDao from "../../dao/vUserDao";


class GiftListPage extends BaseTitlePage {

    constructor(props) {
        super(props);

        this._refresh = this._refresh.bind(this);
        this._loadMore = this._loadMore.bind(this);

        this.state = {
            sort: 1, //1,2,
            giftData: [],
        }
        this.page = 2;
        this.order = ["DELIVERED", "IN_PROGRESS"];
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._refresh();
        })
    }

    componentWillUnmount() {
    }

    _title() {
        return i18n("My_prize");
    }

    /**
     * 刷新
     * */
    _refresh() {
        let params = "&pageNum=1" + "&pageSize=" + Config.PAGE_SIZE + "&status=" + this.order[this.state.sort - 1];
        vUserDao.giftList(params)
            .then((res) => {
                let size = 0;
                if (res && res.code === 200) {
                    this.page = 2;
                    this.setState({
                        giftData: res.data
                    })
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
        let params = "&pageNum=" + this.page + "&pageSize=" + Config.PAGE_SIZE + "&order=" + this.order[this.state.sort - 1];
        vUserDao.giftList(params).then((res) => {
            this.page++;
            let size = 0;
            if (res && res.code === 200) {
                let localData = this.state.giftData.concat(res.data);
                this.setState({
                    giftData: localData
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
            <View style={[styles.mainBox, styles.flexDirectionColumn]}>

                <View style={[{marginTop: 14}, styles.flexDirectionRowNotFlex,]}>

                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        if (this.state.sort !== 1) {
                            this.state.sort = 1;
                            this._refresh();
                        }
                    }}>
                        <View style={[{
                            paddingVertical: 8,
                            width: screenWidth / 2,
                        }, styles.flexDirectionRowNotFlex, styles.centered]}>

                            <Text
                                style={[(this.state.sort === 1) ? styles.minTextBlack : styles.minTextsGray]}>{i18n("Delivered")}</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        if (this.state.sort !== 2) {
                            this.state.sort = 2;
                            this._refresh();
                        }
                    }}>
                        <View style={[{
                            paddingVertical: 8,
                            width: screenWidth / 2,
                        }, styles.flexDirectionRowNotFlex, styles.centered]}>

                            <Text
                                style={[(this.state.sort === 2) ? styles.minTextBlack : styles.minTextsGray]}>{i18n("In_Progress")}</Text>

                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.flexDirectionRowNotFlex,]}>
                    <View style={[{
                        marginLeft: 15,
                        width: screenWidth / 2 - 30,
                        height: 2,
                        backgroundColor: (this.state.sort === 1) ? Constant.grayBlue : Constant.white
                    }]}/>
                    <View style={[{
                        marginLeft: 30,
                        width: screenWidth / 2 - 30,
                        height: 2,
                        backgroundColor: (this.state.sort === 2) ? Constant.grayBlue : Constant.white
                    }]}/>
                </View>
                <View style={styles.dividerLineF6}/>

                <PullListView
                    style={{flex: 1}}
                    bgColor={Constant.white}
                    ref="pullList"
                    render
                    renderRow={(item, index) => {

                        let centerV;

                        if (this.state.sort === 1) {
                            centerV = <View
                                style={[{
                                    width: screenWidth - 210,
                                    marginLeft: 13
                                }, styles.flexDirectionColumnNotFlex,]}>

                                <Text
                                    style={styles.normalTextBlack_Charter}>{item.item[0].productName}</Text>

                                <View style={[styles.flexDirectionRowNotFlex,]}>
                                    <Text style={styles.sminText9Dgray}>{i18n("Order_number")}：</Text>
                                    <Text style={styles.sminTextBlack}>{item.recordsNumber}</Text>
                                </View>
                                <View style={[styles.flexDirectionRowNotFlex,]}>
                                    <Text style={styles.sminText9Dgray}>{i18n("Delivery_Date")}：</Text>
                                    <Text style={styles.sminTextBlack}>{item.deliveryTime}</Text>
                                </View>
                            </View>;
                        } else {
                            centerV = <View
                                style={[{
                                    width: screenWidth - 210,
                                    marginLeft: 13
                                }, styles.flexDirectionColumnNotFlex,]}>

                                <Text
                                    style={styles.normalTextBlack_Charter}>{item.item[0].productName}</Text>

                                <View style={[styles.flexDirectionRowNotFlex,]}>
                                    <Text style={styles.sminText9Dgray}>{i18n("Tracking_Number")}：</Text>
                                    <Text style={styles.sminTextBlack}>{item.trackingNumber}</Text>
                                </View>
                                <View style={[styles.flexDirectionRowNotFlex,]}>
                                    <Text style={styles.sminText9Dgray}>{i18n("Logistics")}：</Text>
                                    <Text style={styles.sminTextBlack}>{item.logistics}</Text>
                                </View>
                                <View style={[styles.flexDirectionRowNotFlex,]}>
                                    <Text style={styles.sminText9Dgray}>{i18n("Order_date")}：</Text>
                                    <Text style={styles.sminTextBlack}>{item.createTime}</Text>
                                </View>
                            </View>;
                        }
                        return (
                            <View style={[styles.flexDirectionColumnNotFlex]}>
                                <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                                  onPress={() => {
                                                  }}>
                                    <View style={[{
                                        paddingVertical: 12,
                                        paddingLeft: 20,
                                        paddingRight: 13
                                    }, styles.flexDirectionRowNotFlex, styles.centerV]}>
                                        <Image style={[{height: 85, width: 85}]}
                                               source={{uri: item.item[0].productIcon}}
                                               resizeMode={"center"}/>
                                        {centerV}

                                        <View style={[{
                                            width: 90,
                                            paddingRight: 13
                                        }, styles.flexDirectionRowNotFlex, styles.justifyEnd, styles.centerH]}>
                                            <Text
                                                style={[{}, styles.normalTextBlack]}>x{item.item[0].productQuantity}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.dividerLineF6}/>
                            </View>
                        )
                    }
                    }
                    refresh={this._refresh}
                    loadMore={this._loadMore}
                    dataSource={this.state.giftData}
                />

            </View>
        );
    }
}

export default GiftListPage