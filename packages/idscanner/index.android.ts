import { Application } from '@nativescript/core';
import { IdscannerCommon } from './common';

export class Idscanner extends IdscannerCommon {
  start() {
    const activity = Application.android.foregroundActivity || Application.android.startActivity;
    // const c = new com.tzkit.ui.NSDocScanActivity.Companion();
    // const intent = new android.content.Intent(activity, com.tzkit.ui.NSDocScanActivity.class);
    // activity.startActivity(intent);

    com.tzkit.ui.NSDocScanManager.INSTANCE.setCallback(
      new com.tzkit.ui.NSDocCallback({
        onImageSelected(param0: globalAndroid.graphics.Bitmap) {
          // alert('cool');
          // alert('cool');
        },
        onSuccess(param0: androidNative.Array<com.tzkit.ui.MLTextBloc>) {
          setTimeout(() => {
            console.log('cooler');
            console.log(JSON.stringify(param0));
            alert('cool');
          }, 3000);
        },
        onError(param0: string) {
          console.log('some error happened');
        },
        userCancelled() {
          console.log('user cancelled');
        },
      })
    );
    console.log(com.tzkit.ui.NSDocScanManager.INSTANCE.getCallback());
    com.tzkit.ui.NSDocScanManager.INSTANCE.show(activity);
  }
}
