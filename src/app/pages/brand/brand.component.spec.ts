import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandComponent } from './brand.component';
import { UseBrands } from 'src/app/hooks/useBrands/useBrands.service';
import { HomeModule } from '../home/home.module';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeModule, RouterTestingModule],
      providers: [UseBrands]
    }).compileComponents();
    
    fixture = TestBed.createComponent(BrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
