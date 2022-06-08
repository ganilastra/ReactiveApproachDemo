import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }

  getItems() {

    let items = this.getFakeItems();

    return of(this.getFakeItems());
  }

  private getFakeItems() {
    return [{ id: 1, name: "Lenovo101", model: Model.Lenovo, price: 999 } as Item,
    { id: 2, name: "Lenovo102", model: Model.Lenovo, price: 500 } as Item,
    { id: 3, name: "Lenovo103", model: Model.Lenovo, price: 1500 } as Item,
    { id: 4, name: "Lenovo104", model: Model.Lenovo, price: 2000 } as Item,
    { id: 5, name: "Lenovo105", model: Model.Lenovo, price: 750 } as Item,

    { id: 6, name: "Dell101", model: Model.Dell, price: 1001 } as Item,
    { id: 7, name: "Dell102", model: Model.Dell, price: 550 } as Item,
    { id: 8, name: "Dell103", model: Model.Dell, price: 1600 } as Item,
    { id: 9, name: "Dell104", model: Model.Dell, price: 2100 } as Item,
    { id: 10, name: "Dell105", model: Model.Dell, price: 899 } as Item,
    ]
  }
}

export enum Model {
  None = 0,
  Lenovo = 1,
  Dell = 2
}

export class FilterParams {
  model: Model = Model.None;
  priceStart: number = 0;
  priceEnd: number = 0;
}

export interface Item {
  id: number,
  name: string;
  model: Model,
  price: number;
}
