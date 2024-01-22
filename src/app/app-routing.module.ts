import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ABCVenturesPage } from 'src/pages/abc-ventures/abc-ventures';
import { GalleryPage } from 'src/pages/gallery/gallery';
import { HomePage } from 'src/pages/home/home';
import { IdealsPage } from 'src/pages/ideals/ideals';
import { OriginPage } from 'src/pages/origin/origin';

export const pages = [
  ABCVenturesPage,
  GalleryPage,
  HomePage,
  IdealsPage,
  OriginPage
];

const routes: Routes = [
  { path: 'abc-ventures', component: ABCVenturesPage },
  { path: 'gallery', component: GalleryPage },
  { path: '', component: HomePage },
  { path: 'ideals', component: IdealsPage },
  { path: 'origin', component: OriginPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
