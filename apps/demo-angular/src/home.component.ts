import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ItemEventData } from '@nativescript/core';
@Component({
  selector: 'demo-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  demos = [
    {
      name: 'idscanner',
    },
  ];

  constructor(private routerExtensions: RouterExtensions) {}

  onItemTap(args: ItemEventData) {
    // console.log(
    //   `Index: ${args.index}; View: ${args.view} ; Item: ${this.items[args.index]}`
    // )
    this.routerExtensions.navigate([this.demos[args.index]['name']]);
  }
}
