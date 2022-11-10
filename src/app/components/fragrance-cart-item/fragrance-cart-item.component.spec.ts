import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragranceCartItemComponent } from './fragrance-cart-item.component';

describe('FragranceCartItemComponent', () => {
  let component: FragranceCartItemComponent;
  let fixture: ComponentFixture<FragranceCartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FragranceCartItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FragranceCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
