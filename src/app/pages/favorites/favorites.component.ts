import { Component, OnInit } from '@angular/core';
import {Fragrance} from "../../shared/models/fragrance";
import {Favorites} from "../../shared/models/favorites";
import {AuthService} from "../../shared/services/auth/auth.service";
import {FavoritesService} from "../../shared/services/favorites/favorites.service";
import {FragranceService} from "../../shared/services/fragrance/fragrance.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  fragrances!: Fragrance[];
  userId!: string;
  isLoading = true;

  constructor(private authService: AuthService, private favoritesService: FavoritesService, private fragranceService: FragranceService) { }

  ngOnInit(): void {
    this.getFragrancesList();
  }

  getFragrancesList() {
    this.fragrances = [];
    this.isLoading = true;
    this.authService.getUser.subscribe(user => {
      this.userId = user!.uid;
      this.favoritesService.getFavoritesByUser(this.userId)
        .then(favorites => {
          let favs = favorites.data() as Favorites;
          let fragrancesIds = favs.fragrancesIds;

          fragrancesIds?.forEach(fid => {
            this.fragranceService.getFragranceById(fid).then(fragrance => {
              let frag = fragrance.data() as Fragrance;
              frag.id = fragrance.id;
              this.fragrances.push(frag);
            });
          });
        })
        .then(() => this.isLoading = false);
    })
  }
}
