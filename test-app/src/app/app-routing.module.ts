import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardGuard } from './route-guard.guard';
import { AppComponent } from './app.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [RouteGuardGuard],
    data: { text: 'home', roles: ['staff'] },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RouteGuardGuard],
    data: { text: 'home', roles: ['staff'] },
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
