import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroAlumnoComponent } from './form-registro-alumno.component';

describe('FormRegistroAlumnoComponent', () => {
  let component: FormRegistroAlumnoComponent;
  let fixture: ComponentFixture<FormRegistroAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegistroAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistroAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
