import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadAcademicaComponent } from './unidad-academica.component';

describe('UnidadAcademicaComponent', () => {
  let component: UnidadAcademicaComponent;
  let fixture: ComponentFixture<UnidadAcademicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadAcademicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadAcademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
