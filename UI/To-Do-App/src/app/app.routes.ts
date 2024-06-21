import { Routes } from '@angular/router';
import { IndexPageComponent } from './Components/index-page/index-page.component';
import { AuthenticatePageComponent } from './Components/authenticate-page/authenticate-page.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';
import { ActivePageComponent } from './Components/active-page/active-page.component';
import { CompletedPageComponent } from './Components/completed-page/completed-page.component';
import { authGuard } from './Shared Scripts/Guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: IndexPageComponent,
  },
  {
    path: 'signup',
    component: AuthenticatePageComponent,
  },
  {
    path: 'login',
    component: AuthenticatePageComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/home/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'active',
        component: ActivePageComponent,
      },
      {
        path: 'completed',
        component: CompletedPageComponent,
      },
      {
        path: 'home/**',
        redirectTo: '/dashboard',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/home/dashboard',
  },
];
