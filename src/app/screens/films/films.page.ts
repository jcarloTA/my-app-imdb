import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {

  props = {
    activeSearch: false
  }
  constructor( 
    private authService: AuthService) {

   }

  ngOnInit() {
    //this.authService.generateRequestToken()
  }

  setVisibleSearch() {
    this.props.activeSearch = !this.props.activeSearch;
  }

  ionCancelSearch() {
    this.setVisibleSearch()
  }
  
}
