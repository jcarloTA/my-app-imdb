import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { FilmsPageModule } from '../films/films.module';
import { FilmsDetailPage } from '../films-detail/films-detail.page';
import { FilmsDetailPageModule } from '../films-detail/films-detail.module';
import { FavoriteMoviesPageModule } from '../favorite-movies/favorite-movies.module';
import { WatchLaterPageModule } from '../watch-later/watch-later.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    FilmsPageModule,
    FilmsDetailPageModule,
    FavoriteMoviesPageModule,
    WatchLaterPageModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
