import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{path:"",component:RecommendationComponent},{path:"register",component:RegisterComponent},{path:"",component:PolicyDetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
