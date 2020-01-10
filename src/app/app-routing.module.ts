import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'films',
    pathMatch: 'full'
  },
  {
    path: 'films',
    children:[
      {
        path: '',
        loadChildren: './screens/films/films.module#FilmsPageModule'
      },
      {
        path: 'details/:id',
        loadChildren: './screens/films-detail/films-detail.module#FilmsDetailPageModule'
      }
    ]
  },
  {
    path: 'films-detail',
    loadChildren: () => import('./screens/films-detail/films-detail.module').then( m => m.FilmsDetailPageModule)
  },
  {
    path: 'favorite-movies',
    loadChildren: () => import('./screens/favorite-movies/favorite-movies.module').then( m => m.FavoriteMoviesPageModule)
  },
  {
    path: 'watch-later',
    loadChildren: () => import('./screens/watch-later/watch-later.module').then( m => m.WatchLaterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
