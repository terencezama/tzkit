package com.tzkit.ui

import android.graphics.Bitmap
import android.graphics.Point
import android.graphics.Rect
import android.util.Log
import androidx.activity.ComponentActivity
import com.google.gson.Gson
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


    private fun convertPoints(points: Array<Point>): List<Array<Number>> {
        return points.map { p -> arrayOf(p.x, p.y) }
    }

    private fun convertFrame(rect: Rect): Array<Int> {
        return arrayOf(rect.left, rect.top, rect.width(), rect.height())
    }

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
                        val mlBlocs: MutableList<Map<String, Any>> = mutableListOf();
                        for (block in result.textBlocks) {

                            val mlLines = mutableListOf<Map<String, Any>>();
                            val mlBloc: Map<String, Any> = mapOf(
                                "bloc" to mapOf(
                                    "text" to block.text,
                                    "cornerPoints" to convertPoints(block.cornerPoints!!),
                                    "frame" to convertFrame(block.boundingBox!!)
                                ),
                                "lines" to mlLines
                            );
                            for (line in block.lines) {
                                val mlElements = mutableListOf<Map<String, Any>>()
                                val mlLine: Map<String, Any> = mapOf(
                                    "line" to mapOf(
                                        "text" to line.text,
                                        "cornerPoints" to convertPoints(line.cornerPoints!!),
                                        "frame" to convertFrame(line.boundingBox!!)
                                    ),
                                    "elements" to mlElements
                                );


                                mlLines.add(mlLine)
                                for (element in line.elements) {

                                    val mlElem: Map<String, Any> = mapOf(
                                        "elem" to mapOf(
                                            "text" to element.text,
                                            "cornerPoints" to convertPoints(element.cornerPoints!!),
                                            "frame" to convertFrame(element.boundingBox!!)
                                        )
                                    );

                                    mlElements.add(mlElem)
                                }
                            }
                            mlBlocs.add(mlBloc)
                        }
                        callback?.onSuccess(Gson().toJson(mlBlocs))
                        completed?.invoke();


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