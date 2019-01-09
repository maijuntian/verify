/**
 * Created by mai on 2017/11/7.
 */
import React, {Component} from 'react';
import {
    Scene,
    Router,
    Lightbox, Drawer
} from 'react-native-router-flux';
import TabIcon from './components/widget/TabIcon'
import LoadingModal from './components/common/LoadingModal'
import ConfirmModal from './components/common/ConfirmModal'
import SuccessModal from './components/common/SuccessModal'
import styles from './style'
import I18n, {changeLocale} from './style/i18n'
import * as Constant from './style/constant'
import BackUtils from './utils/backUtils'

import WelcomePage from "./components/WelcomePage"
import ScanQrCodePage from "./components/verify/ScanQrCodePage";
import MePage from "./components/verify/MePage";
import MallPage from "./components/verify/MallPage";
import HomePage from "./components/verify/HomePage";
import ProductHistoryPage from "./components/verify/ProductHistoryPage";
import AntiFakePage from "./components/verify/AntiFakePage";
import AboutHistoryPage from "./components/verify/AboutHistoryPage";
import PersonalPage from "./components/verify/PersonalPage";
import ProductListPage from "./components/verify/ProductListPage";
import LoginPage from "./components/verify/LoginPage";
import ProductDetailPage from "./components/verify/ProductDetailPage";
import PersonalSexPage from "./components/verify/PersonalSexPage";
import PersonalNamePage from "./components/verify/PersonalNamePage";
import PointsActivityPage from "./components/verify/PointsActivityPage";
import AddressPage from "./components/verify/AddressPage";
import GiftListPage from "./components/verify/GiftListPage";
import RankInterestsPage from "./components/verify/RankInterestsPage";
import AddressEditPage from "./components/verify/AddressEditPage";
import {TestPage} from "./components/verify/TestPage";
import VerifyHistoryPage from "./components/verify/VerifyHistoryPage";
import CheckInPage from "./components/verify/CheckInPage";
import OrderConfirmPage from "./components/verify/OrderConfirmPage";
import OrderAddressEditPage from "./components/verify/OrderAddressEditPage";
import OrderAddressPage from "./components/verify/OrderAddressPage";
import HorizontalCalendarList from "./components/verify/horizontalCalendarList";
import FeedBackPage from "./components/verify/FeedBackPage";


/**
 * 全局路由
 */
const getRouter = () => {
    return (
        <Router
            getSceneStyle={() => {
                return styles.routerStyle
            }}
            backAndroidHandler={
                BackUtils()}>
            <Lightbox>
                <Scene key="main">
                    <Scene key="WelcomePage" component={WelcomePage} hideNavBar hideTabBar hide/>
                </Scene>
                <Scene key="root"
                       hideNavBar>
                    <Scene key="mainTabPage"
                           tabs
                           lazy
                           wrap={false}
                           showLabel={false}
                           tabBarPosition={"bottom"}
                           tabBarStyle={{
                               height: Constant.tabBarHeight,
                               alignItems: 'center',
                               justifyContent: 'center',
                               backgroundColor: Constant.tabBackgroundColor
                           }}>
                        <Scene
                            key="HomePage"
                            component={HomePage}
                            icon={TabIcon}
                            title={I18n('home')}
                            tabIconName={'tabHome'}/>

                        <Scene
                            key="MallPage"
                            component={MallPage}
                            icon={TabIcon}
                            title={I18n('mall')}
                            tabIconName={'tabMall'}
                        />
                        <Scene
                            key="MePage"
                            component={MePage}
                            icon={TabIcon}
                            title={I18n('me')}
                            tabIconName={'tabMe'}
                        />
                    </Scene>
                    <Scene key="ProductHistoryPage" component={ProductHistoryPage}/>
                    <Scene key="AntiFakePage" component={AntiFakePage}/>
                    <Scene key="ScanQrCodePage" component={ScanQrCodePage}/>
                    <Scene key="AboutHistoryPage" component={AboutHistoryPage}/>
                    <Scene key="PersonalPage" component={PersonalPage}/>
                    <Scene key="PersonalSexPage" component={PersonalSexPage}/>
                    <Scene key="PersonalNamePage" component={PersonalNamePage}/>
                    <Scene key="ProductListPage" component={ProductListPage}/>
                    <Scene key="ProductDetailPage" component={ProductDetailPage}/>
                    <Scene key="PointsActivityPage" component={PointsActivityPage}/>
                    <Scene key="AddressPage" component={AddressPage}/>
                    <Scene key="GiftListPage" component={GiftListPage}/>
                    <Scene key="RankInterestsPage" component={RankInterestsPage}/>
                    <Scene key="CheckInPage" component={CheckInPage}/>
                    <Scene key="VerifyHistoryPage" component={VerifyHistoryPage}/>
                    <Scene key="AddressEditPage" component={AddressEditPage}/>
                    <Scene key="OrderConfirmPage" component={OrderConfirmPage}/>
                    <Scene key="OrderAddressEditPage" component={OrderAddressEditPage}/>
                    <Scene key="OrderAddressPage" component={OrderAddressPage}/>
                    <Scene key="FeedBackPage" component={FeedBackPage}/>

                </Scene>
                <Scene key="LoginPage" component={LoginPage} hideNavBar hideTabBar hide/>
                <Scene key="LoadingModal" component={LoadingModal}/>
                <Scene key="ConfirmModal" component={ConfirmModal}/>
                <Scene key="SuccessModal" component={SuccessModal}/>
            </Lightbox>
        </Router>
    )
};


export default getRouter;