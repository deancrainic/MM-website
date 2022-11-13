import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FragranceService} from "../../shared/services/fragrance/fragrance.service";
import {Fragrance} from "../../shared/models/fragrance";

@Component({
  selector: 'app-fragrance-manager',
  templateUrl: './fragrance-manager.component.html',
  styleUrls: ['./fragrance-manager.component.scss']
})
export class FragranceManagerComponent implements OnInit {

  addFragranceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    notes: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    images: new FormControl('', [Validators.required]),
  })
  fragrances: Fragrance[] = [];
  isLoading = true;

  constructor(private fragranceService: FragranceService) { }

  ngOnInit(): void {
    this.getFragrances();
  }

  parseImages() {
    let images: string[] = [];
    let imagesField = this.addFragranceForm.get('images')?.value as string;

    if (imagesField !== undefined && imagesField !== null) {
      imagesField.split(",").forEach(i => images.push(i));
    }

    return images;
  }

  addFragrance() {
    let fragrance: Fragrance = {
      id: '0',
      name: this.addFragranceForm.get('name')?.value as string,
      description: this.addFragranceForm.get('description')?.value as string,
      notes: this.addFragranceForm.get('notes')?.value as string,
      price: Number.parseInt(this.addFragranceForm.get('price')?.value as string),
      images: this.parseImages(),
      cid: this.addFragranceForm.get('category')?.value as string
    };

    this.fragranceService.addFragrance(fragrance).then(() => {this.addFragranceForm.reset();this.ngOnInit()});
  }

  getFragrances() {
    this.isLoading = true;
    this.fragranceService.getFragranceList()
      .then(res => {
        this.fragrances = [];
        res.forEach(r => {
          let fr = r.data() as Fragrance;
          fr.id = r.id;
          this.fragrances.push(fr);
        });
        this.fragrances.sort((a, b) => a.name.localeCompare(b.name));
      })
      .then(() => this.isLoading = false);
  }
}
