import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverDocumentoComponent } from './popover-documento.component';

describe('PopoverDocumentoComponent', () => {
  let component: PopoverDocumentoComponent;
  let fixture: ComponentFixture<PopoverDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopoverDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
