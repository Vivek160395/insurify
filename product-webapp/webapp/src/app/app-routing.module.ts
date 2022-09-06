import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { AddInsurancePolicyComponent } from './add-insurance-policy/add-insurance-policy.component';

const routes: Routes = [
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: NavBarComponent,
    children: [
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'log', component: LoginComponent
      }
    ]
  },
  {
    path: 'add-policy', component: AddInsurancePolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
