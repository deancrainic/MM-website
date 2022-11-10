import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {CartService} from "../../shared/services/cart/cart.service";
import {FragranceService} from "../../shared/services/fragrance/fragrance.service";
import {FragranceQuantityId} from "../../shared/models/fragrance-quantity-id";
import {Fragrance} from "../../shared/models/fragrance";
import {Cart} from "../../shared/models/cart";
import {FragranceQuantity} from "../../shared/models/fragrance-quantity";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  isLoading = true;
  fragrances!: FragranceQuantity[];
  userId!: string;
  totalCost = 0;
  confirmationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private fragranceService: FragranceService
  ) { }

  ngOnInit(): void {
    this.getFragrancesList();
  }

  getFragrancesList() {
    this.fragrances = [];
    this.isLoading = true;
    this.authService.getUser.subscribe(user => {
      this.userId = user!.uid;
      this.cartService.getCartByUser(this.userId)
        .then(cart => {
          let cartItems = cart.data() as Cart;
          let fragrancesIds = cartItems.fragrances;
          this.totalCost = 0;

          fragrancesIds.forEach(fid => {
            this.fragranceService.getFragranceById(fid.fragranceId).then(fragrance => {
              let frag = fragrance.data() as Fragrance;
              frag.id = fragrance.id;
              let fragWithQuantity: FragranceQuantity = {
                fragrance: frag,
                quantity: fid.quantity
              };

              this.totalCost += fragWithQuantity.fragrance.price * fragWithQuantity.quantity;
              this.fragrances.push(fragWithQuantity);
            });
          });
        })
        .then(() => this.isLoading = false);
    })
  }

  handleBuy() {
    this.cartService.setCartEmpty(this.userId).then(() => this.ngOnInit());
  }

  get email(): string | undefined | null {
    return this.confirmationForm.get('email')?.value;
  }

  get firstName(): string | undefined | null {
    return this.confirmationForm.get('firstName')?.value;
  }

  get lastName(): string | undefined | null {
    return this.confirmationForm.get('lastName')?.value;
  }

  get address(): string | undefined | null {
    return this.confirmationForm.get('address')?.value;
  }

}
