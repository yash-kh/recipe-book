import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders;
  propertyValues;

  constructor(private orderService:DataStorageService) { }

  ngOnInit() {
    this.orderService.getOrders((data)=>{
      this.orders = data;
      this.propertyValues = Object.values(this.orders);
    })
  }

  toArchive(i){
    this.orders[i]['isArchived'] = true;
    this.orderService.updateOrder(this.orders[i], i);
  }
}
