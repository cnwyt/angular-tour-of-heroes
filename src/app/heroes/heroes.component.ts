import { Component, OnInit } from '@angular/core';

// import the Hero class
import { Hero } from '../hero';

// Open the HeroesComponent class file and import the mock HEROES.
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // constructor() { }
  // Add a private heroService parameter of type HeroService to the constructor.
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  // Add a heroes property to the class that exposes these heroes for binding.
  // heroes = HEROES;
  heroes: Hero[];

  // // Create a function to retrieve the heroes from the service.
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }
  getHeroes(): void {
    this.heroService
        .getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  hero: Hero = {
      id: 112234,
      name: 'Windstorm'
  };

  selectedHero: Hero;

  onSelect(hero: Hero): void {
      this.selectedHero = hero;
  }
  // Add a new hero
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  // Delete a hero
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
