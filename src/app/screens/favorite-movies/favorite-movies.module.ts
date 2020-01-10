import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteMoviesPageRoutingModule } from './favorite-movies-routing.module';

import { FavoriteMoviesPage } from './favorite-movies.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteMoviesPageRoutingModule,
    ComponentsModule

  ],
  declarations: [FavoriteMoviesPage]
})
export class FavoriteMoviesPageModule {}
