declare class MLTextBase extends NSObject {
  static alloc(): MLTextBase; // inherited from NSObject

  static new(): MLTextBase; // inherited from NSObject
}

declare class MLTextBloc extends NSObject {
  static alloc(): MLTextBloc; // inherited from NSObject

  static new(): MLTextBloc; // inherited from NSObject
}

declare class MLTextElement extends NSObject {
  static alloc(): MLTextElement; // inherited from NSObject

  static new(): MLTextElement; // inherited from NSObject
}

declare class MLTextLine extends NSObject {
  static alloc(): MLTextLine; // inherited from NSObject

  static new(): MLTextLine; // inherited from NSObject
}

interface NSDocCallback {
  onErrorWithMessage(message: string): void;

  onImageSelectedWithImage(image: UIImage): void;

  onSuccessWithBlocs(blocs: NSArray<MLTextBloc> | MLTextBloc[]): void;

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
