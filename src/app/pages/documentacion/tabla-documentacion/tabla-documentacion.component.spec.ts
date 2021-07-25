import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDocumentacionComponent } from './tabla-documentacion.component';

describe('TablaDocumentacionComponent', () => {
  let component: TablaDocumentacionComponent;
  let fixture: ComponentFixture<TablaDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaDocumentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
