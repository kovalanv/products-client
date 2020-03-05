import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Product.ListComponent } from './product.list.component';

describe('Product.ListComponent', () => {
  let component: Product.ListComponent;
  let fixture: ComponentFixture<Product.ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Product.ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Product.ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
