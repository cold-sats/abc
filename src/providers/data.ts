import { Injectable } from '@angular/core';

import { data } from 'src/data/data'

@Injectable()
export class DataProvider {

  shownImages: any[];
  allImages: any[];
  isSearching: boolean;

  constructor() {}

  async parseData() {
    this.allImages = [];
    Object.keys(data).forEach((key) => {
      this.allImages.push({
        ...data[key]
      });
    });
    this.shownImages = this.allImages;
    console.log(this.shownImages[190])
  }

  async searchForImage(search) {
    console.log(search)
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
            console.log('YEP')
            this.shownImages.push(image);
          }
        }
      });
    });
    console.log(this.shownImages)
    this.isSearching = false;
  }

}
