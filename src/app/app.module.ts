import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from "./shared/modules/material/material.module";
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { CartComponent } from './pages/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FirebaseModule } from "./shared/modules/firebase/firebase.module";
import { AuthService } from "./shared/services/auth/auth.service";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {SharedModule} from "./shared/shared.module";
import {ServicesModule} from "./shared/services/services.module";
import { FragranceItemComponent } from './components/fragrance-item/fragrance-item.component';
import { FragranceComponent } from './pages/fragrance/fragrance.component';
import {ToastrModule} from "ngx-toastr";
import { FragrancesScreenComponent } from './components/fragrances-screen/fragrances-screen.component';
import { FragranceCartItemComponent } from './components/fragrance-cart-item/fragrance-cart-item.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import {IvyCarouselModule} from "angular14-responsive-carousel";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    FavoritesComponent,
    CartComponent,
    FragranceItemComponent,
    FragranceComponent,
    FragrancesScreenComponent,
    FragranceCartItemComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1500
    }),
    IvyCarouselModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
