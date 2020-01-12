import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films/films.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {
  
  public vm : {
    filmsService?: FilmsService
  } = {};

  constructor( 
    private router: Router,
    private filmsService: FilmsService) {
    this.vm.filmsService = this.filmsService;  
  }

  ngOnInit() {
    this.vm.filmsService.page = 0;
    this.getMoviesList(null,true);
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
        if(scrollEvent && scrollEvent.target) {
          scrollEvent.target.complete();
        }
        if (refresh && refresh.target) {
          refresh.target.complete();
        }
      }
    ) 
  }

  setVisibleSearch() {
    console.log('nav')
    this.router.navigate(['/menu/films/search'])
  }

  doRefresh(eventRefresh) {
    this.vm.filmsService.page = 0;
    this.getMoviesList(null, true, eventRefresh);
  }
}
