import { Utils } from '@nativescript/core';
import { IdscannerCommon } from './common';

@NativeClass()
class NSDocCallbackImpl extends NSObject implements NSDocCallback {
  public static ObjCProtocols = [NSDocCallback];
  static new(): NSDocCallbackImpl {
    return <NSDocCallbackImpl>super.new();
  }
  onErrorWithMessage(message: string): void {
    console.log(message);
  }
  onImageSelectedWithImage(image: UIImage): void {
    console.log(image);
  }
  onSuccessWithBlocs(blocs: NSArray<MLTextBloc> | MLTextBloc[]): void {
    console.log(blocs);
  }
  userCancelled(): void {
    console.log('user cancelled');
  }
}

export class Idscanner extends IdscannerCommon {
  start() {
    const rootVc = Utils.ios.getRootViewController() as UIViewController;
    // const ref = new WeakRef(this);
    let scanner = new NSDocScanVc();
    scanner.callback = NSDocCallbackImpl.new();
    rootVc.presentViewControllerAnimatedCompletion(scanner.documentCameraViewController, true, () => {
      console.log('nice');
    });
  }
}
