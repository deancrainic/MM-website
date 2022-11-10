import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "./auth/auth.service";
import {FragranceService} from "./fragrance/fragrance.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    FragranceService
  ]
})
export class ServicesModule { }
