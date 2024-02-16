import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { DataProvider } from 'src/providers/data'

@Component({
  templateUrl: './gallery.html'
})

export class GalleryPage implements OnInit {

  layout: string;
  maxWidth: any;

  constructor(
    public data: DataProvider,
    private router: Router,
    private responsive: BreakpointObserver
  ) {
  }

  async ngOnInit() {
    this.data.view = 'tiles-3';
    await this.data.parseData();
    this.data.shownImages = this.data.allImages;
    console.log(this.data.shownImages)
    this.getMaxWidth();
    }

  @HostListener('window:resize')
  onWindowResize() {
    this.getMaxWidth();
  }

  getMaxWidth() {
    if (window.innerWidth < 710 && this.data.view == 'tiles-3' || this.data.view == 'tiles-4') {
      this.data.showRarity = false;
    }
    if (this.data.view == 'tiles-1') {
      this.maxWidth =  window.innerWidth / 2 - 18 + 'px';
    } else if (this.data.view == 'tiles-2') {
      this.maxWidth =  window.innerWidth / 3 + 'px';
    } else if (this.data.view == 'tiles-3') {
      this.maxWidth =  window.innerWidth / 6 - 12.5 + 'px';
    } else {
      this.maxWidth =  window.innerWidth / 12 - 11.2 + 'px';
    }
  }

}
