import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { AttendanceListComponent } from './Modules/attendance/components/attendance-list/attendance-list.component';
import { AttendanceDashboardComponentComponent } from './Modules/attendance/page/attendance-dashboard-component/attendance-dashboard-component.component';
import { EmployeeDashboardComponentComponent } from './Modules/employee/page/employee-dashboard-component/employee-dashboard-component.component';
import { EmployeeListComponent } from './Modules/employee/components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './Modules/employee/components/employee-form/employee-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';

import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
@NgModule({
  declarations: [
    AppComponent,
    AttendanceListComponent,
    AttendanceDashboardComponentComponent,
    EmployeeDashboardComponentComponent,
    EmployeeListComponent,
    EmployeeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    SelectButtonModule,
    ConfirmDialogModule,
    DropdownModule,
    DynamicDialogModule,
    DialogModule
  ],
  providers: [
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
