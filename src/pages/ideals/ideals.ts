import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataProvider } from 'src/providers/data'

@Component({
  templateUrl: './ideals.html'
})

export class IdealsPage implements OnInit {

  constructor(
    public data: DataProvider,
    private router: Router
  ) {}

  async ngOnInit() {
  }

}
