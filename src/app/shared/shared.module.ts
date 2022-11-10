import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FirebaseModule} from "./modules/firebase/firebase.module";
import {MaterialModule} from "./modules/material/material.module";
import {ServicesModule} from "./services/services.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FirebaseModule,
    MaterialModule,
    ServicesModule
  ],
  exports: [
    MaterialModule
  ]
})
export class SharedModule { }
