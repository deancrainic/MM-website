import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragranceManagerItemComponent } from './fragrance-manager-item.component';

describe('FragranceManagerItemComponent', () => {
  let component: FragranceManagerItemComponent;
  let fixture: ComponentFixture<FragranceManagerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FragranceManagerItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FragranceManagerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
