import { Partido } from './../home/modelo/Partido';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {
  partido: Partido = new Partido(new Date(), '', '', 0, 0, [], []);

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.partido = JSON.parse(params['partido']);
      console.log(this.partido);
    });
  }

  ngOnInit() {}
}
