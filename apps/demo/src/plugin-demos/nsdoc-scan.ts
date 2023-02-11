import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNsdocScan } from '@demo/shared';
import {} from '@tzkit/nsdoc-scan';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNsdocScan {}
