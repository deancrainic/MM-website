import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragrancesScreenComponent } from './fragrances-screen.component';

describe('FragrancesScreenComponent', () => {
  let component: FragrancesScreenComponent;
  let fixture: ComponentFixture<FragrancesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FragrancesScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FragrancesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
