import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from "ngx-markdown";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatIconModule } from '@angular/material/icon';

import { RegisterComponent } from './register/register.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClientJsonpModule, HttpClientModule} from'@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddInsurancePolicyComponent } from './add-insurance-policy/add-insurance-policy.component';
import { PreviewMarkupComponent } from './preview-markup/preview-markup.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PoliciesComponent } from './policies/policies.component';
import { ClaimComponent } from './claim/claim.component';
import { LoginComponent } from './login/login.component';
import { MoreComponent } from './more/more.component';
import { RenewalPolicyComponent } from './renewal-policy/renewal-policy.component';
import { UpdateComponent } from './update/update.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DetailsComponent } from './details/details.component';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { RenewalPolicyHomeComponent } from './renewal-policy-home/renewal-policy-home.component';
import { ChatComponent } from './chat/chat.component';
import { ZoomonhoverDirective } from './zoomonhover.directive';
import { PurchaseInsuranceComponent } from './purchase-insurance/purchase-insurance.component';
import { EditInsuranceComponent } from './edit-insurance/edit-insurance.component';
import { InsuranceProviderComponent } from './insurance-provider/insurance-provider.component';


@NgModule({
  declarations: [
    AppComponent,
     RegisterComponent,
     CalculatorComponent,
    RecommendationComponent,
    PolicyDetailsComponent,
    NavBarComponent,
    AddInsurancePolicyComponent,
    PreviewMarkupComponent,
    PoliciesComponent,
    MoreComponent,
    UpdateComponent,
    ClaimComponent,
    LoginComponent,
    MoreComponent,
    RenewalPolicyComponent,
    InsuranceDetailsComponent,
    MoreComponent,
    DetailsComponent,
    RenewalPolicyHomeComponent,
    InsuranceDetailsComponent,
    // LoginComponent,
    MoreComponent,
    DetailsComponent,
    ChatComponent,
    ZoomonhoverDirective,
    PurchaseInsuranceComponent,
    EditInsuranceComponent,
    InsuranceProviderComponent
  ],
  entryComponents: [PreviewMarkupComponent],
  imports: [
    IvyCarouselModule,
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    MatRadioModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSidenavModule,
    MarkdownModule.forRoot(),
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class AppModule { }
