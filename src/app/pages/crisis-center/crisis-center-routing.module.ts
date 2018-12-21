import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { PageNotFoundComponent } from '../errors/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: CrisisListComponent,
    canActivate: [],
    children: [
      {
        path: '',
        canActivateChild: [],
        children: [
          { path: 'crisis-center', component: CrisisListComponent },
          { path: '', component: CrisisListComponent },
          { path: '**', component: PageNotFoundComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrisisCenterRoutingModule { }
