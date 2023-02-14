import { DemoSharedBase } from '../utils';
import { Idscanner } from '@tzkit/idscanner';

export class DemoSharedIdscanner extends DemoSharedBase {
  scanner = new Idscanner();
  testIt() {
    console.log('test idscanner!');

    this.scanner.start();
  }
}
