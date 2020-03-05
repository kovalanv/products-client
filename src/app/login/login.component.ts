import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'user1';
  password = '1234';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.authService.login(this.username, this.password).subscribe(resp => {
      if (resp == true) {
        this.router.navigateByUrl('/products');
      }      
    })
  }


}
