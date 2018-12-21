import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../models/hero';
import { Injectable } from '@angular/core';

declare const require: any;
const faker = require('faker');

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: faker.name.findName() },
      { id: 12, name: faker.name.findName() },
      { id: 13, name: faker.name.findName() },
      { id: 14, name: faker.name.findName() },
      { id: 15, name: faker.name.findName() },
      { id: 16, name: faker.name.findName() },
      { id: 17, name: faker.name.findName() },
      { id: 18, name: faker.name.findName() },
      { id: 19, name: faker.name.findName() },
      { id: 20, name: faker.name.findName() },
    ];

    const nobodies: any[] = [ ];

    // entities with string ids that look like numbers
    const stringers = [
      { id: '10', name: 'Bob String'},
      { id: '20', name: 'Jill String'}
    ];

    const db = { heroes, nobodies, stringers };

    return db;
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? 
      Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }

}