import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { PaintsService } from '../services/paints.service';
import { Paint } from '../models/Paint.model';

@Component({
  selector: 'app-paint-list',
  templateUrl: './paint-list.component.html',
  styleUrls: ['../list-style.scss']
})
export class PaintListComponent implements OnInit, OnDestroy {

  paints: Paint[];
  paintSubscription: Subscription;

  constructor(private paintService: PaintsService,
              private router: Router) { }

  ngOnInit() {
    this.paintSubscription = this.paintService.paintsSubject.subscribe(
      (paints: Paint[]) => {
        this.paints = paints;
      }
    );
    this.paintService.getPaints();
    this.paintService.emitPaints();
  }

  onNewPaint() {
    this.router.navigate(['/paints', 'new']);
  }

  onDeletePaint(music: Paint) {
    this.paintService.removePaint(music);
  }

  onViewPaint(id: number) {
    this.router.navigate(['/paints', 'view', id]);
  }

  ngOnDestroy() {
    this.paintSubscription.unsubscribe();
  }
}
