import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/ui/pages/page-not-found/page-not-found.component';
import { PageUnauthorizedComponent } from './core/ui/pages/page-unauthorized/page-unauthorized.component';
import { TestComponent } from './test/test.component';
import { NotificationComponent } from './core/ui/pages/notification/notification.component';
import { LoginComponent } from './core/ui/pages/login/login/login.component';
import { SignUpComponent } from './core/ui/pages/login/sign-up/sign-up.component';
import { ForgotPwdComponent } from './core/ui/pages/login/forgot-pwd/forgot-pwd.component';
import { NewPwdComponent } from './core/ui/pages/login/new-pwd/new-pwd.component';

export const routes: Routes = [
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPwdComponent,
  },
  {
    path: 'new-password',
    component: NewPwdComponent,
  },
  {
    path: 'page-unauthorized',
    component: PageUnauthorizedComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];
