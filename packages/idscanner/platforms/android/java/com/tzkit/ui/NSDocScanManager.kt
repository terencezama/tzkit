package com.tzkit.ui

import android.content.Intent
import androidx.activity.ComponentActivity

object NSDocScanManager {

    var callback: NSDocCallback? = null;
    fun show(ctx: ComponentActivity){
        val i = Intent(ctx, NSDocScanActivity::class.java)
        ctx.startActivity(i)
    }

}