package com.jetgo;


import android.os.Bundle;
import com.cboy.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.content.res.Configuration;
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    @Override
    protected String getMainComponentName() {
        return "JetGo";
    }
    @Override
     protected void onCreate(Bundle savedInstanceState) {
         SplashScreen.show(this);  // 添加这一句
         super.onCreate(savedInstanceState);
     }
}
