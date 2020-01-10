import { Component, OnInit } from '@angular/core';
import Movie from 'src/app/models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from 'src/app/services/films/films.service';

@Component({
  selector: 'app-films-detail',
  templateUrl: './films-detail.page.html',
  styleUrls: ['./films-detail.page.scss'],
})
export class FilmsDetailPage implements OnInit {

  details: any = {}
  idMovie:String =  null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private filmsService: FilmsService
  ) {


  }

  ngOnInit() {
    this.idMovie = this.activatedRoute.snapshot.paramMap.get('id');
    this.getDetailsMovie();
  }

  getDetailsMovie() {
    this.filmsService.getMovieById(this.idMovie).subscribe( res => {
      console.log('detail',res);
      this.details = res;
    })
  }
}
