import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/Movie.model';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  maxChar = 400;
  releaseDate = this.table(1950, 2020);
  
  table(a: number, b: number){
    let array = [];
    for (let i = a; i <= b; i++) {
      array.push(i.toString());
    }
    return array;
  }

  constructor(private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      releaseDate: ['', Validators.required],
      resume: ['', Validators.maxLength(this.maxChar)]
    });
  }

  onSaveMovie() {
    const title = this.movieForm.get('title').value;
    const director = this.movieForm.get('director').value;
    const resume = this.movieForm.get('resume').value;
    const releaseDate = this.movieForm.get('releaseDate').value;

    const newMovie = new Movie(title, director, releaseDate);
    
    if(this.fileUrl && this.fileUrl !== '') {
      newMovie.photo = this.fileUrl;
    }
    if(resume){
      newMovie.resume = resume;
    }
    this.moviesService.createNewMovie(newMovie);
    this.router.navigate(['/movies']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.moviesService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    console.log("Evenement déclenché");
    this.onUploadFile(event.target.files[0]);
  }
}
