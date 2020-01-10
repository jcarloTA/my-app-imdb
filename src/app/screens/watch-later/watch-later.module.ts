import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchLaterPageRoutingModule } from './watch-later-routing.module';

import { WatchLaterPage } from './watch-later.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchLaterPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WatchLaterPage]
})
export class WatchLaterPageModule {}
