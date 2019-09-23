import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { MusicsService } from 'C:\\Users\\intercontrat3.HN\\Documents\\Angular\\bookshelves\\src\\app\\services\\musics.service'; // path had to be changed because of circular dependency
import { Music } from '../models/Music.model';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit, OnDestroy {

  musics: Music[];
  musicSubscription: Subscription;

  constructor(private musicService: MusicsService,
              private router: Router) { }

  ngOnInit() {
    this.musicSubscription = this.musicService.musicsSubject.subscribe(
      (musics: Music[]) => {
        this.musics = musics;
      }
    );
    this.musicService.getMusics();
    this.musicService.emitMusics();
  }

  onNewMusic() {
    this.router.navigate(['/musics', 'new']);
  }

  onDeleteMusic(music: Music) {
    this.musicService.removeMusic(music);
  }

  onViewMusic(id: number) {
    this.router.navigate(['/musics', 'view', id]);
  }

  ngOnDestroy() {
    this.musicSubscription.unsubscribe();
  }
}
