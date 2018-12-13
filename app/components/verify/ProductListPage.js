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


class ProductListPage extends Component {

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
            this._refresh();
        })
    }

    componentWillUnmount() {

    }

    /**
     * 刷新
     * */
    _refresh() {
        let params = "name=" + this.state.text + "&pageNum=1" + "&pageSize=" + Config.PAGE_SIZE + "&order=" + this.order[this.state.sort-1];
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
        let params = "name=" + this.state.text + "&pageNum=" + this.page + "&pageSize=" + Config.PAGE_SIZE + "&order=" + this.order[this.state.sort-1];
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

    render() {

        let rightIcon1, rightIcon2;
        switch (this.state.sort) {
            case 1:
                rightIcon1 = require("../../img/icon_sort1.png");
                rightIcon2 = require("../../img/icon_sort3.png");
                break;
            case 2:
                rightIcon1 = require("../../img/icon_sort2.png");
                rightIcon2 = require("../../img/icon_sort3.png");
                break;
            case 3:
                rightIcon1 = require("../../img/icon_sort3.png");
                rightIcon2 = require("../../img/icon_sort1.png");
                break;
            case 4:
                rightIcon1 = require("../../img/icon_sort3.png");
                rightIcon2 = require("../../img/icon_sort2.png");
                break;

        }


        return (
            <View style={[styles.mainBox, styles.flexDirectionColumn]}>

                <View style={[{
                    backgroundColor: Constant.mainBackgroundColor,
                    height: navBarHeight,
                    paddingTop: statusHeight + 5,
                }, styles.centerH, styles.flexDirectionRowNotFlex]}>
                    <TouchableOpacity
                        style={{height: 25, width: 25, marginHorizontal: 8}}
                        onPress={() => {
                            Actions.pop();
                        }}>
                        <Icon
                            name={"chevron-left"}
                            backgroundColor={Constant.transparentColor}
                            color={Constant.primaryBlackColor} size={25}
                            style={[styles.centered,]}/>
                    </TouchableOpacity>

                    <View style={[{
                        paddingHorizontal: 13,
                        backgroundColor: Constant.grayBg,
                        borderRadius: 20,
                        marginRight: 12,
                    }, styles.flexDirectionRow, styles.centerH]}>
                        <Image source={require("../../img/icon_search.png")}
                               style={{height: 12, width: 12}}
                        />

                        <TextInput
                            style={[{
                                padding: 5,
                            }, styles.minTextBlack, styles.flex]}
                            placeholder={i18n("Search")}
                            onSubmitEditing={()=>{
                                this._refresh();
                            }}
                            returnKeyType={"search"}
                            onChangeText={(text) => this.setState({text})}
                            underlineColorAndroid='transparent'/>
                    </View>

                </View>

                <View style={[styles.flexDirectionRowNotFlex,]}>

                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        this.state.sort = this.state.sort === 1 ? 2 : 1;
                        this._refresh();
                    }}>
                        <View style={[{
                            paddingVertical: 8,
                            width: screenWidth / 2,
                        }, styles.flexDirectionRowNotFlex, styles.centered]}>

                            <Text
                                style={[(this.state.sort === 1 | this.state.sort === 2) ? styles.minTextBlack : styles.minTextsGray]}>{i18n("Integral")}</Text>

                            <Image style={{marginLeft: 5, height: 10, width: 5}}
                                   source={rightIcon1}/>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        this.state.sort = this.state.sort === 3 ? 4 : 3;
                        this._refresh();
                    }}>
                        <View style={[{
                            paddingVertical: 8,
                            width: screenWidth / 2,
                        }, styles.flexDirectionRowNotFlex, styles.centered]}>

                            <Text
                                style={[(this.state.sort === 3 | this.state.sort === 4) ? styles.minTextBlack : styles.minTextsGray]}>{i18n("Time")}</Text>

                            <Image style={{marginLeft: 5, height: 10, width: 5}}
                                   source={rightIcon2}/>

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

                <PullListView
                    style={{backgroundColor: Constant.grayBg, flex: 1}}
                    ref="pullList"
                    render
                    renderRow={(item, index) => {
                        let dividerW = screenWidth * 0.02;
                        let marginRight = index % 2 === 0 ? 0 : dividerW;
                        return (
                            <TouchableOpacity activeOpacity={Constant.activeOpacity}
                                              onPress={() => {
                                                  Actions.ProductDetailPage({"productStr": JSON.stringify(item)});
                                              }}>
                                <View
                                    style={[{
                                        width: ((screenWidth - dividerW*3) / 2),
                                        marginRight: marginRight,
                                        marginLeft: dividerW,
                                        marginTop: dividerW,
                                    }, styles.mainBgColor, styles.flexDirectionColumnNotFlex]}>
                                    <Image style={[{height: (screenWidth - dividerW*3) / 2, width: (screenWidth - dividerW*3) / 2}]}
                                           source={{uri: item.icon}}
                                           resizeMode={"stretch"}/>

                                    <View style={[{height: 75}]}>
                                        <Text style={[{
                                            marginLeft: 10,
                                            marginTop: 14,
                                            marginRight: 30
                                        }, styles.sminText9Dgray]}
                                              numberOfLines={2}
                                              ellipsizeMode='tail'>{item.productName}</Text>

                                        <View style={[{marginLeft: 10, marginTop: 5}, styles.flexDirectionRowNotFlex, styles.centerH]}>
                                            <Text
                                                style={[styles.smallTextBlack]}>{item.points} {i18n("Integral")}</Text>
                                            <Text style={[{
                                                marginLeft: 5,
                                                textDecorationLine: "line-through"
                                            }, styles.minTextsGray]}>20000</Text>
                                        </View>
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
                />

            </View>
        );
    }

}


export default ProductListPage