import { Component, NgZone } from '@angular/core';
import { DemoSharedNsdocScan } from '@demo/shared';
import {} from '@tzkit/nsdoc-scan';

@Component({
  selector: 'demo-nsdoc-scan',
  templateUrl: 'nsdoc-scan.component.html',
})
export class NsdocScanComponent {
  demoShared: DemoSharedNsdocScan;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNsdocScan();
  }
}
