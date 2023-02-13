package com.tzkit.ui

import android.graphics.Bitmap

interface NSDocCallback {
    fun onSuccess(imageBitmap: Bitmap)
    fun onError(message: String)
    fun userCancelled()
}