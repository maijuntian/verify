import React, {Component} from "react";
import {Text, TouchableOpacity, View, Image, TextInput, FlatList} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import * as Constant from "../../style/constant";
import styles, {navBarHeight, screenWidth, statusHeight} from "../../style";
import i18n from "../../style/i18n";
import {Actions} from "react-native-router-flux";


class ProductListPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sort: 1, //1,2,3,4
            productData:[]
        }

    }

    render() {

        let rightIcon1, rightIcon2;
        switch (this.state.sort) {
            case 1:
                rightIcon1 = require("../../img/icon_gifts.png");
                rightIcon2 = require("../../img/icon_gifts.png");
                break;
            case 2:
                rightIcon1 = require("../../img/icon_gifts.png");
                rightIcon2 = require("../../img/icon_gifts.png");
                break;
            case 3:
                rightIcon1 = require("../../img/icon_gifts.png");
                rightIcon2 = require("../../img/icon_gifts.png");
                break;
            case 4:
                rightIcon1 = require("../../img/icon_gifts.png");
                rightIcon2 = require("../../img/icon_gifts.png");
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
                            underlineColorAndroid='transparent'/>
                    </View>

                </View>

                <View style={[styles.flexDirectionRowNotFlex,]}>
                    <View style={[{
                        paddingVertical: 8,
                        width: screenWidth / 2,
                    }, styles.flexDirectionRowNotFlex, styles.centered]}>

                        <Text
                            style={[(this.state.sort === 1 | this.state.sort === 2) ? styles.minTextBlack : styles.minTextsGray]}>{i18n("Integral")}</Text>

                        <Image style={{marginLeft: 5, height: 10, width: 5}}
                               source={rightIcon1}/>

                    </View>
                    <View style={[{
                        paddingVertical: 8,
                        width: screenWidth / 2,
                    }, styles.flexDirectionRowNotFlex, styles.centered]}>

                        <Text
                            style={[(this.state.sort === 3 | this.state.sort === 4) ? styles.minTextBlack : styles.minTextsGray]}>{i18n("Time")}</Text>

                        <Image style={{marginLeft: 5, height: 10, width: 5}}
                               source={rightIcon2}/>

                    </View>
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

                <FlatList
                    style={{backgroundColor: constant.grayBg, flex: 1,}}
                    data={this.state.productData}
                    numColumns={2}
                    renderItem={({item, index}) => {
                        let marginRight = index % 2 === 0 ? 0 : 4;
                        return (
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
                                    <Text style={[styles.minTextBlack]}>{item.points} {I18n("Integral")}</Text>
                                    <Text style={[{
                                        marginLeft: 3,
                                        textDecorationLine: "line-through"
                                    }, styles.minTextsGray]}>20000</Text>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        );
    }

}


export default ProductListPage