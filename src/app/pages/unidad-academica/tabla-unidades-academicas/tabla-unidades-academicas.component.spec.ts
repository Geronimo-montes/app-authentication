import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaUnidadesAcademicasComponent } from './tabla-unidades-academicas.component';

describe('TablaUnidadesAcademicasComponent', () => {
  let component: TablaUnidadesAcademicasComponent;
  let fixture: ComponentFixture<TablaUnidadesAcademicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaUnidadesAcademicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaUnidadesAcademicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
