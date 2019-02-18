import React, {Component} from 'react';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import {CalendarList} from 'react-native-calendars';
import {View, WebView} from 'react-native';
import * as constant from "../../style/constant";
import FBLoginView from "./FBLoginView";


export default class HorizontalCalendarList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <FBLogin
                    buttonView={<FBLoginView/>}
                    ref={(fbLogin) => {
                        this.fbLogin = fbLogin
                    }}
                    loginBehavior={FBLoginManager.LoginBehaviors.Native}
                    permissions={["email", "user_friends"]}
                    onLogin={function (e) {
                        console.log(e)
                    }}
                    onLoginFound={function (e) {
                        console.log(e)
                    }}
                    onLoginNotFound={function (e) {
                        console.log(e)
                    }}
                    onLogout={function (e) {
                        console.log(e)
                    }}
                    onCancel={function (e) {
                        console.log(e)
                    }}
                    onPermissionsMissing={function (e) {
                        console.log(e)
                    }}
                /></View>
        );
    }
}
