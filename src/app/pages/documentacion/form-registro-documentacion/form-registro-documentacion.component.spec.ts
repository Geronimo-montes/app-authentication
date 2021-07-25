import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroDocumentacionComponent } from './form-registro-documentacion.component';

describe('FormRegistroDocumentacionComponent', () => {
  let component: FormRegistroDocumentacionComponent;
  let fixture: ComponentFixture<FormRegistroDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegistroDocumentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistroDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
