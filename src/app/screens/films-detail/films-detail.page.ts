import { Component, OnInit } from '@angular/core';
import Movie from 'src/app/models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from 'src/app/services/films/films.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-films-detail',
  templateUrl: './films-detail.page.html',
  styleUrls: ['./films-detail.page.scss'],
})
export class FilmsDetailPage implements OnInit {

  details: any = {}
  idMovie:String =  null;
  movieState: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private filmsService: FilmsService,
    private messagesService: MessagesService,
    public navCtrl: NavController,

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
      this.getMovieState();
    })
  }

  getMovieState() {
    if(this.filmsService.getMovieState(this.details.id).subscribe) {
      this.filmsService.getMovieState(this.details.id).subscribe( res => {
        console.log('state m',res);
        this.movieState = res;
      })
    }
  }


  markAsFavorite(favorite) {
    let body = {
      media_type: "movie",
      media_id: this.details.id,
      favorite: favorite
    }
    this.movieState.favorite = favorite
    this.filmsService.markAsFavorite(body).subscribe((res) => {
      if(this.movieState.favorite) {
        this.messagesService.presentToast('Agregado a favoritos')
      } else {
        this.messagesService.presentToast('Removido de favoritos')
      }
    })
  }

  addMyWatchList(watchlist) {
    let body = {
      media_type: "movie",
      media_id: this.details.id,
      watchlist: watchlist
    }
    this.movieState.watchlist = watchlist;
    this.filmsService.addMyWatchList(body).subscribe((res) => {
      if(this.movieState.watchlist) {
        this.messagesService.presentToast('Agregado a mi lista')
      } else {
        this.messagesService.presentToast('Removido de mi lista')
      }
    })
  }

  back() {
    this.navCtrl.back();
  }
}
