package com.example.myapplication;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import android.webkit.WebView;
import android.webkit.WebViewClient;


public class contact extends AppCompatActivity {
    private WebView webView4;
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact);

        webView4 =  findViewById(R.id.webview4);
        webView4.setWebViewClient(new WebViewClient());
        webView4.loadUrl("https://ko19af.github.io/COSC_4P02_Project/COSC_4P02_Project_BackEnd/Contact.html");


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
