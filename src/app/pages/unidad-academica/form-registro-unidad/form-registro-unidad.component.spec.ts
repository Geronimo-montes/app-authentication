import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroUnidadComponent } from './form-registro-unidad.component';

describe('FormRegistroUnidadComponent', () => {
  let component: FormRegistroUnidadComponent;
  let fixture: ComponentFixture<FormRegistroUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegistroUnidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistroUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
