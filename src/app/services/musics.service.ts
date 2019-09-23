import { Injectable } from '@angular/core';
import { Music } from '../models/Music.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MusicsService {

  musics: Music[] = [];
  musicsSubject = new Subject<Music[]>();

  constructor() { }

  emitMusics() {
    this.musicsSubject.next(this.musics);
  }

  saveMusics() {
    firebase.database().ref('/musics').set(this.musics);
  }

  getMusics() {
    firebase.database().ref('/musics')
            .on('value', (data) => {
              this.musics = data.val() ? data.val() : [];
              this.emitMusics();
            });
  }

  getSingleMusic(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/musics/' + id).once('value').then(
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

  createNewMusic(newMusic: Music) {
    this.musics.push(newMusic);
    this.saveMusics();
    this.emitMusics();
  }

  removeMusic(music: Music) {
    if(music.photo){
      const storageRef = firebase.storage().refFromURL(music.photo);
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
    const musicIndexToRemove = this.musics.findIndex(
      (musicEl) => {
        if(musicEl === music) {
          return true;
        }
      }
    );
    this.musics.splice(musicIndexToRemove, 1);
    this.saveMusics();
    this.emitMusics();
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
