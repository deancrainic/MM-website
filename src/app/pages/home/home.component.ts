import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menActive = false;
  womenActive = false;
  unisexActive = false;

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.getFragrancesList();
  }

  getFragrancesList() {
    this.db.collection('fragrances').valueChanges().subscribe(res => console.log(res));
  }

  handleMenActive(): void {
    this.menActive = !this.menActive;
  }

  handleWomenActive(): void {
    this.womenActive = !this.womenActive;
  }

  handleUnisexActive(): void {
    this.unisexActive = !this.unisexActive;
  }

}
