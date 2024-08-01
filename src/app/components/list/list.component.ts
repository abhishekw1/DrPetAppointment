import { ChangeDetectionStrategy, Component, EventEmitter, Input, Signal, Output, inject, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { PetAppointmentType } from '../../app.types';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FontAwesomeModule, DatePipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  faTimes = faTimes;
  appointmentService = inject(AppointmentService);
  iappointmentList: Signal<PetAppointmentType[]> = this.appointmentService.filtredAppointmentListSignal;
  
  onDelete(aptId: number) {
    this.appointmentService.deleteApt(aptId);
  }
  handleUpdate(upApt: PetAppointmentType, labelName: string, newValue: string) {
    upApt[labelName] = newValue;
    this.appointmentService.updateApt(upApt);
  }
}
