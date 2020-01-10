import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { storageKeys } from './shared/constants'
import { StorageService } from './services/storage/storage.service';

import { environment } from './../environments/environment'
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Peliculas',
      url: '/films',
      icon: 'film'
    },
    {
      title: 'Peliculas Favoritas',
      url: '/favorite-movies',
      icon: 'heart'
    },
    {
      title: 'Ver despues',
      url: '/watch-later',
      icon: 'play'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.initializateTokens();
    });
  }

  async initializateTokens() {
    let reqToken = await this.storageService.getItem(storageKeys.reqToken);
    let reqTokenExpiration = await this.storageService.getItem(storageKeys.reqTokenExpiration);
    let dateToken = await this.storageService.getItem(storageKeys.dateToken);
    let isValidReqToken = await this.storageService.getItem(storageKeys.isValidReqToken);
    let account = await this.storageService.getItem(storageKeys.account);
    let sessionId = await this.storageService.getItem(storageKeys.sessionId);
    
    console.log('sessionId',sessionId);
    console.log('account',account);
    console.log('reqToken',reqToken);
    if (sessionId ) {
        this.authService.requestToken = reqToken;
        this.authService.rtoken_expire_at = reqTokenExpiration;
        this.authService.dateToken = dateToken;
        this.authService.isValidRequestToken = isValidReqToken;
        this.authService.account = account;
        this.authService.sessionId = sessionId;
    }

    // if(isValidReqToken) {
    //   let difference = new Date().getTime() - new Date(dateToken).getTime();
    //   let differenceInMinutes = Math.round(difference / 60000);
    //   if(isValidReqToken && differenceInMinutes >= environment.TOKEN_DURATION) {
    //     this.authService.requestToken = reqToken;
    //     this.authService.rtoken_expire_at = reqTokenExpiration;
    //     this.authService.dateToken = dateToken;
    //     this.authService.isValidRequestToken = isValidReqToken;
    //   }
    // }
    
  }
}
