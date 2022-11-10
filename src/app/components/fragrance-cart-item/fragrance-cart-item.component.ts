import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FragranceQuantity} from "../../shared/models/fragrance-quantity";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CartService} from "../../shared/services/cart/cart.service";
import {FragranceService} from "../../shared/services/fragrance/fragrance.service";

@Component({
  selector: 'app-fragrance-cart-item',
  templateUrl: './fragrance-cart-item.component.html',
  styleUrls: ['./fragrance-cart-item.component.scss']
})
export class FragranceCartItemComponent implements OnInit {

  @Input()
  fragrance!: FragranceQuantity;
  @Input()
  userId!: string;

  quantityForm!: FormGroup;

  @Output()
  refreshEvent = new EventEmitter<boolean>();

  constructor(private db: AngularFirestore, private cartService: CartService) { }

  ngOnInit(): void {
    this.quantityForm = new FormGroup({
      quantity: new FormControl(this.fragrance.quantity, [forbiddenNameValidator()])
    })
  }

  updateQuantity(fragranceId: string, quantity: number) {
    this.cartService.updateQuantityFromCart(this.userId, fragranceId, quantity).then(() => this.refreshEvent.emit(true));
  }

  removeFragrance(fragranceId: string) {
    this.cartService.removeFragranceFromCart(this.userId, fragranceId).then(() => this.refreshEvent.emit(true));
  }

  get quantity() {
    return this.quantityForm.get('quantity')!.value;
  }
}

function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (!control.value) {
      return null;
    }

    const forbidden = control.value < 1;
    return !forbidden ? {forbiddenValue: {value: control.value}} : null;
  };
}
