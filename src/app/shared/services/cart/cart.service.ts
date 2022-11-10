import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FragranceQuantityId} from "../../models/fragrance-quantity-id";
import {Cart} from "../../models/cart";

const COLLECTION = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db: AngularFirestore) { }

  updateCartByUser(userId: string, fragrances: FragranceQuantityId[]) {
    return this.db.doc(`${COLLECTION}/${userId}`).ref.update({ fragrances: fragrances });
  }

  getCartByUser(userId: string) {
    return this.db.doc(`${COLLECTION}/${userId}`).ref.get();
  }

  removeFragranceFromCart(userId: string, fragranceId: string) {
    return this.db.doc(`${COLLECTION}/${userId}`).ref.get()
      .then(cartItems => {
      let cartItemsData = cartItems.data() as Cart;
      cartItemsData.fragrances = cartItemsData.fragrances.filter(fr => fr.fragranceId !== fragranceId);
      return cartItemsData;
      })
      .then((cartItemsData) => {
        this.db.doc(`${COLLECTION}/${userId}`).ref.update(cartItemsData);
      });
  }

  updateQuantityFromCart(userId: string, fragranceId: string, quantity: number) {
    return this.db.doc(`${COLLECTION}/${userId}`).ref.get()
      .then(cartItems => {
        let cartItemsData = cartItems.data() as Cart;
        cartItemsData.fragrances = cartItemsData.fragrances.filter(fr => fr.fragranceId !== fragranceId);
        cartItemsData.fragrances.push({ fragranceId: fragranceId, quantity: quantity });
        return cartItemsData;
      })
      .then(cartItemsData => {
        this.db.doc(`${COLLECTION}/${userId}`).ref.update(cartItemsData);
      });
  }

  setCartEmpty(userId: string) {
    return this.db.doc(`${COLLECTION}/${userId}`).ref.update({ fragrances: [] });
  }
}
