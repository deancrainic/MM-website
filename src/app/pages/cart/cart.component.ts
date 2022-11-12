import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {CartService} from "../../shared/services/cart/cart.service";
import {FragranceService} from "../../shared/services/fragrance/fragrance.service";
import {FragranceQuantityId} from "../../shared/models/fragrance-quantity-id";
import {Fragrance} from "../../shared/models/fragrance";
import {Cart} from "../../shared/models/cart";
import {FragranceQuantity} from "../../shared/models/fragrance-quantity";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

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
  discount = new FormGroup({
    code: new FormControl()
  });
  discountApplied = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private fragranceService: FragranceService,
    private toastrService: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.getFragrancesList();
  }

  getFragrancesList() {
    this.fragrances = [];
    this.isLoading = true;

    let code = localStorage.getItem('code');
    if (code !== 'null') {
      this.discount.get('code')?.setValue(code);
      this.discountApplied = true;
    } else {
      this.discount.get('code')?.setValue('');
      this.discountApplied = false;
    }

    this.authService.getUser.subscribe(user => {
      this.userId = user!.uid;
      this.cartService.getCartByUser(this.userId)
        .then(cart => {
          let cartItems = cart.data() as Cart;
          let fragrancesIds = cartItems.fragrances;
          this.totalCost = 0;

          fragrancesIds.sort((a, b) => b.fragranceId.localeCompare(a.fragranceId));

          fragrancesIds.forEach(fid => {
            this.fragranceService.getFragranceById(fid.fragranceId).then(fragrance => {
              let frag = fragrance.data() as Fragrance;
              frag.id = fragrance.id;
              if (this.discountApplied) {
                frag.price = frag.price - frag.price * 20 / 100;
              }
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

  applyDiscount() {
    if (this.codeField?.value !== 'promo20') {
      this.toastrService.error("Discount code isn't valid");
      this.discountApplied = false;
    } else {
      localStorage.setItem('code', this.codeField.value);
      this.discountApplied = true;
      this.ngOnInit();
    }
  }

  removeDiscount() {
    this.discountApplied = false;
    localStorage.setItem('code', 'null');
    this.ngOnInit();
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

  get codeField() {
    return this.discount.get('code');
  }

}
