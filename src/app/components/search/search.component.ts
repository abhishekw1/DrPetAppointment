import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderType } from '../../app.types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,NgClass],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() orderBy!:string;
  @Input() orderType!:string;
  @Output() onSearchEvent = new EventEmitter<string>();
  @Output() orderEvt = new EventEmitter<OrderType>();

  query!: string;

  handleQuery(query: string) {
    this.onSearchEvent.emit(query);
  }
  onSortBy(orderItems: OrderType) {
    this.orderBy = orderItems.orderBy;
    this.orderType = orderItems.orderType;
    this.orderEvt.emit(orderItems);
  }
}


