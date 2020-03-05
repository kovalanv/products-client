import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ProductService } from 'src/app/product.service';
import { PaginationResponse, PaginationResponseData, Product, ProductsResponse } from 'src/app/model/product.model';

@Component({
  selector: 'app-product.list',
  templateUrl: './product.list.component.html',
  styleUrls: ['./product.list.component.css']
})
export class ProductListComponent implements OnInit {

  pageData: PaginationResponseData<Product>;
  currPageNumber = 1;
  defaultPageSize = 10;

  constructor(private authService: AuthService, private prodService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.prodService.loadProducts(this.defaultPageSize, this.currPageNumber).subscribe((response: ProductsResponse) => {
      this.pageData = response.data;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  goToPage(pageNum: number) {
    this.currPageNumber = pageNum;
    this.loadProducts();
  }

}
