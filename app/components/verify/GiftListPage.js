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


class GiftListPage extends BaseTitlePage {

    constructor(props) {
        super(props);

        this._refresh = this._refresh.bind(this);

        this.state = {
            sort: 1, //1,2,3,4
            productData: [],
            text: "",
        }
        this.page = 2;
        this.order = ["POINTS_DESC", "POINTS_ASC", "TIME_DESC", "TIME_ASC"];
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            // if (this.refs.pullList)
            //     this.refs.pullList.showRefreshState();
            // this._refresh();
        })
    }

    componentWillUnmount() {

    }

    _title(){
        return i18n("My_prize");
    }

    /**
     * 刷新
     * */
    _refresh() {
        let params = "name=" + this.state.text + "&pageNum=1" + "&pageSize=" + Config.PAGE_SIZE + "&order=" + this.order[this.state.sort - 1];
        productDao.mallDaoGet("product?" + params)
            .then((res) => {
                let size = 0;
                if (res && res.code === 200) {
                    this.page = 2;
                    this.setState({
                        productData: res.data
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
        let params = "name=" + this.state.text + "&pageNum=" + this.page + "&pageSize=" + Config.PAGE_SIZE + "&order=" + this.order[this.state.sort - 1];
        productDao.mallDaoGet("product?" + params).then((res) => {
            this.page++;
            let size = 0;
            if (res && res.code === 200) {
                let localData = this.state.productData.concat(res.data);
                this.setState({
                    productData: localData
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
                    }}>
                        <View style={[{
                            paddingVertical: 8,
                            width: screenWidth / 2,
                        }, styles.flexDirectionRowNotFlex, styles.centered]}>

                            <Text
                                style={[(this.state.sort === 1 | this.state.sort === 2) ? styles.minTextBlack : styles.minTextsGray]}>{i18n("Delivered")}</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => {
                    }}>
                        <View style={[{
                            paddingVertical: 8,
                            width: screenWidth / 2,
                        }, styles.flexDirectionRowNotFlex, styles.centered]}>

                            <Text
                                style={[(this.state.sort === 3 | this.state.sort === 4) ? styles.minTextBlack : styles.minTextsGray]}>{i18n("In_Progress")}</Text>

                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.flexDirectionRowNotFlex,]}>
                    <View style={[{
                        marginLeft: 15,
                        width: screenWidth / 2 - 30,
                        height: 2,
                        backgroundColor: (this.state.sort === 1 | this.state.sort === 2) ? Constant.grayBlue : Constant.white
                    }]}/>
                    <View style={[{
                        marginLeft: 30,
                        width: screenWidth / 2 - 30,
                        height: 2,
                        backgroundColor: (this.state.sort === 3 | this.state.sort === 4) ? Constant.grayBlue : Constant.white
                    }]}/>
                </View>
                <View style={styles.dividerLineF6}/>

                {/* <PullListView
                    style={{backgroundColor: Constant.grayBg, flex: 1}}
                    ref="pullList"
                    render
                    renderRow={(item, index) => {
                        let marginRight = index % 2 === 0 ? 0 : 4;
                        return (
                            <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                              onPress={() => {
                                                  Actions.ProductDetailPage({"productStr": JSON.stringify(item)});
                                              }}>
                                <View
                                    style={[{
                                        paddingLeft: 10,
                                        paddingTop: 10,
                                        paddingRight: 10,
                                        paddingBottom: 20,
                                        width: ((screenWidth - 12) / 2),
                                        marginRight: marginRight,
                                        marginLeft: 4,
                                        marginTop: 4,

                                    }, styles.mainBgColor, styles.flexDirectionColumnNotFlex]}>
                                    <Image style={[{height: 180, width: (screenWidth - 12) / 2 - 20}]}
                                           source={{uri: item.icon}}
                                           resizeMode={"center"}/>

                                    <Text style={[styles.normalTextGrayCharter]}
                                          numberOfLines={1}
                                          ellipsizeMode='tail'>{item.productName}</Text>

                                    <View style={[styles.flexDirectionRowNotFlex]}>
                                        <Text style={[styles.minTextBlack]}>{item.points} {i18n("Integral")}</Text>
                                        <Text style={[{
                                            marginLeft: 3,
                                            textDecorationLine: "line-through"
                                        }, styles.minTextsGray]}>20000</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    }
                    numColumns={2}
                    refresh={this._refresh}
                    loadMore={this._loadMore}
                    dataSource={this.state.productData}
                />*/}

            </View>
        );
    }

}


export default GiftListPage