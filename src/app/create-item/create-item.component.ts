import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../inventory.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  @Input() subject: Subject<Item> = new Subject<Item>();

  constructor() { }

  model: any;
  price: any;
  itemName: any;
  itemId: any;

  ngOnInit(): void {
  }

  goAddItem() {
    const itemToBeSaved = { id: this.itemId, name: this.itemName, model: this.model, price: +this.price } as Item;
    this.subject.next(itemToBeSaved);
  }
}
