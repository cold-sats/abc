import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataProvider } from 'src/providers/data'

@Component({
  templateUrl: './abc-ventures.html'
})

export class ABCVenturesPage implements OnInit {

  constructor(
    public data: DataProvider,
    private router: Router
  ) {}

  async ngOnInit() {
  }

}
