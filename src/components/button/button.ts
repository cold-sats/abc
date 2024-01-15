import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tao-button',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./button.scss'],
  template: `
    <div class="wrapper">
      <button
        expand="block"
        mat-button
        [disabled]="disabled || isLoading"
        (click)="executeAction()">
        <span
          *ngIf="!isLoading && !showDownArrow"
          class="text">
          {{text}}
        </span>
        <div
          *ngIf="isLoading"
          class="loader">
        </div>
        <ng-container *ngIf="showDownArrow">
          <div
            class="text">
            {{text}}
          </div>
          <img src="assets/images/down-arrow-white.png" class="down-arrow">
        </ng-container>
      </button>
    </div>
  `
})

export class ButtonComponent {

  @Input() action = null;
  @Input() disabled = false;
  @Input() showDownArrow = false;
  @Input() text: string;

  isLoading: boolean;

  async executeAction() {
    if (this.isLoading || !this.action) {
      return;
    }
    try {
      this.isLoading = true;
      await this.action();
    } catch (error) {
      await this.showError(error);
    } finally {
      this.isLoading = false;
    }
  }

  showError(error) {
    //TODO
  }

}
