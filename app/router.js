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
import CommonConfirmModal2 from './components/common/CommonConfirmModal2'
import CommonConfirmModal3 from './components/common/CommonConfirmModal3'
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
import ProductHistoryPage2 from "./components/verify/ProductHistoryPage2";
import AntiFakePage from "./components/verify/AntiFakePage";
import AboutHistoryPage from "./components/verify/AboutHistoryPage";
import AboutProductPage from "./components/verify/AboutProductPage";
import PersonalPage from "./components/verify/PersonalPage";
import ProductListPage from "./components/verify/ProductListPage";
import LoginPage from "./components/verify/LoginPage";
import LoginPageCN from "./components/verify/LoginPageCN";
import ProductDetailPage from "./components/verify/ProductDetailPage";
import PersonalSexPage from "./components/verify/PersonalSexPage";
import PersonalNamePage from "./components/verify/PersonalNamePage";
import PointsActivityPage from "./components/verify/PointsActivityPage";
import AddressPage from "./components/verify/AddressPage";
import GiftListPage from "./components/verify/GiftListPage";
import RankInterestsPage from "./components/verify/RankInterestsPage";
import ProductHistoryAntiFakePage from "./components/verify/ProductHistoryAntiFakePage";
import AddressEditPage from "./components/verify/AddressEditPage";
import {TestPage} from "./components/verify/TestPage";
import VerifyHistoryPage from "./components/verify/VerifyHistoryPage";
import CheckInPage from "./components/verify/CheckInPage";
import OrderConfirmPage from "./components/verify/OrderConfirmPage";
import OrderAddressEditPage from "./components/verify/OrderAddressEditPage";
import OrderAddressPage from "./components/verify/OrderAddressPage";
import HorizontalCalendarList from "./components/verify/horizontalCalendarList";
import FeedBackPage from "./components/verify/FeedBackPage";
import PersonalBirthdayPage from "./components/verify/PersonalBirthdayPage";
import SettingPage from "./components/verify/SettingPage";
import RegisterPage from "./components/verify/RegisterPage";
import Register2Page from "./components/verify/Register2Page";
import ResetPwdPage from "./components/verify/ResetPwdPage";
import ResetPwd2Page from "./components/verify/ResetPwd2Page";
import vUserDao from "./dao/vUserDao";
import {Actions} from "react-native-router-flux";
import WebviewPage from "./components/verify/WebviewPage";
import NFCScanPage from "./components/verify/NFCScanPage";
import PersonalEmailPage from "./components/verify/PersonalEmailPage";
import PersonalMobilePage from "./components/verify/PersonalMobilePage";

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
                {/*<Scene key="root_inter"
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
                            key="MePage"
                            component={MePage}
                            icon={TabIcon}
                            title={I18n('me')}
                            tabIconName={'tabMe'}/>
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
                    <Scene key="PersonalBirthdayPage" component={PersonalBirthdayPage}/>
                    <Scene key="SettingPage" component={SettingPage}/>
                    <Scene key="LoginPage" component={LoginPage}/>
                    <Scene key="LoginPageCN" component={LoginPageCN}/>
                    <Scene key="RegisterPage" component={RegisterPage}/>
                    <Scene key="Register2Page" component={Register2Page}/>
                    <Scene key="ResetPwdPage" component={ResetPwdPage}/>
                    <Scene key="ResetPwd2Page" component={ResetPwd2Page}/>
                    <Scene key="WebviewPage" component={WebviewPage}/>
                    <Scene key="NFCScanPage" component={NFCScanPage}/>
                    <Scene key="PersonalEmailPage" component={PersonalEmailPage}/>
                    <Scene key="PersonalMobilePage" component={PersonalMobilePage}/>
                    <Scene key="AboutProductPage" component={AboutProductPage}/>
                    <Scene key="ProductHistoryAntiFakePage" component={ProductHistoryAntiFakePage}/>
                    <Scene key="ProductHistoryPage2" component={ProductHistoryPage2}/>
                </Scene>*/}
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
                            tabIconName={'tabMall'}/>
                        <Scene
                            key="MePage"
                            component={MePage}
                            icon={TabIcon}
                            title={I18n('me')}
                            tabIconName={'tabMe'}/>
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
                    <Scene key="PersonalBirthdayPage" component={PersonalBirthdayPage}/>
                    <Scene key="SettingPage" component={SettingPage}/>
                    <Scene key="LoginPage" component={LoginPage}/>
                    <Scene key="LoginPageCN" component={LoginPageCN}/>
                    <Scene key="RegisterPage" component={RegisterPage}/>
                    <Scene key="Register2Page" component={Register2Page}/>
                    <Scene key="ResetPwdPage" component={ResetPwdPage}/>
                    <Scene key="ResetPwd2Page" component={ResetPwd2Page}/>
                    <Scene key="WebviewPage" component={WebviewPage}/>
                    <Scene key="NFCScanPage" component={NFCScanPage}/>
                    <Scene key="PersonalEmailPage" component={PersonalEmailPage}/>
                    <Scene key="PersonalMobilePage" component={PersonalMobilePage}/>
                    <Scene key="AboutProductPage" component={AboutProductPage}/>
                    <Scene key="ProductHistoryAntiFakePage" component={ProductHistoryAntiFakePage}/>
                    <Scene key="ProductHistoryPage2" component={ProductHistoryPage2}/>
                </Scene>

                <Scene key="LoadingModal" component={LoadingModal}/>
                <Scene key="ConfirmModal" component={ConfirmModal}/>
                <Scene key="CommonConfirmModal2" component={CommonConfirmModal2}/>
                <Scene key="CommonConfirmModal3" component={CommonConfirmModal3}/>
                <Scene key="SuccessModal" component={SuccessModal}/>

            </Lightbox>
        </Router>
    )
};


export default getRouter;