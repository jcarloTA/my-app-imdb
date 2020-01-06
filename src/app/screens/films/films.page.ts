import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {

  props = {
    activeSearch: false
  }
  constructor() { }

  ngOnInit() {
  }

  setVisibleSearch() {
    this.props.activeSearch = !this.props.activeSearch;
  }

  ionCancelSearch() {
    this.setVisibleSearch()
  }
  
}
