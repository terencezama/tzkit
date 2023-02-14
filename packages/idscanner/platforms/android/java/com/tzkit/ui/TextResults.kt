package com.tzkit.ui

import android.graphics.Point
import android.graphics.Rect


class MLTextBase (val text: String, cornerPoints: Array<Point>?, frame: Rect?)
class MLTextElement(val elem: MLTextBase) {
}
class MLTextLine(val line: MLTextBase, val elements: ArrayList<MLTextElement>) {}

class MLTextBloc(val bloc: MLTextBase, val lines: ArrayList<MLTextLine> ) {}