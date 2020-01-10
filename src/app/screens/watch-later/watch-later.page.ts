import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films/films.service';

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.page.html',
  styleUrls: ['./watch-later.page.scss'],
})
export class WatchLaterPage implements OnInit {

  public vm : {
    filmsService?: FilmsService
  } = {};
  constructor(
    private filmsService: FilmsService
  ) {
    this.vm.filmsService = this.filmsService; 
   }

  ngOnInit() {
    this.getWatcherList();
  }

  async getWatcherList() {
    let obsFimls:any = await this.vm.filmsService.getMyWatchlist();
    if(obsFimls.subscribe) {
      obsFimls.subscribe(
        (res:any) => {
          res.results.forEach(movie => {
            this.vm.filmsService.watcherList.push(movie)
          });
        }
      )
    }
  }
}
