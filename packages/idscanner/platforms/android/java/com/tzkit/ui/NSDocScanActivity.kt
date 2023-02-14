package com.tzkit.ui


import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity


class NSDocScanActivity: ComponentActivity() {

    private val documentScanner = NSDocScan();


    companion object {
        fun show(ctx: ComponentActivity){
            val i = Intent(ctx, NSDocScanActivity::class.java)
            ctx.startActivity(i)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        documentScanner.start(this)
        documentScanner.completed =  {
            finish()
        }
    }

    public fun getDocumentScanner(): NSDocScan {
        return documentScanner;
    }



}