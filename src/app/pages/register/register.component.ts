import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmedPassword: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleRegister(): void {
    if (this.email && this.password && this.firstName && this.lastName) {
      this.authService.SignUp(this.email, this.password, `${this.firstName} ${this.lastName}`);
    }
  }

  get email(): string | undefined | null {
    return this.registerForm.get('email')?.value;
  }

  get firstName(): string | undefined | null {
    return this.registerForm.get('firstName')?.value;
  }

  get lastName(): string | undefined | null {
    return this.registerForm.get('lastName')?.value;
  }

  get password(): string | undefined | null {
    return this.registerForm.get('password')?.value;
  }

  get confirmedPassword(): string | undefined | null {
    return this.registerForm.get('confirmedPassword')?.value;
  }

}
