import { Injectable } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard {
    constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.checkLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

}
