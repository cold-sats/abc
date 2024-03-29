import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataProvider {

  shownImages: any[];
  page: string;
  allImages: any[];
  isSearching: boolean;
  view: any;
  rawData: any;
  showFilterMenu: boolean;
  showRarity: boolean = true;

  constructor(
    private http: HttpClient
  ) {}

  async parseData() {
    this.allImages = [];
    await this.loadDataJSON();
    console.log(this.rawData);
    Object.keys(this.rawData).forEach((key) => {
      this.allImages.push({
        ...this.rawData[key]
      });
    });
    this.allImages = this.allImages.filter((item) => item?.ordinal)
    this.allImages.sort((a, b) => a.howrare.rank > b.howrare.rank ? 1 : -1);
    this.shownImages = [];
  }

  async loadDataJSON() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/abc-image-data.json').subscribe(data => {
        this.rawData = data;
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
  async searchForImage(search) {
    let chosenTrait = null;
    if (this.isSearching) {
      return;
    }
    if (search == '') {
      this.shownImages = [];
      window.scrollTo(0, 0);
      return;
    }
    this.isSearching = true;
    this.shownImages = [];
    let abcNumbers = new Set();
    this.allImages.map((image) => {
      const abcNumber = image.howrare.name.slice(5);
      if (search == abcNumber && !abcNumbers.has(abcNumber)) {
        this.shownImages.push(image);
        abcNumbers.add(abcNumber);
      }
      if (search.includes(':')) {
        const array = search.split(':');
        search = array[1];
        chosenTrait = array[0];
      }
      image.howrare.attributes.map((attribute) => {
        if (!chosenTrait || chosenTrait.toUpperCase() == attribute.name.toUpperCase()) {
          if (search.toUpperCase() == attribute.value.toUpperCase() && !abcNumbers.has(abcNumber)) {
            this.shownImages.push(image);
            abcNumbers.add(abcNumber);
          }
        }
      });
    });
    window.scrollTo(0, 0);
    this.isSearching = false;
  }

  async filterImages(items) {
    if (this.isSearching) {
      return;
    }
    this.isSearching = true;
    this.shownImages = [];
    this.allImages.map((image, index) => {
      let imageMatch = false;
      let keepMatching = true;
      image.howrare.attributes.map((attribute) => {
        items.map((item) => {
          if (item.filter.toUpperCase() == attribute.name.toUpperCase()) {
            if (item.name.toUpperCase() == attribute.value.toUpperCase() && keepMatching) {
              imageMatch = true;
            } else {
              imageMatch = false;
              keepMatching = false;
            }
          }
        });
      });
      if (imageMatch) {
        this.shownImages.push(image);
      }
      if (index == this.allImages.length - 1) {
        this.isSearching = false;
      }
    });
  }

  toggleRarity() {
    this.showRarity = !this.showRarity;
  }

}
