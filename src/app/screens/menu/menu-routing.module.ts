import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
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
            path: 'detail/:id',
            loadChildren: () =>  import('./../films-detail/films-detail.module').then( m => m.FilmsDetailPageModule)
          },
          {
            path: 'search',
            loadChildren: () => import('./../search/search.module').then( m => m.SearchPageModule)
          }
        ]
      },
      {
        path: 'favorite-movies',
        loadChildren: () =>  import('./../favorite-movies/favorite-movies.module').then( m => m.FavoriteMoviesPageModule)
      },
      {
        path: 'watch-later',
        loadChildren: () =>  import('./../watch-later/watch-later.module').then( m => m.WatchLaterPageModule)

      }
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
