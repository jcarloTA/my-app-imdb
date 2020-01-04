import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilmsDetailPageRoutingModule } from './films-detail-routing.module';

import { FilmsDetailPage } from './films-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilmsDetailPageRoutingModule
  ],
  declarations: [FilmsDetailPage]
})
export class FilmsDetailPageModule {}
