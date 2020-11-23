import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {AdminComponent} from './admin/admin.component'
import { AuthGuard } from './auth.guard';
import { UserGuard } from './user.guard';
import { ProductComponent } from './components/product/product.component';
import { from } from 'rxjs';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DelProductComponent } from './components/del-product/del-product.component';
import { CategoryComponent } from './components/category/category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { AddCategoryComponent } from './component/add-category/add-category.component';
import { BrandComponent } from './brand/brand.component';
import { AddBrandComponent } from './component/add-brand/add-brand.component';
import { EditBrandComponent } from './components/edit-brand/edit-brand.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserComponent } from './user/user.component';
import { EdituserComponent } from './edituser/edituser.component';
import { OrderComponent } from './order/order.component';
import { ProbycateComponent } from './probycate/probycate.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { OrderUserComponent } from './order-user/order-user.component';
import { ProbybrandComponent } from './probybrand/probybrand.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'  
  },
  {
    path:'register',
    component:RegisterComponent,
    canActivate:[]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'admin',
    component:AdminComponent,
    canActivate:[AuthGuard],
    children:[
      {path:'product',component:ProductComponent},
      {path:'add-product',component:AddProductComponent},
      {path:'edit-product/:id',component:EditProductComponent},
      {path:'category',component:CategoryComponent},
      {path:'edit-category/:id',component:EditCategoryComponent},
      {path:'add-category',component:AddCategoryComponent},
      {path:'brand',component:BrandComponent},
      {path:'add-brand',component:AddBrandComponent},
      {path:'edit-brand/:id',component:EditBrandComponent},
      {path:'manage-order',component:ManageOrderComponent},
      {
        path:'dashboard',
        component:DashboardComponent
      },

    ]
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'product-details/:id',
    component:ProductDetailsComponent
  },
  {
    path:'user',
    component:UserComponent,
    canActivate:[UserGuard]
  },
  {
    path:'order',
    component:OrderComponent,
    canActivate:[UserGuard]
  },
  {
    path:'edit-user',
    component:EdituserComponent,
    canActivate:[UserGuard]
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent
  },
  {
    path:'productbycate/:id',
    component:ProbycateComponent,
  },
  {
    path:'productbybrand/:id',
    component:ProbybrandComponent,
  },
  {
    path:'order-user',
    component:OrderUserComponent,
    canActivate:[UserGuard]
  },
  {
    path:'**',
    component:PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
