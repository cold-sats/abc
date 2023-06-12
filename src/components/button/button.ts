import { Component, Input, ViewEncapsulation, Renderer2, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'abc-button',
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
          *ngIf="!isLoading"
          class="text">
          {{text}}
        </span>
        <div
          *ngIf="isLoading"
          class="loader"
          [ngClass]="platformClass">
        </div>
      </button>
    </div>
  `
})

export class ButtonComponent {

  @Input() action = null;
  @Input() disabled = false;
  @Input() text: string;
  isLoading: boolean;
  platformClass: string;

  constructor(
    private el : ElementRef,
    private responsive: BreakpointObserver,
    private renderer : Renderer2
  ) {}

  ngOnInit() {
    this.responsive.observe('(min-width: 650px)')
      .subscribe(result => {
        if (result.matches) {
          this.platformClass = 'desktop-button';
        } else {
          this.platformClass = 'mobile-button';
        }
      });
  }

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
