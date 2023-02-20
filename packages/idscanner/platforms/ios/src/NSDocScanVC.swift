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
    func onSuccess(json: String)
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
    
    func convertPoints(_ points: [NSValue]) -> NSArray {
        return points.map { v in
            let point = v as! CGPoint;
            return [
                 point.x,
                 point.y
            ] as NSArray
        } as NSArray
    }
    func convertFrame(_ frame: CGRect) -> NSArray {
        return [
            frame.origin.x,
            frame.origin.y,
            frame.size.width,
            frame.size.height
        ] as NSArray
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
            let nsBlocs = NSMutableArray()
            for block in result.blocks {
                let nsBloc: NSDictionary = ["bloc":  [
                    "text": block.text,
                    "cornerPoints": self.convertPoints(block.cornerPoints),
                    "frame": self.convertFrame(block.frame)] as NSDictionary,
                                              "lines": NSMutableArray()
                ]
                

                for line in block.lines {

                    let nsLine: NSDictionary = ["line":  [
                        "text": line.text,
                        "cornerPoints": self.convertPoints(line.cornerPoints),
                        "frame": self.convertFrame(line.frame)] as NSDictionary,
                                                  "elements": NSMutableArray()
                    ]
                    (nsBloc["lines"] as! NSMutableArray).add(nsLine)
                    for element in line.elements {

                        let nsElem: NSDictionary = ["elem":  [
                            "text": element.text,
                            "cornerPoints": self.convertPoints(element.cornerPoints),
                            "frame": self.convertFrame(element.frame)] as NSDictionary
                        ]

                        (nsLine["elements"] as! NSMutableArray).add(nsElem)
                    }
                }

                nsBlocs.add(nsBloc)
            }
            
            guard
                let jsonData = try? JSONSerialization.data(withJSONObject: nsBlocs, options: []),
                let json = String(data: jsonData, encoding: .ascii)
            else { return}
            
            
            self.callback?.onSuccess(json: json)
            
        }

        

    }
    
    func documentCameraViewControllerDidCancel(_ controller: VNDocumentCameraViewController) {
        callback?.userCancelled()
    }
    
    func documentCameraViewController(_ controller: VNDocumentCameraViewController, didFailWithError error: Error) {
        callback?.onError(message: error.localizedDescription)
    }


}

