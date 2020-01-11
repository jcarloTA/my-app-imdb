import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { FilmsPage } from '../films/films.page';
import { FilmsDetailPage } from '../films-detail/films-detail.page';
import { FavoriteMoviesPage } from '../favorite-movies/favorite-movies.page';
import { WatchLaterPage } from '../watch-later/watch-later.page';
const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'films',
        children: [
          {
            path: '',
            loadChildren: () =>  import('./../films/films.module').then( m => m.FilmsPageModule)
          },
          {
            path: ':id',
            loadChildren: () =>  import('./../films-detail/films-detail.module').then( m => m.FilmsDetailPageModule)
          }
        ]
      },
      // {
      //   path: 'favorite-movies',
      //   component: FavoriteMoviesPage
      // },
      // {
      //   path: 'watch-later',
      //   component: WatchLaterPage
      // }
    ]
  },
  {
    path: '',
    redirectTo: 'menu/films',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
