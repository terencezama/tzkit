import { DemoSharedBase } from '../utils';
import { Idscanner } from '@tzkit/idscanner';

export class DemoSharedIdscanner extends DemoSharedBase {
  testIt() {
    console.log('test idscanner!');
    let scanner = new Idscanner();
    scanner.start();
  }
}
