package com.example.myapplication;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.RatingBar;
import android.widget.Toast;

import com.example.myapplication.databinding.ActivityMainBinding;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationBarView;

public class MainActivity extends AppCompatActivity {
    private WebView webView;
    BottomNavigationView bottomNavigationView;



    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.example_menu, menu);
        return true;

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {



        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btn = findViewById(R.id.buttonMain);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(MainActivity.this, openmap.class));
            }
        });





        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);


        bottomNavigationView = findViewById(R.id.bottomNavigator);
        bottomNavigationView.setSelectedItemId(R.id.home);

        bottomNavigationView.setOnItemSelectedListener(new NavigationBarView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.home:
                        // Start the MainActivity and close the current activity
                        Intent intent = new Intent(MainActivity.this, MainActivity.class);
                        startActivity(intent);
                        finish();
                        return true;
                    case R.id.about:
                        // Start the MainActivity and close the current activity
                        Intent intent1 = new Intent(MainActivity.this, about.class);
                        startActivity(intent1);
                        return true;
                    case R.id.Admin:
                        Intent intentDashboard = new Intent(MainActivity.this, admin.class);
                        startActivity(intentDashboard);
                        return true;
                    case R.id.contact:
                        Intent intentNotifications = new Intent(MainActivity.this, contact.class);
                        startActivity(intentNotifications);
                        return true;
                    case R.id.rate:
                        Intent intentRate = new Intent(MainActivity.this, rate.class);
                        startActivity(intentRate);
                        return true;
                }

                return false;
            }
        });




    }





    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch(item.getItemId())
        {
            case R.id.home:
                // Start the MainActivity and close the current activity
                Intent intent = new Intent(this, MainActivity.class);
                startActivity(intent);
                finish();
                return true;
            case R.id.about:
            Intent myintent = new Intent(MainActivity.this, about.class);
            startActivity(myintent);
            return true;


            case R.id.Admin:
                Intent myintent1 = new Intent(MainActivity.this, admin.class);
                startActivity(myintent1);
            return true;

            case R.id.contact:
                Intent myintent2 = new Intent(MainActivity.this, contact.class);
                startActivity(myintent2);
            return true;
            case R.id.rate:
                Intent intent3 = new Intent(MainActivity.this, rate.class);
                startActivity(intent3);
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

}