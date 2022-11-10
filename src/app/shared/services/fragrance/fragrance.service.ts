import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

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
}
