import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { HostListener } from '@angular/core';

import { DataProvider } from 'src/providers/data'
import { filters } from 'src/components/nav/filters'

@Component({
  selector: 'tao-nav',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./nav.scss'],
  templateUrl: './nav.html'
})

export class NavComponent implements OnInit {

  filters: any;
  test: boolean;
  form: UntypedFormGroup;
  previousScrollPosition: number;
  @Input() hideMenuButtons: string;
  @Input() showBackButton: boolean = false;
  @Input() title: string;
  currentPage: string;
  navLocation: string;
  selectedFilters: any;
  showExploreMenu: boolean;

  constructor(
    public data: DataProvider,
    private fb: UntypedFormBuilder,
    private location: Location,
    private responsive: BreakpointObserver,
    public router: Router
  ) {
    this.form = this.fb.group({
      search: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.selectedFilters = [];
    this.filters = filters;
    this.test = true;
    this.data.view = 'tiles-2';
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
    window.scrollTo(0, 0);
  }

  goBack() {
    this.location.back()
  }

  toggleView() {
    if (this.data.view == 'tiles-1') {
      this.data.view = 'tiles-2';
    } else if (this.data.view == 'tiles-2') {
      this.data.view = 'tiles-3';
    } else if (this.data.view == 'tiles-3') {
      this.data.view = 'tiles-1';
    }
  }

  toggleFilter() {
    this.data.showFilterMenu = !this.data.showFilterMenu;
  }

  selectCheckbox(filter, name) {
    const upperCaseName = name.toUpperCase();
    const selection = {
      filter: filter,
      name: upperCaseName
    }
    //todo figure out why it's not removing unselected items
    const index = this.selectedFilters.findIndex(filter =>
      filter.filter === selection.filter && filter.name === selection.name
    );
    if (index !== -1) {
      this.selectedFilters.splice(index, 1);
    } else {
      this.selectedFilters.push(selection);
    }
    if (this.selectedFilters.length) {
      this.data.filterImages(this.selectedFilters);
    } else {
      this.data.shownImages = this.data.allImages;
    }
  }

  getFilterIcon() {
    console.log(this.data.view)
    return 'assets/images/' + this.data.view + '.svg';
  }

  toggleFilterRow(index) {
    console.log(this.filters)
    console.log(index)
    this.filters[index]['showExpandedFilter'] = !this.filters[index]['showExpandedFilter']
  }

  df(test) {
    console.log(test)
  }

  openExploreMenu() {
    console.log('test')
  }

  toggleShowExploreMenu() {
    this.showExploreMenu = !this.showExploreMenu;
  }

}
