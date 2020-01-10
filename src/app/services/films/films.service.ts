import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import Movie from 'src/app/models/movie.model';
import { StorageService } from '../storage/storage.service';
import { storageKeys, imagesConfig } from './../../shared/constants'
import { environment } from './../../../environments/environment'
import { AuthService } from '../auth/auth.service';
interface responseData {
  page: Number,
  total_results: Number;
  total_pages: Number;
  results: Array<Movie>
}

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private _moviesList: Array<Movie>;
  public page: number;
  public total_results: number;
  public total_pages: number;

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private authService: AuthService
  ) { 
    this.page = 0;
    this.moviesList = [];
  }

  async getMoviesList(isInitial?) {
    if(isInitial) {
      let storageMovies = await this.storageService.getItem(storageKeys.moviesList);
      if(storageMovies && storageMovies.movies.length > 0 ) {
        this.page = storageMovies.page;
        this.moviesList = storageMovies.movies;
        this.total_pages = storageMovies.total_pages;
        return 'full-data'
      } 
    }

    return this.httpService.get('/3/movie/popular',{page: ++this.page,language: environment.LANGUAGE})
    .pipe(
      map( this.mapMovies ),
      retry(1),
      catchError(this.handleError)
    )
  }

  getMovieById(id) {
    return this.httpService.get(`/3/movie/${id}`,{language: environment.LANGUAGE})
    .pipe(
      map(this.mapMovie),
      retry(1),
      catchError(this.handleError)
    )
  }

  markAsFavorite(body) {
    return this.httpService.post(`/3/account/${this.authService.account.id}/favorite`,body, {session_id: this.authService.sessionId});
  }
  addMyWatchList(body){
    return this.httpService.post(`/3/account/${this.authService.account.id}/watchlist`,body, {session_id: this.authService.sessionId});
  }
  getMovieState(movieId) :any {
    if(!this.authService.account) {
      return this.authService.generateRequestToken()
    }
    return this.httpService.get(`/3/movie/${movieId}/account_states`, {session_id:  this.authService.sessionId });
  }

  getMyFavoritesMovies() {
    if(!this.authService.account) {
      return this.authService.generateRequestToken()
    }
    return this.httpService.get(`account/${this.authService.account.id}/watchlist/movies`, {session_id: this.authService.sessionId, language: environment.LANGUAGE})
  }

  getMyWatchlist() {
    if(!this.authService.account) {
      return this.authService.generateRequestToken()
    }
    return this.httpService.get(`account/${this.authService.account.id}/favorite/movies`, {session_id: this.authService.sessionId, language: environment.LANGUAGE})
  }

  get moviesList() {
    return this._moviesList;
  }
  set moviesList(movies:Array<Movie>) {
    this._moviesList = movies;
  }

  mapMovie(movie) {
    let domainUrl = `${environment.API_URL_IMAGES}/t/p/`;
    movie.backdrop_path = `${domainUrl}${imagesConfig.backdrop_path.normal}${movie.backdrop_path}`;
    movie.poster_path = `${domainUrl}${imagesConfig.poster_path.normal}${movie.poster_path}`;
    return movie;
  }

  mapMovies(movies) {
    let domainUrl = `${environment.API_URL_IMAGES}/t/p/`;
    movies.results = movies.results.map((movie:Movie) => {
      if (movie.poster_path) {
        movie.poster_path = `${domainUrl}/${imagesConfig.poster_path.normal}/${movie.poster_path}`
      }
      return movie;
    })
    return movies
  }

  async saveMoviesOnStorage() {
    return this.storageService.setItem(storageKeys.moviesList, {
      page: this.page,
      movies: this.moviesList,
      total_pages: this.moviesList
    });
  }


   // Error handling 
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
