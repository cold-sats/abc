import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BackgroundColorService } from 'src/providers/background';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private backgroundColorService: BackgroundColorService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      let color = 'home-background';
      if (event.url === '/gallery') {
        color = 'gallery-background';
      }
      this.backgroundColorService.changeColor(color);
    });
  }

}
