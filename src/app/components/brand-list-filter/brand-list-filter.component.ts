import { Component, Input } from '@angular/core';
import { collapseAnimation } from 'src/app/animations/collapse/collapse.animation';
import { UseBrands } from 'src/app/hooks/useBrands/useBrands.service';

@Component({
  selector: 'app-brand-list-filter',
  templateUrl: './brand-list-filter.component.html',
  styleUrls: ['./brand-list-filter.component.scss'],
  animations: [collapseAnimation]
})
export class BrandListFilterComponent {
  @Input() public filter!: number | undefined;

  constructor(public useBrands: UseBrands) {}
  collapsed = !!!this.filter;
  filterBrandId: number | null = this.filter ? this.filter : null;

  search() {
    return this.useBrands.getFilteredBrandsById(this.filterBrandId as number)
  }
}
