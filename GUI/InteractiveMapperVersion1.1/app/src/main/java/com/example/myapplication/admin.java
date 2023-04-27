package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class admin extends AppCompatActivity {
    private WebView webViewn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin);
        webViewn = (WebView) findViewById(R.id.webviewn);
        webViewn.setWebViewClient(new WebViewClient());
        webViewn.loadUrl("https://ko19af.github.io/COSC_4P02_Project/COSC_4P02_Project_BackEnd/Start.html");

        WebSettings webSettings =webViewn.getSettings();
        webSettings.setJavaScriptEnabled(true);
    }

    @Override
    public void onBackPressed() {
        if (webViewn.canGoBack()){
            webViewn.goBack();
        } else {
            super.onBackPressed();
        }
    }
}


