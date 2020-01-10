import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmsPage } from './films.page';

const routes: Routes = [
  {
    path: '',
    component: FilmsPage,
    children: [
      {
        path: 'detail/:id',
        loadChildren: './../films-detail/films-detail.module#FilmsDetailPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmsPageRoutingModule {}
