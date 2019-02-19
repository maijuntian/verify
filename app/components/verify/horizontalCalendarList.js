import React, {Component} from 'react';

// import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
// import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import {CalendarList} from 'react-native-calendars';
import {View, WebView} from 'react-native';
import * as constant from "../../style/constant";
import FBLoginView from "./FBLoginView";


/*GoogleSignin.configure({
    webClientId: '784601142106-oics6l2v158ao4piqm67jpqnmh6vd6er.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    accountName: '', // [Android] specifies an account name on the device that should be used
});*/

export default class HorizontalCalendarList extends Component {
    constructor(props) {
        super(props);
    }

    // Somewhere in your code
   /* _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(JSON.stringify(userInfo));
        } catch (error) {
            console.log(error.code);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };*/

    render() {
        return (
            <View >
               {/* <FBLogin
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
                />*/}

                {/*<GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn} />*/}
            </View>
        );
    }
}
