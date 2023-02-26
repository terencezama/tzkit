import { NgZone } from '@angular/core';
import { ImageSource } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { Idscanner } from '@tzkit/idscanner';
import { IdscannerCallback } from '@tzkit/idscanner/common';

export class DemoSharedIdscanner extends DemoSharedBase implements IdscannerCallback {
  constructor(private _ngZone: NgZone) {
    super();
  }
  scanner = new Idscanner();
  console = '<code /> will appear';
  imageSrc: ImageSource = null;

  testIt() {
    this.scanner.callback = this;
    this.scanner.start();
  }

  onErrorWithMessage(message: string): void {
    this.console = message;
  }
  onImageSelectedWithImage(imageSource: ImageSource): void {
    this._ngZone.run(() => {
      this.imageSrc = imageSource;
    });
  }
  onSuccessWithBlocs(blocs: any): void {
    this._ngZone.run(() => {
      this.console = JSON.stringify(blocs);
    });
  }
  userCancelled(): void {}
}
