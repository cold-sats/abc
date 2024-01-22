import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataProvider } from 'src/providers/data'

@Component({
  templateUrl: './origin.html'
})

export class OriginPage implements OnInit {

  constructor(
    public data: DataProvider,
    private router: Router
  ) {}

  async ngOnInit() {
  }

}
