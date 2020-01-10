import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import Movie from 'src/app/models/movie.model';
import { StorageService } from '../storage/storage.service';
import { storageKeys, imagesConfig } from './../../shared/constants'
import { environment } from './../../../environments/environment'
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
    private storageService: StorageService
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

  async saveMoviesOnStorage(movies) {
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
