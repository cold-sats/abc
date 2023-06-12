import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPage } from 'src/pages/dashboard/dashboard';

export const pages = [
  DashboardPage
];

const routes: Routes = [
  { path: '', component: DashboardPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
