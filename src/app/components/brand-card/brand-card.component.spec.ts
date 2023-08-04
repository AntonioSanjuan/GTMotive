import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCardComponent } from './brand-card.component';
import { SkeletonDirective } from 'src/app/directives/skeleton/skeleton.directive';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('BrandCardComponent', () => {
  let component: BrandCardComponent;
  let fixture: ComponentFixture<BrandCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandCardComponent, SkeletonDirective],
      imports: [
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(BrandCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
