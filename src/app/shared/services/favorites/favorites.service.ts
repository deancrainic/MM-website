import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

const COLLECTION = 'favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private db: AngularFirestore) { }

  updateFavoritesByUser(userId: string, fragranceIds: string[]) {
    return this.db.doc(`${COLLECTION}/${userId}`).ref.update({ fragrancesIds: fragranceIds });
  }

  getFavoritesByUser(userId: string) {
    return this.db.doc(`${COLLECTION}/${userId}`).ref.get();
  }
}
