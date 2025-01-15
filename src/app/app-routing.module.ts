import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login/login.component';
import { LandingViewComponent } from './landing-page/landing-page/landing-view/landing-view.component';
import { RegistrationComponent } from './register/register/registration/registration.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { LoanschemesComponent } from './user/loanschemes/loanschemes.component';
import { PaymentComponent } from './user/payment/payment.component';
import { QueriesComponent } from './user/queries/queries.component';
import { ApplyloanComponent } from './user/applyloan/applyloan.component';
import { AllappliedloanComponent } from './user/allappliedloan/allappliedloan.component';
import { UpdateprofileComponent } from './user/updateprofile/updateprofile.component';
import { ViewemiComponent } from './user/viewemi/viewemi.component';
import { LoanofficerdashboardComponent } from './loanofficer/loanofficerdashboard/loanofficerdashboard.component';
import { ViewloanrequestComponent } from './loanofficer/viewloanrequest/viewloanrequest.component';
import { PendingloanrequestComponent } from './loanofficer/pendingloanrequest/pendingloanrequest.component';
import { ProfileComponent } from './loanofficer/profile/profile.component';
import { WelcomePageComponent } from './landing-page/landing-page/welcome-page/welcome-page.component';
import { AdminViewComponent } from './admin/admin/admin-view/admin-view/admin-view.component';
import { AdminDashboardComponent } from './admin/admin/admin-dashboard/admin-dashboard/admin-dashboard.component';
import { AddLoanSchemeComponent } from './admin/admin/add-loan-scheme/add-loan-scheme/add-loan-scheme.component';
import { UpdateLoanSchemeComponent } from './admin/admin/admin-update-loanScheme/update-loan-scheme/update-loan-scheme.component';
import { ViewLoanSchemeComponent } from './admin/admin/admin-view-loanScheme/view-loan-scheme/view-loan-scheme.component';
import { ViewLoanofficerReportComponent } from './admin/admin/view-loanOfficer-report/view-loanofficer-report/view-loanofficer-report.component';
import { ViewNpaComponent } from './admin/admin/view-npa/view-npa/view-npa.component';
import { ViewCustomerComponent } from './admin/admin/view-customer/view-customer/view-customer.component';
import { AddLoanOfficerComponent } from './admin/admin/admin-loanOfficer/add-loan-officer/add-loan-officer.component';
import { ViewLoanOfficerComponent } from './admin/admin/admin-view-loanOfficer/view-loan-officer/view-loan-officer.component';
import { ViewLoanRequestComponent } from './admin/admin/view-loan-request/view-loan-request/view-loan-request.component';
import { ReplytoenquiryComponent } from './loanofficer/replytoenquiry/replytoenquiry.component';
import { ViewactiveloansComponent } from './user/viewactiveloans/viewactiveloans.component';
import { CalculatorComponent } from './user/calculator/calculator.component';
import { UserviewComponent } from './user/userview/userview.component';
import { LoanofficerviewComponent } from './loanofficer/loanofficerview/loanofficerview.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  {
    path: "",
    component: LandingViewComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegistrationComponent
      },
      {
        path: "calculator",
        component: CalculatorComponent
      },
      {
        path:"welcome-page",
        component:WelcomePageComponent

      }

    ]
  },
  {
    path:"admin",
    component:AdminViewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    
    children:[
      {
        path:"admindashboard",
        component:AdminDashboardComponent
        ,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path:"addloanscheme",
        component: AddLoanSchemeComponent
        ,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path:"updateloanscheme",
        component:UpdateLoanSchemeComponent
        ,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path:"viewloanscheme",
        component: ViewLoanSchemeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path:"report",
        component:ViewLoanofficerReportComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },

      },{
        path:"npa",
        component:ViewNpaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },{
        path:"customers",
        component:ViewCustomerComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path:"addloanofficer",
        component:AddLoanOfficerComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path:"manageloanofficer",
        component:ViewLoanOfficerComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path:"viewloanRequest",
        component:ViewLoanRequestComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },

      }
     
    ]
  },
  {
    path: "user",
    component: UserviewComponent
    ,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CUSTOMER'] },
    children: [
      {
        path:"userdashboard",
        component:UserdashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] },

      },
     {
        path: "loanschemes",
        component: LoanschemesComponent,
        
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CUSTOMER'] },
        children: [
          {
            path: "applyloan",
            component: ApplyloanComponent,
            canActivate: [AuthGuard],
            data: { roles: ['ROLE_CUSTOMER'] },
          }
        ]
      },
      {
        path: "payment",
        component: PaymentComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] },
      },
      
      {
        path: "queries",
        component: QueriesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] },
      },
      {
        path: "appliedloans",
        component: AllappliedloanComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] },
      },
      {
        path: "updateprofile",
        component: UpdateprofileComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] },
      },
      {
        path: "calculator",
        component: CalculatorComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] },
      },
      {
        path: "viewemi",
        component: ViewemiComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] },
      },
      {path:"viewapprovedloans",
        component:ViewactiveloansComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] },
        children:[
          {
            path: "viewemi",
            component: ViewemiComponent,
            canActivate: [AuthGuard],
            data: { roles: ['ROLE_CUSTOMER'] },
          },
        ]
      }
      
    ]
  },

  {
    path:"loanofficer",
    component: LoanofficerviewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LOANOFFICER'] },
    children:[
      {
        path:"loanofficerdashboard",
        component: LoanofficerdashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_LOANOFFICER'] },
      },
      {
        path:"loanrequest",
        component:ViewloanrequestComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_LOANOFFICER'] },
      },
      {
        path:"pendingloanrequest",
        component:PendingloanrequestComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_LOANOFFICER'] },
      },
      {
        path:"profile",
        component:ProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_LOANOFFICER'] },
      },
      {
        path:"replytoenquiry",
        component:ReplytoenquiryComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_LOANOFFICER'] },
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
