package com.verify;

import android.content.Intent;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.umeng.analytics.MobclickAgent;
import com.verify.module.splash.SplashScreen;

public class MainActivity extends ReactActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
//        SplashScreen.show(this,true);
        super.onCreate(savedInstanceState);

        MobclickAgent.setSessionContinueMillis(1000*60);
        MobclickAgent.onResume(this);
        if((getIntent().getFlags() & Intent.FLAG_ACTIVITY_BROUGHT_TO_FRONT) != 0){
		   finish();
		   return;
		}
    }

    @Override
    protected void onPause() {
        super.onPause();

        MobclickAgent.onPause(this);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "VerifyAPP";
    }
}
