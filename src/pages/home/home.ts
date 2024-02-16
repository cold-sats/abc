import { Component, HostListener, OnInit } from '@angular/core';
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth)
  }

}
