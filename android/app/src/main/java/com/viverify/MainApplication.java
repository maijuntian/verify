package com.viverify;import android.app.Application;import android.content.Context;import android.graphics.Typeface;import com.facebook.react.ReactApplication;import community.revteltech.nfc.NfcManagerPackage;import codes.simen.IMEI.IMEI;import com.learnium.RNDeviceInfo.RNDeviceInfo;import com.imagepicker.ImagePickerPackage;import com.lewin.qrcode.QRScanReaderPackage;import com.horcrux.svg.SvgPackage;import co.apptailor.googlesignin.RNGoogleSigninPackage;import io.realm.react.RealmReactPackage;import com.apsl.versionnumber.RNVersionNumberPackage;import com.magus.fblogin.FacebookLoginPackage;import com.oblador.vectoricons.VectorIconsPackage;import com.react.rnspinkit.RNSpinkitPackage;import com.reactnative.ivpusic.imagepicker.PickerPackage;import com.AlexanderZaytsev.RNI18n.RNI18nPackage;import org.reactnative.camera.RNCameraPackage;import com.airbnb.android.react.lottie.LottiePackage;import com.umeng.DplusReactPackage;import com.umeng.RNUMConfigure;import com.umeng.commonsdk.UMConfigure;import com.viverify.module.download.DownloadFilePackage;import com.viverify.module.setting.OpenSettingsPackage;import com.viverify.module.splash.SplashScreenReactPackage;import com.viverify.module.upgrade.UpgradePackage;import com.viverify.views.webview.CustomWebViewPackage;import com.facebook.react.ReactNativeHost;import com.facebook.react.ReactPackage;import com.facebook.react.shell.MainReactPackage;import com.facebook.soloader.SoLoader;import com.zyu.ReactNativeWheelPickerPackage;import java.lang.reflect.Field;import java.util.Arrays;import java.util.List;public class MainApplication extends Application implements ReactApplication {    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {        @Override        public boolean getUseDeveloperSupport() {            return BuildConfig.DEBUG;        }        @Override        protected List<ReactPackage> getPackages() {            return Arrays.<ReactPackage>asList(                    new OpenSettingsPackage(),                    new UpgradePackage(),                    new MainReactPackage(),                    new NfcManagerPackage(),                    new IMEI(),                    new RNDeviceInfo(),                    new ReactNativeWheelPickerPackage(),                    new ImagePickerPackage(),                    new QRScanReaderPackage(),                    new SvgPackage(),                    new RNCameraPackage(),                    new LottiePackage(),                    new RNVersionNumberPackage(),                    new VectorIconsPackage(),                    new RNSpinkitPackage(),                    new RNI18nPackage(),                    new CustomWebViewPackage(),                    new DownloadFilePackage(),                    new PickerPackage(),                    new RealmReactPackage(),                    new SplashScreenReactPackage(),                    new LottiePackage(),                    new DplusReactPackage(),                    new FacebookLoginPackage(),                    new RNGoogleSigninPackage()            );        }        @Override        protected String getJSMainModuleName() {            return "index";        }    };    @Override    public ReactNativeHost getReactNativeHost() {        return mReactNativeHost;    }    @Override    public void onCreate() {        super.onCreate();        SoLoader.init(this, /* native exopackage */ false);        UMConfigure.setLogEnabled(true);        RNUMConfigure.init(this, "5c637e85f1f556c7d2000ebd", "Umeng", UMConfigure.DEVICE_TYPE_PHONE,                null);//      replaceSystemDefaultFont(this,"fonts/Charter.ttf");    }    public void replaceSystemDefaultFont(Context context, String fontPath) {        replaceTypefaceField("MONOSPACE", createTypeface(context, fontPath));    }    //通过字体地址创建自定义字体    private Typeface createTypeface(Context context, String fontPath) {        return Typeface.createFromAsset(context.getAssets(), fontPath);    }    //关键--》通过修改MONOSPACE字体为自定义的字体达到修改app默认字体的目的    private void replaceTypefaceField(String fieldName, Object value) {        try {            Field defaultField = Typeface.class.getDeclaredField(fieldName);            defaultField.setAccessible(true);            defaultField.set(null, value);        } catch (NoSuchFieldException e) {            e.printStackTrace();        } catch (IllegalAccessException e) {            e.printStackTrace();        }    }}