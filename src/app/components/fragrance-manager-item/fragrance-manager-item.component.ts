import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FragranceQuantity} from "../../shared/models/fragrance-quantity";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CartService} from "../../shared/services/cart/cart.service";
import {Fragrance} from "../../shared/models/fragrance";
import {FragranceService} from "../../shared/services/fragrance/fragrance.service";

@Component({
  selector: 'app-fragrance-manager-item',
  templateUrl: './fragrance-manager-item.component.html',
  styleUrls: ['./fragrance-manager-item.component.scss']
})
export class FragranceManagerItemComponent implements OnInit {

  @Input()
  fragrance!: Fragrance;
  @Input()
  userId!: string;

  priceForm!: FormGroup;
  price!: number;

  @Output()
  refreshEvent = new EventEmitter<boolean>();

  constructor(private db: AngularFirestore, private fragranceService: FragranceService) { }

  ngOnInit(): void {
    this.priceForm = new FormGroup({
      price: new FormControl(this.fragrance.price, [Validators.min(1), Validators.required])
    })
  }

  updatePrice(fragranceId: string, price: number) {
    this.fragranceService.updateFragrance(fragranceId, price).then(() => this.refreshEvent.emit(true));
  }

  removeFragrance(fragranceId: string) {
    this.fragranceService.removeFragrance(fragranceId).then(() => this.refreshEvent.emit(true));
  }

  get priceField() {
    return this.priceForm.get('price');
  }

}
