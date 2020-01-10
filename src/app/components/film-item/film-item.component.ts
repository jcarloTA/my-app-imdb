import { Component, OnInit, Input } from '@angular/core';
import Movie from 'src/app/models/movie.model';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss'],
})
export class FilmItemComponent implements OnInit {

  @Input('movie') movie: Movie;
  constructor(
    private router: Router,
    public navCtrl: NavController,
    ) { }

  ngOnInit() {}

  openDetail() {
    //this.router.navigate(['/films/details'])
    this.navCtrl.navigateForward('/films/details');

  }

}
