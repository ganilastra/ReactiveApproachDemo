import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Subject } from 'rxjs';
import { map, scan, withLatestFrom } from 'rxjs/operators';
import { FilterParams, InventoryService, Item, Model } from './inventory.service';
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

  saveItem$ = new Subject<Item>();
  saveItemAction$ = this.saveItem$.asObservable();

  itemsWithAdditions$ = merge(this.items$, this.saveItemAction$).pipe(
    scan((acc, value) => {
      //this is the accumulator function(see rxjs scan for managing state)
      if (value instanceof Array) // check first if is the object has fhcs otherwise this is the rowDataChange
      {
        return [...value]
      }
      else {
        return [...acc, value];
      }
    }, [] as Item[]
    )
  );

  itemsWithSearch$ = combineLatest([this.itemsWithAdditions$, this.searchAction$]).pipe(map(([items, params]) => {
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

  report$ = this.goReportAction$.pipe(
    withLatestFrom(this.itemsWithSearch$),
    map(([action, items]) => {
      alert(`This Search results will be reported: ${JSON.stringify(items)}`);
    }));


  constructor(private inventoryService: InventoryService) {
    this.report$.subscribe();

    this.saveItemAction$.subscribe(x =>
      alert(`Item to be Saved: ${JSON.stringify(x)}`))
  }


  goSearch() {
    this.searchSubject$.next({ model: +this.selectedModel, priceStart: +this.priceStart, priceEnd: +this.priceEnd } as FilterParams)
  }


  goReport() {
    this.goReport$.next(true);
  }
}
