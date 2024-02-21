import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { PetAppointmentType } from '../../app.types';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FontAwesomeModule, DatePipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() iappointmentList: PetAppointmentType[] = [];
  @Output() deleteEvent = new EventEmitter<PetAppointmentType>();
  @Output() updateEvent = new EventEmitter();
  faTimes = faTimes;

  onDelete(item: PetAppointmentType) {
    this.deleteEvent.emit(item);
  }
  handleUpdate(upApt: PetAppointmentType, labelName: string, newValue: string) {
    this.updateEvent.emit({ upApt: upApt, labelName: labelName, newValue: newValue });
  }
}
