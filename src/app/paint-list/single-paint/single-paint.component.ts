import { Component, OnInit } from '@angular/core';
import { Paint } from 'src/app/models/Paint.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PaintsService } from 'src/app/services/paints.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-single-paint',
  templateUrl: './single-paint.component.html',
  styleUrls: ['./single-paint.component.scss']
})
export class SinglePaintComponent implements OnInit {

  paint: Paint;

  modified = false;
  maxChar = 400;

  constructor(private route: ActivatedRoute,
              private paintsService: PaintsService,
              private router: Router) { }

  ngOnInit() {
    this.paint = new Paint('','','','');
    const id = this.route.snapshot.params['id'];
    this.paintsService.getSinglePaint(+id).then(
      (paint: Paint) => {
        this.paint = paint;
      }
    );
  }

  onBack() {
    this.router.navigate(['/paints']);
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
    if(!this.paint.resume){
      this.paint.resume = " ";
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
      firebase.database().ref('paints').update(updates);
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
