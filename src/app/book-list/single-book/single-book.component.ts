import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../models/Book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;
  modified = false;
  maxChar = 400;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.book = new Book('','');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

  onBack() {
    this.router.navigate(['/books']);
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
    if(!this.book.resume){
      this.book.resume = " ";
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
      firebase.database().ref('books').update(updates);
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
