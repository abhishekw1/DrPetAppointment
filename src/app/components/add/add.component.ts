import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FontAwesomeModule, NgClass, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  faPlus = faPlus;
  showForm = signal(true);
  appointmentService = inject(AppointmentService);

  onToggleAptDisplay() {
    this.showForm.update((val) => !val);
  }

  handleAddApt(form: NgForm) {
    const optValue = {
      aptId: 0,
      petName: form.value.petName,
      ownerName: form.value.ownerName,
      aptNotes: form.value.aptNotes,
      aptDate: form.value.date + ' ' + form.value.time,
    };
    this.appointmentService.addApt(optValue);
    this.showForm.update((val) => !val);
    window.scrollTo(0, 0);
    form.reset();
  }
}
