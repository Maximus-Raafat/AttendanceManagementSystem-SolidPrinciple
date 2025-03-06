import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../Core/Services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit{
  employeeForm: FormGroup;
  visibleDialog: boolean = false;
  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig 
  ){
    const data = this.config.data;
    this.employeeForm = this.fb.group({
      id:[data?.employee?.id || null],
      name: [data?.employee?.name || '', Validators.required],
      position: [data?.employee?.position || '', Validators.required],
      email: [data?.employee?.email || '', Validators.required],
      status: [data?.employee?.status || '', Validators.required]
    })
  }
  ngOnInit(): void {
  }
  saveEmployee():void {
    this.ref.close(this.employeeForm?.value);
  }
  deleteEmployee():void {
    this.ref.close({ ...this.employeeForm?.value, delete:true});
  }
 

}
