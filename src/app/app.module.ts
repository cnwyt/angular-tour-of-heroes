import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// It worked because the Angular CLI declared HeroesComponent in the AppModule 
// when it generated that component.
import { HeroesComponent } from './heroes/heroes.component';

// import the FormsModule symbol from the @angular/forms library
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component'; // <-- NgModel lives here

@NgModule({
  // The HeroesComponent is declared in the @NgModule.declarations array.
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent
  ],
  // Then add FormsModule to the @NgModule metadata's imports array, 
  // which contains a list of external modules that the app needs.
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
