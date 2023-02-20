import { Image } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { Idscanner } from '@tzkit/idscanner';

export class DemoSharedIdscanner extends DemoSharedBase {
  scanner = new Idscanner();
  testIt() {
    // this.scanner.callback = {

    // }
    this.scanner.callback = {
      onErrorWithMessage(message: string): void {},
      onImageSelectedWithImage(image: Image): void {
        console.log(image);
      },
      onSuccessWithBlocs(blocs: any): void {
        console.log(blocs);
      },
      userCancelled(): void {},
    };
    this.scanner.start();
  }
}
