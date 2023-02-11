import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NsdocScanComponent } from './nsdoc-scan.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NsdocScanComponent }])],
  declarations: [NsdocScanComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NsdocScanModule {}
