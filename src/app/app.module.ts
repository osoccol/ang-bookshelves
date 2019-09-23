import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MusicListComponent } from './music-list/music-list.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { PaintListComponent } from './paint-list/paint-list.component';
import { MovieFormComponent } from './movie-list/movie-form/movie-form.component';
import { SingleMovieComponent } from './movie-list/single-movie/single-movie.component';
import { MusicFormComponent } from './music-list/music-form/music-form.component';
import { SingleMusicComponent } from './music-list/single-music/single-music.component';
import { PaintFormComponent } from './paint-list/paint-form/paint-form.component';
import { SinglePaintComponent } from './paint-list/single-paint/single-paint.component';
import { MusicsService } from './services/musics.service';
import { MoviesService } from './services/movies.service';
import { PaintsService } from './services/paints.service';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', canActivate: [AuthGuardService], component: BookListComponent },
  { path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent },
  { path: 'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent },
  { path: 'musics', canActivate: [AuthGuardService], component: MusicListComponent },
  { path: 'musics/new', canActivate: [AuthGuardService], component: MusicFormComponent },
  { path: 'musics/view/:id', canActivate: [AuthGuardService], component: SingleMusicComponent },
  { path: 'movies', canActivate: [AuthGuardService], component: MovieListComponent },
  { path: 'movies/new', canActivate: [AuthGuardService], component: MovieFormComponent },
  { path: 'movies/view/:id', canActivate: [AuthGuardService], component: SingleMovieComponent },
  { path: 'paints', canActivate: [AuthGuardService], component: PaintListComponent },
  { path: 'paints/new', canActivate: [AuthGuardService], component: PaintFormComponent },
  { path: 'paints/view/:id', canActivate: [AuthGuardService], component: SinglePaintComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' }
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent,
    MusicListComponent,
    MovieListComponent,
    PaintListComponent,
    MovieFormComponent,
    SingleMovieComponent,
    MusicFormComponent,
    SingleMusicComponent,
    PaintFormComponent,
    SinglePaintComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    BooksService,
    MusicsService,
    MoviesService,
    PaintsService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
