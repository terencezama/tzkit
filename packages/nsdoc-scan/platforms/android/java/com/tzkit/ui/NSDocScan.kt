package com.tzkit.ui

import android.graphics.Bitmap
import android.util.Log
import android.widget.ImageView
import androidx.activity.ComponentActivity
import com.websitebeaver.documentscanner.DocumentScanner
import com.websitebeaver.documentscanner.utils.ImageUtil

class NSDocScan() {
    var callback: NSDocCallback? = null;
    private lateinit var documentScanner: DocumentScanner;
    fun start (ctx: ComponentActivity){
         documentScanner = DocumentScanner(
            ctx,
            { croppedImageResults ->
                // display the first cropped image
                val bitmap: Bitmap = ImageUtil().readBitmapFromFileUriString(
                    croppedImageResults.first(),
                    ctx.contentResolver
                )
                callback?.onSuccess(bitmap)
            },
            {
                // an error happened
                    errorMessage -> callback?.onError(errorMessage)

            },
            {
                // user canceled document scan
                callback?.userCancelled()
            },

            )

        documentScanner.startScan()
    }
}