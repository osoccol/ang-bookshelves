import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Paint } from 'src/app/models/Paint.model';
import { Router } from '@angular/router';
import { PaintsService } from 'src/app/services/paints.service';

@Component({
  selector: 'app-paint-form',
  templateUrl: './paint-form.component.html',
  styleUrls: ['./paint-form.component.scss']
})
export class PaintFormComponent implements OnInit {

  paintForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private paintsService: PaintsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.paintForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      releaseDate: ['', Validators.required],
      photo: ['', Validators.required]
    });
  }

  onSavePaint() {
    const title = this.paintForm.get('title').value;
    const artist = this.paintForm.get('artist').value;
    const releaseDate = this.paintForm.get('releaseDate').value;
    const photo = this.paintForm.get('photo').value;
    const newPaint = new Paint(title, artist, photo, releaseDate);
    if(this.fileUrl && this.fileUrl !== '') {
      newPaint.photo = this.fileUrl;
    }
    this.paintsService.createNewPaint(newPaint);
    this.router.navigate(['/paints']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.paintsService.uploadFile(file).then(
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
