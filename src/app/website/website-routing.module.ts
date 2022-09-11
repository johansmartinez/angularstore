import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children:[
      //redirigir una ruta
      {
        path:'',
        redirectTo:'/home',
        pathMatch:'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'category',
        data:{
          preload:true
        },
        loadChildren: ()=> import('./pages/category/category.module').then(m=>m.CategoryModule)
      },
      {
        path: 'my-cart',
        component: MyCartComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'recovery',
        component: RecoveryComponent,
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
