import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private handleError(errRes) {
    let errorMessage: string;
    if (errRes.error && errRes.error.message) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${errRes.error.message}`;
    } else if(errRes.body){
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Error processing the request: ${errRes.status}: ${errRes.body.error}`;
    } else {
      errorMessage = 'Error processing the request';
    }
    console.error(errRes);
    return throwError(errorMessage);
  }

  login(username: string, password: string) {
    const headers = {};
    const loginUser = {
      username: username,
      password: password
    }
    headers['Content-Type'] = 'application/json';
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';

    const options = {
      headers: headers,
      observe: "response" as 'body' // to display the full response & as 'body' for type cast
  };

    return this.httpClient.post(environment.APIEndpoints.login, loginUser, {headers, observe: "response"}).pipe(map((response:any) => {
      if (!response || !response.headers || !response.headers.get('Authorization')) {
        return false;
      }
      const token = response.headers.get('authorization');
      const username = response.headers.get('username');
      this.storeUserAndToken(token, username);
      return true;
    }))
  }

  storeUserAndToken(token: string, username: string) {
    localStorage.setItem("authorization", token);
    localStorage.setItem("username", username);
  }

  logout() {
    localStorage.clear();
  }

  getStoredAuthToken() {
    return localStorage.getItem("authorization");
  }

  getStoredUsername() {
    return localStorage.getItem("username");
  }

}
