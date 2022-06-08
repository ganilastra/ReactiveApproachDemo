import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
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


  private goReport$ = new Subject<boolean>();
  goReportAction$ = this.goReport$.asObservable();


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
  }));

  report$ = combineLatest([this.goReportAction$, this.itemsWithSearch$]).pipe(
    map(([action, items]) => {
      alert(`This Search results will be reported: ${JSON.stringify(items)}`);
    }));

  constructor(private inventoryService: InventoryService) {
    this.report$.subscribe();
  }


  goSearch() {
    this.searchSubject$.next({ model: +this.selectedModel, priceStart: +this.priceStart, priceEnd: +this.priceEnd } as FilterParams)
  }


  goReport() {
    this.goReport$.next(true);
  }
}
