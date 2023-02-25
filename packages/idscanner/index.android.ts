import { Application, ImageSource } from '@nativescript/core';
import { IdscannerCommon, IdscannerCallback } from './common';

export class Idscanner extends IdscannerCommon {
  start() {
    const activity = Application.android.foregroundActivity || Application.android.startActivity;
    // const c = new com.tzkit.ui.NSDocScanActivity.Companion();
    // const intent = new android.content.Intent(activity, com.tzkit.ui.NSDocScanActivity.class);
    // activity.startActivity(intent);

    const callback: IdscannerCallback = this.callback;

    com.tzkit.ui.NSDocScanManager.INSTANCE.setCallback(
      new com.tzkit.ui.NSDocCallback({
        onImageSelected(param0: globalAndroid.graphics.Bitmap) {
          const imageSource = new ImageSource(param0);
          callback?.onImageSelectedWithImage(imageSource);
        },
        onSuccess(param0: string) {
          callback?.onSuccessWithBlocs(JSON.parse(param0));
        },
        onError(param0: string) {
          callback?.onErrorWithMessage(param0);
        },
        userCancelled() {
          callback?.userCancelled();
        },
      })
    );
    console.log(com.tzkit.ui.NSDocScanManager.INSTANCE.getCallback());
    com.tzkit.ui.NSDocScanManager.INSTANCE.show(activity);
  }
}
