import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import {Router,RouterModule} from '@angular/router'
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { AuthService } from './service/auth/auth.service';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth.guard';
import { UserGuard } from './user.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import {MatListModule} from '@angular/material/list';
import { ProductComponent } from './components/product/product.component';
import {AdminComponent} from './admin/admin.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DelProductComponent } from './components/del-product/del-product.component';
import { JwtHelperService,JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrandComponent } from './brand/brand.component';
import { EditBrandComponent } from './components/edit-brand/edit-brand.component';
import { CategoryComponent } from './components/category/category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { AddCategoryComponent } from './component/add-category/add-category.component';
import { AddBrandComponent } from './component/add-brand/add-brand.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user/user.component';
import { EdituserComponent } from './edituser/edituser.component';
import { NgxStripeModule } from 'ngx-stripe';
import { ProbycateComponent } from './probycate/probycate.component';
import { ProbybrandComponent } from './probybrand/probybrand.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageOrderDetailComponent } from './manage-order-detail/manage-order-detail.component';
import { OrderUserComponent } from './order-user/order-user.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    ProductComponent,
    AdminDashboardComponent,
    AddProductComponent,
    EditProductComponent,
    DelProductComponent,
    BrandComponent,
    EditBrandComponent,
    CategoryComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    AddBrandComponent,
    CartComponent,
    ProductDetailsComponent,
    OrderComponent,
    UserComponent,
    EdituserComponent,
    ProbycateComponent,
    ProbybrandComponent,
    ManageOrderComponent,
    ManageOrderDetailComponent,
    OrderUserComponent,
    DashboardComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatBadgeModule,
    MatSidenavModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    LayoutModule,
    MatListModule,
    MatFormFieldModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxStripeModule.forRoot('pk_test_51HHmDmGPGP9AJh1XsYmSbxp9nSrMQrSMrcFKw7zLhgyrPCg6Pj4Dlzt1bVMT3eJb3axpby1j8mTDmgTZZ1tGPQvy00vZbBkR81')
  ],
  exports:[ RouterModule ],
  providers: [AuthService,AuthGuard,UserGuard,JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
