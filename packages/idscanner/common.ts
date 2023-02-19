import { Image, Observable } from '@nativescript/core';

export interface IdscannerCallback {
  onErrorWithMessage(message: string): void;
  onImageSelectedWithImage(image: Image): void;
  onSuccessWithBlocs(blocs: any): void;
  userCancelled(): void;
}

export class IdscannerCommon extends Observable {
  callback?: IdscannerCallback;
}
