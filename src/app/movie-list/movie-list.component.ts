import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/Movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {

  movies: Movie[];
  movieSubscription: Subscription;

  constructor(private movieService: MoviesService,
              private router: Router) { }

  ngOnInit() {
    this.movieSubscription = this.movieService.moviesSubject.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    );
    this.movieService.getMovies();
    this.movieService.emitMovies();
  }

  onNewMovie() {
    this.router.navigate(['/movies', 'new']);
  }

  onDeleteMovie(movie: Movie) {
    this.movieService.removeMovie(movie);
  }

  onViewMovie(id: number) {
    this.router.navigate(['/movies', 'view', id]);
  }

  ngOnDestroy() {
    this.movieSubscription.unsubscribe();
  }

}
