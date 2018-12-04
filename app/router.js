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
                    <Scene key="ProductListPage" component={ProductListPage}/>
                    <Scene key="ProductDetailPage" component={ProductDetailPage}/>


                </Scene>
                <Scene key="LoginPage" component={LoginPage} hideNavBar hideTabBar hide/>
                <Scene key="LoadingModal" component={LoadingModal}/>
            </Lightbox>
        </Router>
    )
};


export default getRouter;