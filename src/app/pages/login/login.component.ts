import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleLogin(): void {
    if (this.email && this.password) {
      this.authService.SignIn(this.email, this.password);
    }
  }

  get email(): string | undefined | null {
    return this.loginForm.get('email')?.value;
  }

  get password(): string | undefined | null {
    return this.loginForm.get('password')?.value;
  }
}
