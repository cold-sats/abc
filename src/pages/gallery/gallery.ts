import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataProvider } from 'src/providers/data'

@Component({
  templateUrl: './gallery.html'
})

export class GalleryPage implements OnInit {

  constructor(
    public data: DataProvider,
    private router: Router
  ) {}

  async ngOnInit() {
    this.data.parseData();
    this.data.shownImages = this.data.allImages;
  }

}
