import { Injectable } from '@angular/core';
import { Paint } from '../models/Paint.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PaintsService {

  paints: Paint[] = [];
  paintsSubject = new Subject<Paint[]>();

  constructor() { }

  emitPaints() {
    this.paintsSubject.next(this.paints);
  }

  savePaints() {
    firebase.database().ref('/paints').set(this.paints);
  }

  getPaints() {
    firebase.database().ref('/paints')
            .on('value', (data) => {
              this.paints = data.val() ? data.val() : [];
              this.emitPaints();
            });
  }

  getSinglePaint(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/paints/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewPaint(newPaint: Paint) {
    this.paints.push(newPaint);
    this.savePaints();
    this.emitPaints();
  }

  removePaint(paint: Paint) {
    if(paint.photo){
      const storageRef = firebase.storage().refFromURL(paint.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée !');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé: ' + error);
        }
      );
    }
    const paintIndexToRemove = this.paints.findIndex(
      (paintEl) => {
        if(paintEl === paint) {
          return true;
        }
      }
    );
    this.paints.splice(paintIndexToRemove, 1);
    this.savePaints();
    this.emitPaints();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de chargement: '+error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
            console.log('resolved');
          }
        );
      }
    );
  }
}
