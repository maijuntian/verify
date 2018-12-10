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
import vUserDao from "../../dao/vUserDao";


class PointsActivityPage extends BaseTitlePage {

    constructor(props) {
        super(props);

        this._refresh = this._refresh.bind(this);

        this.state = {
            pointData: [],
            text: "",
        }
        this.page = 2;
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._refresh();
        })
    }

    componentWillUnmount() {

    }

    /**
     * 刷新
     * */
    _refresh() {
        let params = "&pageNum=1" + "&pageSize=" + Config.PAGE_SIZE;
        vUserDao.pointsHistory(params)
            .then((res) => {
                let size = 0;
                if (res && res.code === 200) {
                    this.page = 2;
                    this.setState({
                        pointData: res.data
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
        let params = "&pageNum=" + this.page + "&pageSize=" + Config.PAGE_SIZE;
        vUserDao.pointsHistory(params).then((res) => {
            this.page++;
            let size = 0;
            if (res && res.code === 200) {
                let localData = this.state.productData.concat(res.data);
                this.setState({
                    pointData: localData
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

    _title() {
        return i18n("Integral_detail");
    }

    _reader() {

        return (
            <View style={[styles.flexDirectionColumn]}>

                <PullListView
                    bgColor={Constant.white}
                    style={{flex: 1}}
                    ref="pullList"
                    renderHeader={() => {
                        return (
                            <View style={styles.flexDirectionColumnNotFlex}>
                                <View style={[{
                                    paddingVertical: 8,
                                    paddingHorizontal: 30
                                }, styles.flexDirectionRowNotFlex]}>
                                    <View style={[{width: (screenWidth - 60) * 2 / 7,}, styles.centered]}>
                                        <Text style={[styles.smallTextBlack]}>{i18n("Time")}</Text>
                                    </View>
                                    <View style={[{width: (screenWidth - 60) * 2 / 7,}, styles.centered]}>
                                        <Text style={[styles.smallTextBlack]}>{i18n("Activity")}</Text>
                                    </View>
                                    <View style={[{width: (screenWidth - 60) * 3 / 7,}, styles.centered]}>
                                        <Text style={[styles.smallTextBlack]}>{i18n("Reason")}</Text>
                                    </View>
                                </View>
                                <View style={styles.dividerLineF6}/>
                            </View>
                        )
                    }}
                    render
                    renderRow={(item, index) => {

                        let pointColor = item.type === "plus" ? Constant.primaryBlackColor : Constant.green;
                        let points = (item.type === "plus" ? "+" : "-") + item.points;
                        return (
                            <View style={styles.flexDirectionColumnNotFlex}>
                                <View style={[{
                                    paddingVertical: 6,
                                    paddingHorizontal: 30
                                }, styles.flexDirectionRowNotFlex]}>
                                    <View style={[{width: (screenWidth - 60) * 2 / 7,},]}>
                                        <Text style={[{color: Constant.gray9d, fontSize: 12}]}>{item.createTime}</Text>
                                    </View>
                                    <View style={[{width: (screenWidth - 60) * 2 / 7,}, styles.centered]}>
                                        <Text style={[{
                                            color: pointColor,
                                            fontSize: 12
                                        }]}>{points}</Text>
                                    </View>
                                    <View
                                        style={[{width: (screenWidth - 60) * 3 / 7,}, styles.centered]}>
                                        <Text style={[{color: Constant.gray9d, fontSize: 12}]}>{item.reason}</Text>
                                    </View>

                                </View>
                                <View style={styles.dividerLineF6}/>
                            </View>
                        )
                    }
                    }
                    refresh={this._refresh}
                    loadMore={this._loadMore}
                    dataSource={this.state.pointData}
                />

            </View>
        );
    }

}


export default PointsActivityPage