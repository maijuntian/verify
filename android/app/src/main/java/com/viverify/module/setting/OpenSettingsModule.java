package com.viverify.module.setting;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.provider.Settings;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by mai on 2019/5/29.
 */
public class OpenSettingsModule extends ReactContextBaseJavaModule {
    public OpenSettingsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "OpenSettings";
    }

    @ReactMethod
    public void openNetworkSettings() {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            Log.e("OpenSettingsModule", "currentActivity = null");
            return;
        }

        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        Uri uri = Uri.fromParts("package", currentActivity.getPackageName(), null);
        intent.setData(uri);
        try {
            currentActivity.startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
            try {
                currentActivity.startActivity(new Intent(Settings.ACTION_SETTINGS));
            } catch (Exception e1) {
                e1.printStackTrace();
            }
        }
    }
}
