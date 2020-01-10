import { Component, OnInit, Input } from '@angular/core';
import Movie from 'src/app/models/movie.model';

@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss'],
})
export class FilmItemComponent implements OnInit {

  @Input('movie') movie: Movie;
  constructor() { }

  ngOnInit() {}

}
