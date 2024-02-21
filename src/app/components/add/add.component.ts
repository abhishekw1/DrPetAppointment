import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FontAwesomeModule, NgClass, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  @Output() addAptEvent = new EventEmitter();
  faPlus = faPlus;
  showForm = true;

  onToggleAptDisplay() {
    this.showForm = !this.showForm;
  }

  handleAddApt(form: NgForm) {
    const optValue = {
      petName: form.value.petName,
      ownerName: form.value.ownerName,
      aptNotes: form.value.aptNotes,
      aptDate: form.value.date + ' ' + form.value.time,
    };
    this.addAptEvent.emit(optValue);
    this.showForm = !this.showForm;
    window.scrollTo(0,0);
    form.reset();
  }
}
