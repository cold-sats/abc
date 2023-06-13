import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { DataProvider } from 'src/providers/data'

@Component({
  selector: 'tao-nav',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./nav.scss'],
  templateUrl: './nav.html'
})

export class NavComponent implements OnInit {

  form: UntypedFormGroup;
  @Input() hideMenuButtons: string;
  @Input() showBackButton: boolean = false;
  @Input() title: string;
  currentPage: string;
  navLocation: string;

  constructor(
    public data: DataProvider,
    private fb: UntypedFormBuilder,
    private location: Location,
    private responsive: BreakpointObserver,
    private router: Router
  ) {
    this.form = this.fb.group({
      search: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.currentPage = this.router.routerState.snapshot.url;
    this.responsive.observe('(min-width: 650px)')
      .subscribe(result => {
        if (result.matches) {
          this.navLocation = 'top';
        } else {
          this.navLocation = 'bottom';
        }
      });
      this.form.valueChanges.pipe(
        debounceTime(300)
      ).subscribe(val => this.updateSearch());
  }

  updateSearch() {
    this.data.searchForImage(this.form.value.search);
  }

  goToPage(page) {
    this.router.navigate([page]);
  }

  goBack() {
    this.location.back()
  }

}
