import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmsDetailPage } from './films-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FilmsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmsDetailPageRoutingModule {}
