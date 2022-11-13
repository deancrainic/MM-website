import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragranceManagerComponent } from './fragrance-manager.component';

describe('FragranceManagerComponent', () => {
  let component: FragranceManagerComponent;
  let fixture: ComponentFixture<FragranceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FragranceManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FragranceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
