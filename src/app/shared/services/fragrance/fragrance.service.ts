import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Fragrance} from "../../models/fragrance";

const COLLECTION = 'fragrances';

@Injectable({
  providedIn: 'root'
})
export class FragranceService {

  constructor(private db: AngularFirestore) { }

  getFragranceList() {
    return this.db.collection(COLLECTION).ref.get();
  }

  getFragranceById(id: string) {
    return this.db.doc(`${COLLECTION}/${id}`).ref.get();
  }

  addFragrance(fragrance: Fragrance) {
    let fragranceWithoutId = {
      cid: fragrance.cid,
      name: fragrance.name,
      description: fragrance.description,
      notes: fragrance.notes,
      images: fragrance.images,
      price: fragrance.price
    };

    return this.db.collection(`${COLLECTION}`).add(fragranceWithoutId);
  }

  updateFragrance(id: string, price: number) {
    return this.db.doc(`${COLLECTION}/${id}`).ref.update({ price: price });
  }

  removeFragrance(id: string) {
    return this.db.doc(`${COLLECTION}/${id}`).ref.delete();
  }
}
