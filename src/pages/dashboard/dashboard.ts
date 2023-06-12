import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { data } from 'src/data/data'

@Component({
  templateUrl: './dashboard.html'
})

export class DashboardPage implements OnInit {

  loaded: boolean;
  selectedImage: any;
  images: any[];

  constructor(
    private router: Router,
  ) {}

  async ngOnInit() {
    this.loaded = false;
    this.selectedImage = data['2336'];
    this.images = [];
    Object.keys(data).forEach((key) => {
      this.images.push({
        ...data[key]
      });
    });
    console.log(this.images[15])
    console.log(this.selectedImage)
    console.log('1')
    try {
      this.loaded = true;
    } catch(err) {
      console.log(err)
    }
  }

}
