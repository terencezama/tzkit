//
//  ViewController.swift
//  NSDocScan
//
//  Created by Terence Adrien Zama on 14/02/2023.
//
import VisionKit
import UIKit
import MLKit


@objc class MLTextBase: NSObject {
    let text: String
    let cornerPoints: [NSValue]?
    let frame: CGRect?
    
    internal init(text: String, cornerPoints: [NSValue]?, frame: CGRect?) {
        self.text = text
        self.cornerPoints = cornerPoints
        self.frame = frame
    }
}

@objc class MLTextElement: NSObject {
    let elem: MLTextBase
    
    internal init(elem: MLTextBase) {
        self.elem = elem
    }
}

@objc class MLTextLine: NSObject {
    let line: MLTextBase
    var elements: [MLTextElement]
    
    internal init(line: MLTextBase, elements: [MLTextElement]) {
        self.line = line
        self.elements = elements
    }
}

@objc class MLTextBloc: NSObject {
    let bloc: MLTextBase
    var lines: [MLTextLine]
    
    internal init(bloc: MLTextBase, lines: [MLTextLine]) {
        self.bloc = bloc
        self.lines = lines
    }
}

@objc protocol NSDocCallback {
    func onImageSelected(image: UIImage)
    func onSuccess(blocs: [MLTextBloc])
    func onError(message: String)
    func userCancelled()
}

@objc(NSDocScanVc)
@objcMembers
class NSDocScanVc: NSObject, VNDocumentCameraViewControllerDelegate {
    let textRecognizer = TextRecognizer.textRecognizer()
    let documentCameraViewController = VNDocumentCameraViewController()
    var callback: NSDocCallback? = nil
    
    override init() {
        super.init()
        documentCameraViewController.delegate = self
    }
    
    func documentCameraViewController(_ controller: VNDocumentCameraViewController, didFinishWith scan: VNDocumentCameraScan) {
        
        controller.dismiss(animated: true)
        
        
        // convert scan UIImage to jpeg data
        guard let scannedDocumentImage: Data = scan
            .imageOfPage(at: (scan.pageCount - 1) )
            .jpegData(compressionQuality: CGFloat(100) / CGFloat(100)) else {
            return
        }
        
        guard let image = UIImage(data: scannedDocumentImage) else {
            return
        }
        
        self.callback?.onImageSelected(image: image)
        let visionImage = VisionImage(image: image)
        visionImage.orientation = image.imageOrientation
        
        
        textRecognizer.process(visionImage) { result, error in
          guard error == nil, let result = result else {
            // Error handling
            return
          }
          // Recognized text
//            let resultText = result.text
            var mlBlocs:[MLTextBloc] = []
            for block in result.blocks {

                
                let mlBloc = MLTextBloc(bloc: MLTextBase(text: block.text, cornerPoints: block.cornerPoints, frame: block.frame), lines: [])
                for line in block.lines {
                    let mlLine = MLTextLine(line: MLTextBase(text: line.text, cornerPoints: line.cornerPoints, frame: line.frame), elements: [])
                    mlBloc.lines.append(mlLine)
                    for element in line.elements {
                        let mlElem = MLTextElement(elem: MLTextBase(text: element.text, cornerPoints: element.cornerPoints, frame: element.frame))
                        mlLine.elements.append(mlElem)
                    }
                }
                mlBlocs.append(mlBloc)
            }
            
            self.callback?.onSuccess(blocs: mlBlocs)
            

        }

        

    }
    
    func documentCameraViewControllerDidCancel(_ controller: VNDocumentCameraViewController) {
        callback?.userCancelled()
    }
    
    func documentCameraViewController(_ controller: VNDocumentCameraViewController, didFailWithError error: Error) {
        callback?.onError(message: error.localizedDescription)
    }


}

