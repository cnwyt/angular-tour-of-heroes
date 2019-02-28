import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { PageNotFoundComponent } from '../errors/page-not-found/page-not-found.component';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';

const routes: Routes = [
  {
    path: 'crisis-center',
    component: CrisisCenterComponent,
    canActivate: [],
    children: [
      {
        path: '',
        canActivateChild: [],
        children: [
          { path: 'crisis-center', component: CrisisListComponent },
          { path: '', component: PageNotFoundComponent },
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
