import React, {Component} from "react";
import {Text, TouchableOpacity, View, Image, TextInput, FlatList, InteractionManager} from "react-native";
import * as Constant from "../../style/constant";
import styles, {navBarHeight, screenWidth, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import PullListView from "../widget/PullLoadMoreListView";
import * as Config from "../../config";
import BaseTitlePage from "../widget/BaseTitlePage";
import vUserDao from "../../dao/vUserDao";


class VerifyHistoryPage extends BaseTitlePage {

    constructor(props) {
        super(props);

        this._refresh = this._refresh.bind(this);
        this._loadMore = this._loadMore.bind(this);

        this.state = {
            sort: 1, //1,2,
            giftData: [],
        }
        this.page = 2;
        this.order = ["Success", "Failure"];
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._refresh();
        })
    }

    componentWillUnmount() {
    }

    _title() {
        return i18n("Verification_record");
    }

    /**
     * 刷新
     * */
    _refresh() {
        let params = "&pageNum=1" + "&pageSize=" + Config.PAGE_SIZE + "&status=" + this.order[this.state.sort - 1];
        vUserDao.authRecord(params)
            .then((res) => {
                let size = 0;
                if (res && res.code === 200) {
                    this.page = 2;
                    this.setState({
                        recordData: res.data
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
        let params = "&pageNum=" + this.page + "&pageSize=" + Config.PAGE_SIZE + "&status=" + this.order[this.state.sort - 1];
        vUserDao.giftList(params).then((res) => {
            this.page++;
            let size = 0;
            if (res && res.code === 200) {
                let localData = this.state.recordData.concat(res.data);
                this.setState({
                    recordData: localData
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
                                style={[(this.state.sort === 1) ? styles.minTextBlack : styles.minTextsGray]}>{i18n("Success")}</Text>

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
                                style={[(this.state.sort === 2) ? styles.minTextBlack : styles.minTextsGray]}>{i18n("Fail")}</Text>

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
                        return (
                            <View style={styles.flexDirectionColumnNotFlex}>
                                <View style={[{
                                    paddingVertical: 20,
                                    paddingHorizontal: 24
                                }, styles.flexDirectionRowNotFlex, ]}>
                                    <View style={[{width: (screenWidth - 48) / 2,}]}>
                                        <Text style={[{color: Constant.gray9d, fontSize: 12}]}>{item.authTime}</Text>
                                    </View>
                                    <View
                                        style={[{width: (screenWidth - 48) / 2,},]}>
                                        <Text
                                            style={[styles.minTextBlack_Charter]}>{item.productName + " authentic"}</Text>
                                    </View>

                                </View>
                                <View style={styles.dividerLineF6}/>
                            </View>
                        )
                    }
                    }
                    refresh={this._refresh}
                    loadMore={this._loadMore}
                    dataSource={this.state.recordData}
                />

            </View>
        );
    }
}

export default VerifyHistoryPage