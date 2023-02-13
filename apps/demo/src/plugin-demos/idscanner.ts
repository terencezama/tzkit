import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedIdscanner } from '@demo/shared';
import {} from '@tzkit/idscanner';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedIdscanner {}
