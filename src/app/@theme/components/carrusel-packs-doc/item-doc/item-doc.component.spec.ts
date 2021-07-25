import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDocComponent } from './item-doc.component';

describe('ItemDocComponent', () => {
  let component: ItemDocComponent;
  let fixture: ComponentFixture<ItemDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
