import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { AddInsurancePolicyComponent } from './add-insurance-policy/add-insurance-policy.component';
import { ClaimComponent } from './claim/claim.component';
import { PoliciesComponent } from './policies/policies.component';
// import { PreviewMarkupComponent } from './preview-markup/preview-markup.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { RenewalPolicyComponent } from './renewal-policy/renewal-policy.component';
=======
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';
>>>>>>> c3b8e78aa06e91d875393a12636a236c0550b543

// const routes: Routes = [{path:"",component:RecommendationComponent},{path:"register",component:RegisterComponent},{path:"",component:PolicyDetailsComponent}];

const routes: Routes = [
  {path:"",component:RecommendationComponent},
  {path:"register",component:RegisterComponent},
  {path:"add-policy",component:AddInsurancePolicyComponent},
  {path:"policies", component:PoliciesComponent},
<<<<<<< HEAD
  {path: "login", component: LoginComponent},
  {path: "renewal", component: RenewalPolicyComponent}
=======
  {path:"update", component:UpdateComponent},
  {path: "login", component: LoginComponent},
  {path: "nav-bar", component: NavBarComponent},
  {path:"claim",component:ClaimComponent},
  {path: "login", component: LoginComponent},
  {path:"policyDetails",component:InsuranceDetailsComponent}
>>>>>>> c3b8e78aa06e91d875393a12636a236c0550b543
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
