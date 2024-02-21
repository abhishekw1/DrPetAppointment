import { Component, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';
import { without, findIndex } from 'lodash';
import { OrderType, PetAppointmentType } from './app.types';
import { AppointmentService } from './services/appointment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AddComponent,
    SearchComponent,
    ListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Dr. Pet Appointment';
  appointmentService = inject(AppointmentService);

  ngOnInit(): void {
    this.appointmentService.getAppointment();
  }
}
