import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEmpleadoComponent } from './tabla-empleado.component';

describe('TablaEmpleadoComponent', () => {
  let component: TablaEmpleadoComponent;
  let fixture: ComponentFixture<TablaEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
