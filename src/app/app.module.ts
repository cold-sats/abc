import { AppComponent } from 'src/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';

import { abcComponents, materialDesignComponents } from 'src/app/components';

import { pages } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ...abcComponents,
    ...pages
  ],
  imports: [
    ...materialDesignComponents,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    ...pages
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
