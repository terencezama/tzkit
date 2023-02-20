interface NSDocCallback {
  onErrorWithMessage(message: string): void;

  onImageSelectedWithImage(image: UIImage): void;

  onSuccessWithJson(json: string): void;

  userCancelled(): void;
}
declare var NSDocCallback: {
  prototype: NSDocCallback;
};

declare class NSDocScanVc extends NSObject implements VNDocumentCameraViewControllerDelegate {
  static alloc(): NSDocScanVc; // inherited from NSObject

  static new(): NSDocScanVc; // inherited from NSObject

  callback: NSDocCallback;

  readonly documentCameraViewController: VNDocumentCameraViewController;

  readonly textRecognizer: MLKTextRecognizer;

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  class(): typeof NSObject;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  convertFrame(frame: CGRect): NSArray<any>;

  convertPoints(points: NSArray<NSValue> | NSValue[]): NSArray<any>;

  documentCameraViewControllerDidCancel(controller: VNDocumentCameraViewController): void;

  documentCameraViewControllerDidFailWithError(controller: VNDocumentCameraViewController, error: NSError): void;

  documentCameraViewControllerDidFinishWithScan(controller: VNDocumentCameraViewController, scan: VNDocumentCameraScan): void;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  self(): this;
}
