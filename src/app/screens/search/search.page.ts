import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, IonSearchbar } from '@ionic/angular';
import { FilmsService } from 'src/app/services/films/films.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, AfterViewInit {

  @ViewChild('ionSearch', {static:false}) ionSearch: IonSearchbar
  public vm : {
    filmsService?: FilmsService
    searchValue?: String
    isLoading?: Boolean
    isSearchTouched?: Boolean;
  } = {};
  constructor(
    private navCtrl: NavController,
    private filmsService: FilmsService
  ) {
    this.vm.filmsService = this.filmsService; 
    this.vm.searchValue = '';
    this.vm.isLoading = false;
    this.vm.isSearchTouched = false;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {

      this.ionSearch.setFocus().then((e) => console.log('set foucs', e))
    }, 500)
  }

  ionCancelSearch() {
    this.navCtrl.back();
  }

  searchFilms(event) {
    this.vm.isLoading = true;
    this.vm.isSearchTouched = true;
    if(this.vm.searchValue) {
      this.filmsService.searchMovies(this.vm.searchValue).subscribe( (res) => {
        this.vm.filmsService.searchMoviesList = res.results;
        this.vm.isLoading = false;
      },
      err => {
        this.vm.isLoading = false;
      })
    }
  }
}
