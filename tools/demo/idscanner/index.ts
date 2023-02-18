import { DemoSharedBase } from '../utils';
import { Idscanner } from '@tzkit/idscanner';

export class DemoSharedIdscanner extends DemoSharedBase {
  scanner = new Idscanner();
  testIt() {
    this.scanner.start();
  }
}
