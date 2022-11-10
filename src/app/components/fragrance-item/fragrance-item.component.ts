import {Component, Input, OnInit} from '@angular/core';
import {Fragrance} from "../../shared/models/fragrance";

@Component({
  selector: 'app-fragrance-item',
  templateUrl: './fragrance-item.component.html',
  styleUrls: ['./fragrance-item.component.scss']
})
export class FragranceItemComponent implements OnInit {

  @Input()
  fragrance!: Fragrance;

  constructor() { }

  ngOnInit(): void {
  }

}
