import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent }      from './pages/heroes/heroes.component';
import { DashboardComponent }   from './pages/dashboard/dashboard.component';
import { HeroDetailComponent }  from './pages/hero-detail/hero-detail.component';
import { PageNotFoundComponent } from './pages/errors/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'crisis-center',
    loadChildren: './pages/crisis-center/crisis-center.module#CrisisCenterModule',
    // canLoad: []
  },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    // CommonModule
    // RouterModule.forRoot(routes)
    RouterModule.forRoot(
      routes, {
        enableTracing: true, // <-- debugging purposes only
        // preloadingStrategy: SelectivePreloadingStrategyService,
      }
    )
  ],
  // declarations: []
  exports: [
    RouterModule 
  ]
})
export class AppRoutingModule { }
