import { Component, OnInit } from '@angular/core';
import { Paint } from 'src/app/models/Paint.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PaintsService } from 'src/app/services/paints.service';

@Component({
  selector: 'app-single-paint',
  templateUrl: './single-paint.component.html',
  styleUrls: ['./single-paint.component.scss']
})
export class SinglePaintComponent implements OnInit {

  paint: Paint;

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
}
