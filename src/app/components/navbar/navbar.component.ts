import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn!: boolean;
  isAdmin!: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser.subscribe(user => {
      this.isLoggedIn = user !== null
      this.isAdmin = user?.email === 'admin@yahoo.com';
    });
  }

  onLogOut() {
    this.authService.SignOut();
  }

}
