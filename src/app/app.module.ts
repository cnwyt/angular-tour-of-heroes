import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// It worked because the Angular CLI declared HeroesComponent in the AppModule 
// when it generated that component.
import { HeroesComponent } from './pages/heroes/heroes.component';

// import the FormsModule symbol from the @angular/forms library
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule }    from '@angular/common/http';

// Simulate a data server
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';
import { HeroSearchComponent } from './pages/hero-search/hero-search.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { environment } from '../environments/environment';
import { PageNotFoundComponent } from './pages/errors/page-not-found/page-not-found.component';
import { RequestCache, RequestCacheWithMap } from './services/request-cache.service';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  // The HeroesComponent is declared in the @NgModule.declarations array.
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroSearchComponent,
    MessagesComponent,
    PageNotFoundComponent
  ],
  // Then add FormsModule to the @NgModule metadata's imports array, 
  // which contains a list of external modules that the app needs.
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { 
        dataEncapsulation: false,
        delay: 500 
      })
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
