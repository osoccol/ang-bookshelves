import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {

  movie: Movie;
  modified = false;
  maxChar = 400;

  constructor(private route: ActivatedRoute,
              private moviesService: MoviesService,
              private router: Router) { }

  ngOnInit() {
    this.movie = new Movie('','','');
    const id = this.route.snapshot.params['id'];
    this.moviesService.getSingleMovie(+id).then(
      (movie: Movie) => {
        this.movie = movie;
      }
    );
  }

  onBack() {
    this.router.navigate(['/movies']);
  }

  onDisplayButton(bool: boolean) {
    if(document.getElementById("editButton")){
      if(bool){
        document.getElementById("editButton").style.display = "inline";
      } else {
        document.getElementById("editButton").style.display = "none";
      }
    }
  }
  
  onResumeEdit(event) {
    const actualResume = event.path[2].firstChild.value;
    event.path[2].title = actualResume;
    console.log("Editing...");   
    if(!this.movie.resume){
      this.movie.resume = " ";
    }
    this.modified = true;
  }

  onSaveEdit(event) {
    const newResume = event.path[2].firstChild.value;
    if(newResume.length > this.maxChar) {
      alert("La longueur du texte ne peut dépasser "+ this.maxChar +" caractères.");
    } else {
      console.log("Saving new resume...");
      const id = this.route.snapshot.params['id'];
      event.path[2].title = newResume;

      let updates = {};
      updates[id + '/resume'] = newResume;
      firebase.database().ref('movies').update(updates);
      this.modified = false;
    }
  }

  onCancel(event) {  
    console.log("Editing canceled");
    const oldResume = event.path[2].title;
    event.path[2].firstChild.value = oldResume;
    this.modified = false;
  }
}
