import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BackgroundColorService {

  private color = new BehaviorSubject<string>('gallery-background');
  currentColor = this.color.asObservable();

  changeColor(color: string) {
    console.log(color)
    this.color.next(color);
  }
}