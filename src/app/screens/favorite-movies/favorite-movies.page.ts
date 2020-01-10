import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films/films.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.page.html',
  styleUrls: ['./favorite-movies.page.scss'],
})
export class FavoriteMoviesPage implements OnInit {

  public vm : {
    filmsService?: FilmsService
  } = {};
  constructor(
    private filmsService: FilmsService
  ) {
    this.vm.filmsService = this.filmsService; 
   }

  ngOnInit() {
    this.getFavoritesList()
  }

  async getFavoritesList() {
    let obsFimls:any = await this.vm.filmsService.getMyFavoritesMovies();
    if(obsFimls.subscribe) {
      obsFimls.subscribe(
        (res:any) => {
          res.results.forEach(movie => {
            this.vm.filmsService.favoriteList.push(movie)
          });
        }
      )
    }
  }
}
