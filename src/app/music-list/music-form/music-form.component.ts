import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MusicsService } from 'src/app/services/musics.service';
import { Router } from '@angular/router';
import { Music } from 'src/app/models/Music.model';

@Component({
  selector: 'app-music-form',
  templateUrl: './music-form.component.html',
  styleUrls: ['./music-form.component.scss']
})
export class MusicFormComponent implements OnInit {

  musicForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  releaseDate = this.table(1950, 2020);
  
  table(a: number, b: number){
    let array = [];
    for (let i = a; i <= b; i++) {
      array.push(i.toString());
    }
    return array;
  }

  constructor(private formBuilder: FormBuilder,
              private musicsService: MusicsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.musicForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      releaseDate: ['', Validators.required]
    });
  }

  onSaveMusic() {
    const title = this.musicForm.get('title').value;
    const artist = this.musicForm.get('artist').value;
    const releaseDate = this.musicForm.get('releaseDate').value;
    const newMusic = new Music(title, artist, releaseDate);
    if(this.fileUrl && this.fileUrl !== '') {
      newMusic.photo = this.fileUrl;
    }
    this.musicsService.createNewMusic(newMusic);
    this.router.navigate(['/musics']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.musicsService.uploadFile(file).then(
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
