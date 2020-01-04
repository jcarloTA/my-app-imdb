import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmItemComponent } from './film-item/film-item.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    FilmItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FilmItemComponent,
  ]
})
export class ComponentsModule { }
