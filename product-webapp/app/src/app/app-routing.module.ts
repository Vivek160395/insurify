import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { AddInsurancePolicyComponent } from './add-insurance-policy/add-insurance-policy.component';
import { ClaimComponent } from './claim/claim.component';
import { PoliciesComponent } from './policies/policies.component';
import { PreviewMarkupComponent } from './preview-markup/preview-markup.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';

import { LoginComponent } from './login/login.component';
import { RenewalPolicyComponent } from './renewal-policy/renewal-policy.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';
import { RenewalPolicyHomeComponent } from './renewal-policy-home/renewal-policy-home.component';
import { DetailsComponent } from './details/details.component';
import { ChatComponent } from './chat/chat.component';
import { PurchaseInsuranceComponent } from './purchase-insurance/purchase-insurance.component';
import { EditInsuranceComponent } from './edit-insurance/edit-insurance.component';
import { InsuranceProviderComponent } from './insurance-provider/insurance-provider.component';
import { RegisteredPoliciesComponent } from './registered-policies/registered-policies.component';
import { RegisteredPolicyBuyersComponent } from './registered-policy-buyers/registered-policy-buyers.component';
import { PolicyAdvisorUpdateComponent } from './policy-advisor-update/policy-advisor-update.component';
//import { PolicyAdvisorComponent } from './policy-advisor/policy-advisor.component';
import { PolicyAdvisorComponent } from './policy-advisor/policy-advisor.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginNavbarComponent } from './login-navbar/login-navbar.component';
import { AuthGuard } from './guard/auth.guard';
import { InsurerGuard } from './guard/insurer.guard';
// import { PersonGuard } from './guard/person.guard';


// const routes: Routes = [{path:"",component:RecommendationComponent},{path:"register",component:RegisterComponent},{path:"",component:PolicyDetailsComponent}];
// canActivate: [AuthGuard],
const routes: Routes =
  [
    { path: "", component: HomepageComponent },
    {
      path: "home", component: NavBarComponent,  children: [
        // { path: "", component: RecommendationComponent, canActivate: [PersonGuard] },
        // canActivate: [InsurerGuard]
        { path: "home-page", component: RecommendationComponent,  },
        { path: "insurance-provider", component: InsuranceProviderComponent },
        { path: "add-policy", component: AddInsurancePolicyComponent },
        { path: "policies", component: PoliciesComponent },
        { path: "renewal-update", component: RenewalPolicyComponent },
        { path: "renewal-home", component: RenewalPolicyHomeComponent },
        { path: "details", component: DetailsComponent },
        { path: "update", component: UpdateComponent },
        { path: "nav-bar", component: NavBarComponent },
        { path: "claim", component: ClaimComponent },
        { path: "buy", component: PurchaseInsuranceComponent },
        { path: "policyDetails", component: InsuranceDetailsComponent },
        { path: "claim", component: ClaimComponent },
        { path: "InsuranceDetails", component: InsuranceDetailsComponent },
        { path: "edit-insurance", component: EditInsuranceComponent },
        { path: "policy-advisor-update", component: PolicyAdvisorUpdateComponent },
        { path: "chat", component: ChatComponent },
        { path: "registeredPolicies", component: RegisteredPoliciesComponent },
        { path: "policyBuyers", component: RegisteredPolicyBuyersComponent },
        { path: "policy-advisor", component: PolicyAdvisorComponent }],

    },
    { path: "", component: HomepageComponent },
    {
      path: "nav", component: LoginNavbarComponent, children: [
        { path: "login", component: LoginComponent },
        { path: "register", component: RegisterComponent },
      ]
    }
    // { path: "login", component: LoginComponent }


  ];

@NgModule({
  // , { useHash: true }
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
