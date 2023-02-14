import { Application } from '@nativescript/core';
import { IdscannerCommon } from './common';

export class Idscanner extends IdscannerCommon {
  start() {
    const activity = Application.android.foregroundActivity || Application.android.startActivity;
    // const c = new com.tzkit.ui.NSDocScanActivity.Companion();
    const intent = new android.content.Intent(activity, com.tzkit.ui.NSDocScanActivity.class);
    activity.startActivity(intent);

    setTimeout(() => {
      const nextActivity = (Application.android.foregroundActivity || Application.android.startActivity) as com.tzkit.ui.NSDocScanActivity;
      console.log(Object.keys(nextActivity), nextActivity);
      nextActivity.getDocumentScanner().setCallback(
        new com.tzkit.ui.NSDocCallback({
          onImageSelected(param0: globalAndroid.graphics.Bitmap) {
            console.log('image ready');
          },
          onSuccess(param0: androidNative.Array<com.tzkit.ui.MLTextBloc>) {
            console.log(param0);
          },
          onError(param0: string) {
            console.log('some error happened');
          },
          userCancelled() {
            console.log('user cancelled');
          },
        })
      );
    }, 1000);
  }
}
