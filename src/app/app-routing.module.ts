import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {FavoritesComponent} from "./pages/favorites/favorites.component";
import {CartComponent} from "./pages/cart/cart.component";
import {FragranceComponent} from "./pages/fragrance/fragrance.component";
import {LoggedInGuard} from "./shared/guards/logged-in.guard";
import {AboutUsComponent} from "./pages/about-us/about-us.component";

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'favorites',
  component: FavoritesComponent,
  canActivate: [LoggedInGuard]
}, {
  path: 'cart',
  component: CartComponent,
  canActivate: [LoggedInGuard]
}, {
  path: 'fragrance/:id',
  component: FragranceComponent
}, {
  path: 'about-us',
  component: AboutUsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
