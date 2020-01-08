import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage
  ) { }

  async setItem(key: string, values:any) {
    return await this.storage.set(key, values)
  }
  
  async getItem(key: string) {
    return await this.storage.get(key)
  }

}
