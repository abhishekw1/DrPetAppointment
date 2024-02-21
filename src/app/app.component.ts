import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AddComponent } from './components/add/add.component';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';
import { without, findIndex } from 'lodash';
import { OrderType, PetAppointmentType } from './app.types';

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
  http = inject(HttpClient);

  appointmentList: PetAppointmentType[] = [];
  filtredAppointmentList: PetAppointmentType[] = [];
  lastIndex: number = 0;
  orderBy: string = 'petName';
  orderType: string = 'asc';

  ngOnInit(): void {
    this.http
      .get<PetAppointmentType[]>('../assets/data.json')
      .subscribe((data) => {
        this.appointmentList = data.map((item: any) => {
          item.aptId = this.lastIndex++;
          return item;
        });
        this.filtredAppointmentList = data;
        this.sortItems();
      });
  }

  onAddApt(petAptDeatils: PetAppointmentType) {
    petAptDeatils.aptId = this.lastIndex;
    this.appointmentList.unshift(petAptDeatils);
    this.filtredAppointmentList.unshift(petAptDeatils);
    this.lastIndex++;
  }
  onUpdateApt(updata: {
    upApt: PetAppointmentType;
    labelName: string;
    newValue: string;
  }) {
    let aptIndex: number;
    let modifiedIndex: number;
    const id = updata.upApt.aptId;
    aptIndex = findIndex(this.appointmentList, {
      aptId: id,
    });
    modifiedIndex = findIndex(this.filtredAppointmentList, {
      aptId: id,
    });

    this.appointmentList[aptIndex][updata.labelName] = updata.newValue;
    this.filtredAppointmentList[aptIndex][updata.labelName] = updata.newValue;
  }
  searchApt(query: string) {
    this.filtredAppointmentList = this.appointmentList.filter((apt) => {
      return (
        apt['petName']
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
        apt['ownerName']
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
        apt['aptDate']
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
        apt['aptNotes'].toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
    });
  }
  orderApt(order: OrderType) {
    this.orderBy = order.orderBy;
    this.orderType = order.orderType;
    this.sortItems();
  }
  sortItems() {
    if (this.orderType === 'asc') {
      this.filtredAppointmentList.sort((a, b) =>
        a[this.orderBy]
          .toLowerCase()
          .localeCompare(b[this.orderBy].toLowerCase())
      );
    } else {
      this.filtredAppointmentList.sort((a, b) =>
        b[this.orderBy]
          .toLowerCase()
          .localeCompare(a[this.orderBy].toLowerCase())
      );
    }
  }

  onDeleteApt(petAptDeatils: PetAppointmentType) {
    this.appointmentList = without(this.appointmentList, petAptDeatils);
    this.filtredAppointmentList = without(
      this.filtredAppointmentList,
      petAptDeatils
    );
  }
}
