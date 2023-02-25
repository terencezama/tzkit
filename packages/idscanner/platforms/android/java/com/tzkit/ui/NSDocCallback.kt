package com.tzkit.ui

import android.graphics.Bitmap

interface NSDocCallback {
    fun onImageSelected( image: Bitmap)
    fun onSuccess(json: String)
    fun onError(message: String)
    fun userCancelled()
}