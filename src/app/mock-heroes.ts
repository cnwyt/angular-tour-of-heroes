// Eventually you'll get them from a remote data server. 
// For now, you'll create some mock heroes and pretend they came from the server.

// Create a file called mock-heroes.ts in the src/app/ folder. 
// Define a HEROES constant as an array of ten heroes and export it. 
// The file should look like this.

import { Hero } from './hero';

export const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];