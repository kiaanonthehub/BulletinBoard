import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostDisplayComponent } from './post/post-display/post-display.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from '../../src/app/auth/signup/signup.component';

// routes for navigation
const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'posts', component: PostDisplayComponent },
    { path: 'add', component: PostCreateComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
