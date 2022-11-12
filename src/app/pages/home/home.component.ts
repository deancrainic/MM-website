import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FragranceService} from "../../shared/services/fragrance/fragrance.service";
import {Fragrance} from "../../shared/models/fragrance";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading = true;
  fragrances!: Fragrance[];
  images = [
    {path: '../../../assets/discount-image.jpg'},
    {path: 'https://www.eisenberg.com/upload/images/eisenberg/4f/173_BANNER-CATEGORIE-FRAGRANCE-1170X500PX.jpeg'},
    {path: 'https://cdn.thegentlemansjournal.com/wp-content/uploads/2015/09/Header-Fragrances-1.jpg'}
  ];

  constructor(private fragranceService: FragranceService) { }

  ngOnInit(): void {
    this.getFragranceList();
  }

  getFragranceList() {
    this.isLoading = true;
    this.fragranceService.getFragranceList()
      .then(res => {
        this.fragrances = [];
        res.forEach(r => {
          let fr = r.data() as Fragrance;
          fr.id = r.id;
          this.fragrances.push(fr);
        });
      })
      .then(() => this.isLoading = false);
  }
}
