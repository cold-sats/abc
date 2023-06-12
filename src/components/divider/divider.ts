import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'abc-divider',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./divider.scss'],
  template: `
  <div class="divider"></div>
  `
})

export class DividerComponent {}
