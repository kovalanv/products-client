import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProductModule } from 'src/app/product/product.module';
import { AuthService } from 'src/app/auth.service';
import { ProductService } from 'src/app/product.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReqResInterceptor } from 'src/app/ReqRes-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ProductModule,
    HttpClientModule
  ],
  providers: [
    AuthService, 
    ProductService, 
    { provide: HTTP_INTERCEPTORS, useClass: ReqResInterceptor, multi: true },
    NgxPaginationModule],
  bootstrap: [AppComponent],
  exports: [
    NgxPaginationModule
  ]
})
export class AppModule { }
