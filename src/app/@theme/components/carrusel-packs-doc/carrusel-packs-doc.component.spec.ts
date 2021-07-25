import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselPacksDocComponent } from './carrusel-packs-doc.component';

describe('CarruselPacksDocComponent', () => {
  let component: CarruselPacksDocComponent;
  let fixture: ComponentFixture<CarruselPacksDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarruselPacksDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarruselPacksDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
