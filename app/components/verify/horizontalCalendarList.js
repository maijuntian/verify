import React, {Component} from 'react';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import {View, WebView} from 'react-native';
import toast from "../common/ToastProxy";
import {statusCodes as StatusCodes} from "react-native-google-signin/src/GoogleSignin";


GoogleSignin.configure({
    webClientId: '658458075290-685fam0cumnkbc2vg4nhcosm1q79gulu.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '658458075290-1dds00hpcodmqokcmpsh8h32kftuicku.apps.googleusercontent.com',
});

export default class HorizontalCalendarList extends Component {
    constructor(props) {
        super(props);
    }

    // Somewhere in your code
    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            toast(JSON.stringify(userInfo));
        } catch (error) {
            toast(error.code);
            if (error.code === StatusCodes.SIGN_IN_CANCELLED) {
                toast("user cancelled the login flow");
            } else if (error.code === StatusCodes.IN_PROGRESS) {
                toast("operation (f.e. sign in) is in progress already");
            } else if (error.code === StatusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                toast("play services not available or outdated");
            } else {
                toast("some other error happened");
            }
        }
    };

    render() {
        return (
            <View >
                {/*<FBLogin
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

                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn} />
            </View>
        );
    }
}
