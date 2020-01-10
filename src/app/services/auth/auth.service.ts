import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import { storageKeys } from './../../shared/constants';
import Account from 'src/app/models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _requestToken: String;
  private _rtoken_expire_at: String;
  private _isValidRequestToken: Boolean;
  private _dateToken: String;
  private _sessionId: String;
  private _account: Account

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private iab: InAppBrowser ) { 

  }

  generateRequestToken() {
    return this.httpService.get('/3/authentication/token/new')
    .subscribe( (res:any) => {
      if (res.success) {
        this.requestToken = res.request_token;
        this.rtoken_expire_at = res.expires_at;
        this.validateRequestToken()
      }
    }, (err) => {
      console.log('err',err);
    })
  }

  createSessionId() {
    return this.httpService.post('/3/authentication/session/new',{request_token: this.requestToken})
  }

  getAccount() {
    this.httpService.get('/3/account', {session_id: this.sessionId})
    .subscribe( (res:Account) => {
      this.account = res;
    })
  }

  validateRequestToken() {
    const browser = this.iab.create(`${environment.API_URL_AUTH}/authenticate/${this.requestToken}`);
    browser.on('loadstart').subscribe(event => {
      console.log('loadstart iab', event)
      if(event.url == `${environment.API_URL_AUTH}/authenticate/${this.requestToken}/allow`) {
        console.log('allow', event)
        this.isValidRequestToken = true;
        this.createSessionId().subscribe( (res:any) => {
          if (res.success) {
            this.sessionId = res.session_id;
            this.getAccount();
          }
        })
      }
    });
    browser.on('loadstop').subscribe(event => {
      console.log('loadstop',event)
    });
    browser.on('loaderror').subscribe(event => {
      console.log('loaderror',event)
    });
    browser.on('exit').subscribe(event => {
      console.log('exit',event)
    });
    browser.on('beforeload').subscribe(event => {
      console.log('exit',event)
    });
    browser.on('message').subscribe(event => {
      console.log('message',event)
    });
  }
  
  set requestToken(token: String) {
    this.storageService.setItem(storageKeys.reqToken, token);
    this.storageService.setItem(storageKeys.dateToken, new Date().toString());
    this.dateToken = new Date().toString();
    this._requestToken = token;
  }

  get requestToken() : String {
    return this._requestToken
  }

  set rtoken_expire_at(exp_at: String) {
    this.storageService.setItem(storageKeys.reqTokenExpiration, exp_at);
    this._rtoken_expire_at = exp_at;
  }

  get rtoken_expire_at() : String {
    return this._rtoken_expire_at
  }

  set isValidRequestToken(valid: Boolean) {
    this.storageService.setItem(storageKeys.isValidReqToken, true);
    this._isValidRequestToken = valid;
  }

  get isValidRequestToken() : Boolean {
    return this._isValidRequestToken;
  }

  get dateToken() {
    return this._dateToken;
  }
  
  set dateToken(date) {
    this._dateToken = date;
  }

  get sessionId() {
    return this._sessionId
  }

  set sessionId(id) {
    this.storageService.setItem(storageKeys.sessionId, id);
    this._sessionId = id;
  }

  get account() {
    return this._account;
  }

  set account(account) {
    this.storageService.setItem(storageKeys.account, account);
    this._account = account;
  }
}
