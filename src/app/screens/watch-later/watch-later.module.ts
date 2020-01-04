import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchLaterPageRoutingModule } from './watch-later-routing.module';

import { WatchLaterPage } from './watch-later.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchLaterPageRoutingModule
  ],
  declarations: [WatchLaterPage]
})
export class WatchLaterPageModule {}
