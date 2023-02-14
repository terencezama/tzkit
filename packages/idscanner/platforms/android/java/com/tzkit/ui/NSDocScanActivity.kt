package com.tzkit.ui
import android.os.Bundle
import androidx.activity.ComponentActivity


class NSDocScanActivity: ComponentActivity() {

    private val documentScanner = NSDocScan();


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        documentScanner.start(this)
        documentScanner.callback = NSDocScanManager.callback;
        documentScanner.completed =  {
            finish()
        }
    }

    public fun getDocumentScanner(): NSDocScan {
        return documentScanner;
    }



}