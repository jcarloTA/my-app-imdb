import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FilmsService } from 'src/app/services/films/films.service';
import Movie from 'src/app/models/movie.model';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {

  props = {
    activeSearch: false,
  }
  public vm : {
    filmsService?: FilmsService
  } = {};

  constructor( 
    private authService: AuthService,
    private filmsService: FilmsService) {
    this.vm.filmsService = this.filmsService;  
  }

  ngOnInit() {
    console.log('init films')
    this.getMoviesList(null,true);
    //this.authService.generateRequestToken()
  }

  async getMoviesList(scrollEvent,isInitial?, refresh?) {
    let obsFimls:any = await this.vm.filmsService.getMoviesList(isInitial);
    obsFimls.subscribe(
      (res:any) => {
        res.results.forEach(movie => {
          this.vm.filmsService.moviesList.push(movie)
        });
        this.vm.filmsService.page = res.page;
        this.vm.filmsService.total_pages = res.total_results;
        this.vm.filmsService.total_pages = res.total_pages;
        if(scrollEvent) {
          scrollEvent.target.complete();
        }
        if (refresh) {
          refresh.target.complete();
        }
      }
    ) 
  }

  setVisibleSearch() {
    this.props.activeSearch = !this.props.activeSearch;
  }

  ionCancelSearch() {
    this.setVisibleSearch()
  }
  doRefresh(eventRefresh) {
    this.vm.filmsService.page = 0;
    this.getMoviesList(null, true, eventRefresh);
  }
}
