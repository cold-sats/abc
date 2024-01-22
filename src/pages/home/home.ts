import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { DataProvider } from 'src/providers/data'

@Component({
  templateUrl: './home.html'
})

export class HomePage implements OnInit {

  constructor(
    public data: DataProvider,
    private router: Router,
  ) {}

  async ngOnInit() {
  }

  goToPage(page) {
    this.router.navigate([page]);
    window.scrollTo(0, 0);
  }

  goToURL(url: string) {
    window.open(url, "_blank");
  }

}
