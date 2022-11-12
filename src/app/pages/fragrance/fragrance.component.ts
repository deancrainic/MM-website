import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Fragrance} from "../../shared/models/fragrance";
import {FragranceService} from "../../shared/services/fragrance/fragrance.service";
import {AuthService} from "../../shared/services/auth/auth.service";
import {FavoritesService} from "../../shared/services/favorites/favorites.service";
import {user} from "@angular/fire/auth";
import {Favorites} from "../../shared/models/favorites";
import {ToastrService} from "ngx-toastr";
import {FragranceQuantityId} from "../../shared/models/fragrance-quantity-id";
import {CartService} from "../../shared/services/cart/cart.service";
import {Cart} from "../../shared/models/cart";

@Component({
  selector: 'app-fragrance',
  templateUrl: './fragrance.component.html',
  styleUrls: ['./fragrance.component.scss']
})
export class FragranceComponent implements OnInit {

  userId!: string;
  isLoggedIn!: boolean;
  fragranceId!: string;
  fragrance!: Fragrance;
  isLoading = true;
  imageIndex = 0;
  favorites!: string[];
  cartItems!: FragranceQuantityId[];
  isAdded: boolean = false;
  isAddedInCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fragranceService: FragranceService,
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.getUser.subscribe(user => {
      this.isLoggedIn = user !== null;
    });
    this.route.params.subscribe(params => {
      this.fragranceId = params['id'];
      this.fragranceService.getFragranceById(this.fragranceId).then(res => {
        this.fragrance = res.data() as Fragrance;
        this.fragrance.id = res.id;
        this.isLoading = false;

        this.authService.getUser.subscribe(user => {
          this.userId = user!.uid;
          this.favoritesService.getFavoritesByUser(this.userId)
            .then(favorites => {
              let favs = favorites.data() as Favorites;
              console.log(favs)
              this.favorites = favs.fragrancesIds;
              if (this.favorites?.includes(this.fragranceId)) {
                this.isAdded = true;
              }
            });
          this.cartService.getCartByUser(this.userId)
            .then(cart => {
              let cartItms = cart.data() as Cart;
              this.cartItems = cartItms.fragrances;

              this.cartItems.forEach(ci => {
                if (ci.fragranceId === this.fragranceId) {
                  this.isAddedInCart = true;
                }
              });
            });
        });
      })
    });
  }

  nextImage() {
    if (this.imageIndex < this.fragrance.images.length - 1) {
      this.imageIndex++;
    }
  }

  previousImage() {
    if (this.imageIndex > 0) {
      this.imageIndex--;
    }
  }

  handleFavorites() {
    if (this.isLoggedIn) {
      if (!this.isAdded) {
        this.favorites.push(this.fragranceId);
        this.favoritesService.updateFavoritesByUser(this.userId, this.favorites)
          .then(() => {
            this.isAdded = !this.isAdded;
          });
      } else {
        this.favorites = this.favorites.filter(f => f !== this.fragranceId);
        this.favoritesService.updateFavoritesByUser(this.userId, this.favorites)
          .then(() => {
            this.isAdded = !this.isAdded;
          });
      }
    } else {
      this.router.navigate(['login']);
    }
  }

  handleCart() {
    if (this.isLoggedIn) {
      if (!this.isAddedInCart) {
        let fragWithId: FragranceQuantityId = {
          fragranceId: this.fragranceId,
          quantity: 1
        };
        this.cartItems.push(fragWithId);
        this.cartService.updateCartByUser(this.userId, this.cartItems)
          .then(() => {
            this.isAddedInCart = !this.isAddedInCart;
          });
      }
    } else {
      this.router.navigate(['login']);
    }
  }
}
