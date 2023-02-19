//
//  ViewController.swift
//  NSDocScan
//
//  Created by Terence Adrien Zama on 14/02/2023.
//
import VisionKit
import UIKit
import MLKit


@objc protocol NSDocCallback {
    func onImageSelected(image: UIImage)
    func onSuccess(blocs: NSArray)
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
            var nsBlocs = NSMutableArray()
            for block in result.blocks {

                let nsBloc: NSDictionary = ["bloc":  [
                    "text": block.text,
                    "cornerPoints": block.cornerPoints,
                    "frame": block.frame] as NSDictionary,
                                              "lines": NSMutableArray()
                ]

                for line in block.lines {

                    let nsLine: NSDictionary = ["line":  [
                        "text": line.text,
                        "cornerPoints": line.cornerPoints,
                        "frame": line.frame] as NSDictionary,
                                                  "elements": NSMutableArray()
                    ]
                    (nsBloc["lines"] as! NSMutableArray).add(nsLine)
                    for element in line.elements {

                        let nsElem: NSDictionary = ["elem":  [
                            "text": element.text,
                            "cornerPoints": element.cornerPoints,
                            "frame": element.frame] as NSDictionary
                        ]

                        (nsLine["elements"] as! NSMutableArray).add(nsElem)
                    }
                }

                nsBlocs.add(nsBloc)
            }
            
            self.callback?.onSuccess(blocs: nsBlocs)
            

        }

        

    }
    
    func documentCameraViewControllerDidCancel(_ controller: VNDocumentCameraViewController) {
        callback?.userCancelled()
    }
    
    func documentCameraViewController(_ controller: VNDocumentCameraViewController, didFailWithError error: Error) {
        callback?.onError(message: error.localizedDescription)
    }


}

