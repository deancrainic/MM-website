import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Fragrance} from "../../shared/models/fragrance";
import {FragranceService} from "../../shared/services/fragrance/fragrance.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fragrances-screen',
  templateUrl: './fragrances-screen.component.html',
  styleUrls: ['./fragrances-screen.component.scss']
})
export class FragrancesScreenComponent implements OnInit, OnChanges {

  @Input()
  fragrances!: Fragrance[];

  menActive = false;
  womenActive = false;
  unisexActive = false;
  filteredFragrances: Fragrance[] = [];
  rowsNumber!: number;
  rows!: number[];

  constructor(private fragranceService: FragranceService, private router: Router) { }

  ngOnInit(): void {
    this.getFragranceList();
  }

  ngOnChanges() {
    this.getFragranceList();
  }

  getFragranceList() {
      this.filteredFragrances = this.fragrances;
      this.rowsNumber = Math.floor(this.fragrances.length / 4) + 1;
      this.rows = Array(this.rowsNumber).fill(0).map((x, i) => i);
  }

  handleMenActive(): void {
    this.menActive = !this.menActive;
    if (this.menActive) {
      this.filteredFragrances = this.fragrances.filter(f => f.cid === 'men');
      this.womenActive = false;
      this.unisexActive = false;
    } else {
      this.filteredFragrances = this.fragrances;
    }
  }

  handleWomenActive(): void {
    this.womenActive = !this.womenActive;
    if (this.womenActive) {
      this.filteredFragrances = this.fragrances.filter(f => f.cid === 'women');
      this.menActive = false;
      this.unisexActive = false;
    } else {
      this.filteredFragrances = this.fragrances;
    }
  }

  handleUnisexActive(): void {
    this.unisexActive = !this.unisexActive;
    if (this.unisexActive) {
      this.filteredFragrances = this.fragrances.filter(f => f.cid === 'unisex');
      this.womenActive = false;
      this.menActive = false;
    } else {
      this.filteredFragrances = this.fragrances;
    }
  }

  handleGotoFragrance(fragranceId: string): void {
    this.router.navigate(['fragrance/' + fragranceId]);
  }

}
