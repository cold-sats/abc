import { Injectable } from '@angular/core';

import { data } from 'src/data/data'

@Injectable()
export class DataProvider {

  shownImages: any[];
  allImages: any[];
  isSearching: boolean;
  view: any;
  showFilterMenu: boolean;

  constructor() {}

  async parseData() {
    this.allImages = [];
    Object.keys(data).forEach((key) => {
      this.allImages.push({
        ...data[key]
      });
    });
    this.allImages.sort
    this.allImages.sort((a, b) => a.howrare.rank > b.howrare.rank ? 1 : -1);
    this.shownImages = this.allImages;
    console.log(this.shownImages[190])
  }

  async searchForImage(search) {
    let chosenTrait = null;
    if (this.isSearching) {
      return;
    }
    if (search == '') {
      this.shownImages = this.allImages;
      return;
    }
    this.isSearching = true;
    this.shownImages = [];
    this.allImages.map((image) => {
      const abcNumber = image.howrare.name.slice(5);
      if (search == abcNumber) {
        this.shownImages.push(image);
      }
      if (search.includes(':')) {
        const array = search.split(':');
        search = array[1];
        chosenTrait = array[0];
      }
      image.howrare.attributes.map((attribute) => {
        if (!chosenTrait || chosenTrait.toUpperCase() == attribute.name.toUpperCase()) {
          if (search.toUpperCase() == attribute.value.toUpperCase()) {
            this.shownImages.push(image);
          }
        }
      });
    });
    this.isSearching = false;
  }

  async filterImages(items) {
    if (this.isSearching) {
      return;
    }
    if (items.length == 0) {
      this.shownImages = this.allImages;
      return;
    }
    this.isSearching = true;
    this.shownImages = [];
    this.allImages.map((image, index) => {
      let attributes = [];
      image.howrare.attributes.map((attribute) => {
        attributes.push(attribute.value.toUpperCase());
      });
      const imageHasAllAttributes = items.every((element) => attributes.includes(element));
      if (imageHasAllAttributes) {
        this.shownImages.push(image);
      }
      if (index == this.allImages.length - 1) {
        this.isSearching = false;
      }
    });
  }

}
