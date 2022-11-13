import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  isAdmin!: boolean;

  canActivate(): boolean {
    this.authService.getUser.subscribe(user => {
      this.isAdmin = user?.email === 'ana@yahoo.com';
    });

    if (!this.isAdmin) {
      this.router.navigate(['']);
    }

    return this.isAdmin;
  }

}
