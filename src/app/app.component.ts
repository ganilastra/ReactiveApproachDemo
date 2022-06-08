import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterParams, InventoryService, Model } from './inventory.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ReactiveApproachDemo';

  selectedModel: any;
  priceStart: any;
  priceEnd: any;

  items$ = this.inventoryService.getItems();

  private searchSubject$ = new BehaviorSubject<FilterParams>(new FilterParams());
  searchAction$ = this.searchSubject$.asObservable();


  itemsWithSearch$ = combineLatest([this.items$, this.searchAction$]).pipe(map(([items, params]) => {
    if (params) {
      if (params.model != Model.None) {
        items = items.filter(x => x.model === params.model);
      }

      if (params.priceStart) {
        items = items.filter(x => x.price >= params.priceStart);
      }

      if (params.priceEnd > 0) {
        items = items.filter(x => x.price >= params.priceEnd);
      }
    }
   return items;
  }))

  constructor(private inventoryService: InventoryService) {
  }


  goSearch() {
    this.searchSubject$.next({ model: +this.selectedModel, priceStart: +this.priceStart, priceEnd: +this.priceEnd } as FilterParams)
  }
}
