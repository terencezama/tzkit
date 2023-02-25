import { Component, NgZone } from '@angular/core';
import { DemoSharedIdscanner } from '@demo/shared';
import {} from '@tzkit/idscanner';

@Component({
  selector: 'demo-idscanner',
  templateUrl: 'idscanner.component.html',
})
export class IdscannerComponent {
  demoShared: DemoSharedIdscanner;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedIdscanner(this._ngZone);
  }
}
