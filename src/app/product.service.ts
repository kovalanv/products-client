import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  loadProducts(pageSize: number, pageNumber: number) {
    const headers = {};
    const params:any = {pageSize: pageSize, page: pageNumber};
    headers['Content-Type'] = 'application/json';
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
    headers['authorization'] = this.authService.getStoredAuthToken();
    headers['username'] = this.authService.getStoredUsername();

    return this.httpClient.get(environment.APIEndpoints.produtList+"?", {headers, params});
  }

}
