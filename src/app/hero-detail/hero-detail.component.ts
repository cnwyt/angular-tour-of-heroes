// Add the @Input() hero property
// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';

// import the Hero class
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor() { }

  @Input() heroDetail: Hero;

  ngOnInit() {
  }

}
