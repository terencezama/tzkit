package com.tzkit.ui

import android.graphics.Bitmap
import androidx.activity.ComponentActivity
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import com.websitebeaver.documentscanner.DocumentScanner
import com.websitebeaver.documentscanner.utils.ImageUtil

class NSDocScan() {
    var callback: NSDocCallback? = null;

    var completed: (() -> Unit)? = null;
    private lateinit var documentScanner: DocumentScanner;
    private val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
    fun start (ctx: ComponentActivity){
         documentScanner = DocumentScanner(
            ctx,
            { croppedImageResults ->
                // display the first cropped image
                val bitmap: Bitmap = ImageUtil().readBitmapFromFileUriString(
                    croppedImageResults.first(),
                    ctx.contentResolver
                )
                callback?.onImageSelected(bitmap)

                val image = InputImage.fromBitmap(bitmap, 0)
                val result = recognizer.process(image)
                    .addOnSuccessListener { result ->
                        // Task completed successfully
                        // ...

                        val resultText = result.text
                        val mlBlocs= ArrayList<MLTextBloc>();
                        for (block in result.textBlocks) {

                            val mlBloc = MLTextBloc(MLTextBase(block.text, block.cornerPoints, block.boundingBox),
                                ArrayList()
                            )
                            for (line in block.lines) {

                                val mlLine = MLTextLine(MLTextBase(line.text, line.cornerPoints, line.boundingBox),
                                    ArrayList())
                                mlBloc.lines.add(mlLine)
                                for (element in line.elements) {

                                    val mlElem = MLTextElement(MLTextBase(element.text, element.cornerPoints, element.boundingBox))
                                    mlLine.elements.add(mlElem)
                                }
                            }
                            mlBlocs.add(mlBloc)
                        }
                        callback?.onSuccess(mlBlocs.toTypedArray())
                        completed?.invoke();

//                        Log.d("cool", Gson().toJson(mlBlocs))
                    }
                    .addOnFailureListener { e ->callback?.onError(e.message!!)
                    }
            },
            {
                // an error happened
                    errorMessage -> callback?.onError(errorMessage)

            },
            {
                // user canceled document scan
                callback?.userCancelled()
            },
             null,
             null,
             1,
             null

            )

        documentScanner.startScan()
    }
}