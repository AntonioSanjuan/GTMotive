import { Component, OnInit } from '@angular/core';
import { UseBrands } from 'src/app/hooks/useBrands/useBrands.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent implements OnInit {
  constructor(public useBrands: UseBrands) {}

  public isIntersecting(intersecting: boolean) {
    if(intersecting) {
      this.useBrands.getNextBrandsPage()
    }
  }

  ngOnInit(): void {
    this.useBrands.searchCriteria$.subscribe((asd) => {
    })
  }
}
