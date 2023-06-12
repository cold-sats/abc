import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'abc-row',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./row.scss'],
  template: `
    <ng-content></ng-content>
    `
})

export class RowComponent {

}
