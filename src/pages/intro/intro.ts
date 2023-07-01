import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { DataProvider } from 'src/providers/data'

@Component({
  templateUrl: './intro.html',
  styleUrls: ['./intro.scss']
})

export class IntroPage implements OnInit {

  constructor(
    public data: DataProvider,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.data.parseData();
    console.log(this.data.shownImages[0])
  }

}
