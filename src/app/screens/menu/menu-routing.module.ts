import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { FilmsPage } from '../films/films.page';
import { FilmsDetailPage } from '../films-detail/films-detail.page';
import { FavoriteMoviesPage } from '../favorite-movies/favorite-movies.page';
import { WatchLaterPage } from '../watch-later/watch-later.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'films',
        component: FilmsPage
      },
      {
        path: 'detail/:id',
        component: FilmsDetailPage
      },
      {
        path: 'favorite-movies',
        component: FavoriteMoviesPage
      },
      {
        path: 'watch-later',
        component: WatchLaterPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/films',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
