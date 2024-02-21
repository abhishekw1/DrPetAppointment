import { Injectable, computed, inject, signal } from '@angular/core';
import { OrderType, PetAppointmentType } from '../app.types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  appointmentListSignal = signal<PetAppointmentType[]>([]);
  searchQuery = signal<string>('');

  orderBy = signal<string>('petName');
  orderType = signal<string>('asc');

  filtredAppointmentListSignal = computed(() =>
    this.appointmentListSignal().filter((apt) => {
      return (
        apt['petName']
          .toLocaleLowerCase()
          .includes(this.searchQuery().toLocaleLowerCase()) ||
        apt['ownerName']
          .toLocaleLowerCase()
          .includes(this.searchQuery().toLocaleLowerCase()) ||
        apt['aptDate']
          .toLocaleLowerCase()
          .includes(this.searchQuery().toLocaleLowerCase()) ||
        apt['aptNotes']
          .toLocaleLowerCase()
          .includes(this.searchQuery().toLocaleLowerCase())
      );
    })
  );

  http = inject(HttpClient);

  getAppointment() {
    this.http
      .get<PetAppointmentType[]>('../assets/data.json')
      .subscribe((data: PetAppointmentType[]) => {
        this.appointmentListSignal.set(data);
      });
  }

  searchApt(query: string) {
    this.searchQuery.set(query);
  }

  addApt(newApt: PetAppointmentType) {
    newApt.aptId = this.appointmentListSignal().length + 1;
    this.appointmentListSignal.update((apts) => [...apts, newApt]);
  }

  updateApt(upApt: PetAppointmentType) {
    this.appointmentListSignal.update((apts) =>
      apts.map((apt) => (apt.aptId === upApt.aptId ? upApt : apt))
    );
  }

  deleteApt(id: number) {
    this.appointmentListSignal.update((apts) =>
      apts.filter((apt) => apt.aptId !== id)
    );
  }

  orderApt(order: OrderType) {
    this.orderBy.set(order.orderBy);
    this.orderType.set(order.orderType);
    this.sortItems();
  }

  sortItems() {
    if (this.orderType() === 'asc') {
      this.appointmentListSignal.update((apts) =>
        [...apts.sort((a, b) =>
          a[this.orderBy()]
            .toLowerCase()
            .localeCompare(b[this.orderBy()].toLowerCase())
        )]
      );
    } else {
      this.appointmentListSignal.update((apts) =>
        [...apts.sort((a, b) =>
          b[this.orderBy()]
            .toLowerCase()
            .localeCompare(a[this.orderBy()].toLowerCase())
        )]
      );
    }
  }
}
