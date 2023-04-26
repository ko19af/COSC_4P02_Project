package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RatingBar;
import android.widget.Toast;

public class rate extends AppCompatActivity {
    RatingBar bar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rate);
        bar = (RatingBar)findViewById(R.id.ratingBar);
        bar.setOnRatingBarChangeListener(new RatingBar.OnRatingBarChangeListener() {
            @Override
            public void onRatingChanged(RatingBar ratingBar, float rating, boolean b) {
                Toast.makeText(rate.this, "The Rating is " +rating, Toast.LENGTH_SHORT).show();
            }
        });
        Button home = findViewById(R.id.buttonHome);
        //Button exit = findViewById(R.id.buttonExit);
        home.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });

        //exit.setOnClickListener(new View.OnClickListener() {
           // @Override
            //public void onClick(View view) {
                //finish();
                //System.exit(0);
            }
       // });
    }
//}