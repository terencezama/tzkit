import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { IdscannerComponent } from './idscanner.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: IdscannerComponent }])],
  declarations: [IdscannerComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class IdscannerModule {}
