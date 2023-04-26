package com.example.myapplication;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;


public class contact extends AppCompatActivity {
    private WebView webView4;
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact);

        webView4 = (WebView) findViewById(R.id.webview4);
        webView4.setWebViewClient(new WebViewClient());
        webView4.loadUrl("https://www.arsenal.com/");
        WebSettings webSettings =webView4.getSettings();
        webSettings.setJavaScriptEnabled(true);
    }

    @Override
    public void onBackPressed() {
        if (webView4.canGoBack()){
            webView4.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
