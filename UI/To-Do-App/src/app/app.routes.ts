import { Routes } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';
import { AuthenticatePageComponent } from './authenticate-page/authenticate-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ActivePageComponent } from './active-page/active-page.component';
import { CompletedPageComponent } from './completed-page/completed-page.component';

export const routes: Routes = [
    {
        path:''
        ,component:IndexPageComponent
    }
    ,{
        path:'signup'
        ,component:AuthenticatePageComponent
    }
    ,{
        path:'home'
        ,component:HomeComponent
        ,children:[
            {
                path:'',
                component:DashboardComponent
            }
            ,{
                path:'dashboard',
                component:DashboardComponent
            }
            ,{
                path:'active',
                component:ActivePageComponent
            }
            ,{
                path:'completed',
                component:CompletedPageComponent
            }
        ]
    }
];
