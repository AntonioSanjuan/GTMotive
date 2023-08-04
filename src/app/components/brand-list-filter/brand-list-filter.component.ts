import { Component } from '@angular/core';
import { collapseAnimation } from 'src/app/animations/collapse/collapse.animation';

@Component({
  selector: 'app-brand-list-filter',
  templateUrl: './brand-list-filter.component.html',
  styleUrls: ['./brand-list-filter.component.scss'],
  animations: [collapseAnimation]
})
export class BrandListFilterComponent {
  collapsed = true;

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
