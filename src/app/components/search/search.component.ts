import { Component, EventEmitter, Input, Output, Signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderType } from '../../app.types';
import { NgClass } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  appointmentService = inject(AppointmentService);
  orderBy: Signal<string> = this.appointmentService.orderBy;
  orderType: Signal<string> = this.appointmentService.orderType;
  query!: string;

  handleQuery(query: string) {
    this.appointmentService.searchApt(query);
  }
  onSortBy(orderItems: OrderType) {
    this.appointmentService.orderApt(orderItems);
  }
}
