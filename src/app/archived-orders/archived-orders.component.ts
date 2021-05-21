import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-archived-orders',
  templateUrl: './archived-orders.component.html',
  styleUrls: ['./archived-orders.component.css']
})
export class ArchivedOrdersComponent implements OnInit {
  orders;
  propertyValues;

  constructor(private orderService:DataStorageService) { }

  ngOnInit() {
    this.orderService.getOrders((data)=>{
      this.orders = data;
      this.propertyValues = Object.values(this.orders);
    })
  }

}
