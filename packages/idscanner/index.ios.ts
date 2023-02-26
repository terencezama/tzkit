import { Image, Utils, ImageSource } from '@nativescript/core';
import { IdscannerCallback, IdscannerCommon } from './common';

@NativeClass()
class NSDocCallbackImpl extends NSObject implements NSDocCallback {
  public static ObjCProtocols = [NSDocCallback];
  static new(): NSDocCallbackImpl {
    return <NSDocCallbackImpl>super.new();
  }
  public cCallback?: IdscannerCallback;

  onSuccessWithJson(json: string): void {
    this.cCallback?.onSuccessWithBlocs(JSON.parse(json));
  }
  onErrorWithMessage(message: string): void {
    this.cCallback?.onErrorWithMessage(message);
  }
  onImageSelectedWithImage(image: UIImage): void {
    const nsImage = new ImageSource(image);
    this.cCallback?.onImageSelectedWithImage(nsImage);
  }

  userCancelled(): void {
    this.cCallback?.userCancelled();
  }
}

export class Idscanner extends IdscannerCommon {
  setCallback(callback: IdscannerCallback) {
    this.callback = callback;
  }
  start() {
    const rootVc = Utils.ios.getRootViewController() as UIViewController;
    // const ref = new WeakRef(this);
    let scanner = new NSDocScanVc();
    let nsdocCallbackImpl = NSDocCallbackImpl.new();
    scanner.callback = nsdocCallbackImpl;
    nsdocCallbackImpl.cCallback = this.callback;
    rootVc.presentViewControllerAnimatedCompletion(scanner.documentCameraViewController, true, () => {});
  }
}
