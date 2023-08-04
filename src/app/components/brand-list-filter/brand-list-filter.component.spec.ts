import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandListFilterComponent } from './brand-list-filter.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

describe('BrandListFilterComponent', () => {
  let component: BrandListFilterComponent;
  let fixture: ComponentFixture<BrandListFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandListFilterComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(BrandListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
