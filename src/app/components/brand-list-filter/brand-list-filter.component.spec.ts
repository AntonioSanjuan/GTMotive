import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandListFilterComponent } from './brand-list-filter.component';

describe('BrandListFilterComponent', () => {
  let component: BrandListFilterComponent;
  let fixture: ComponentFixture<BrandListFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandListFilterComponent]
    });
    fixture = TestBed.createComponent(BrandListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
