import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroEmpleadoComponent } from './form-registro-empleado.component';

describe('FormRegistroEmpleadoComponent', () => {
  let component: FormRegistroEmpleadoComponent;
  let fixture: ComponentFixture<FormRegistroEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegistroEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistroEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
