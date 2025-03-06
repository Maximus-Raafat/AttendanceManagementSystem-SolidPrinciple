import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../Core/Services/employee.service';
import { EmployeeModel } from '../../../../Core/Models/employee.model';
import { Observable } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit{
  employeeList$!:Observable<EmployeeModel[]>
  ref: DynamicDialogRef | undefined;

  constructor(
    private serviceEmployee:EmployeeService,
    private dialogService: DialogService,
  ){ 

  }
  ngOnInit(): void {
     this.getEmployeeList();
  }

  getEmployeeList(): void {
    this.employeeList$ = this.serviceEmployee.$besubject;
  }
  deleteEmployeeDialog(employee: EmployeeModel): void {
    const deleteEmployee = { ...employee, delete: true };
    this.openDialog(deleteEmployee);
  }  
  openDialog(employee?:EmployeeModel):void {
    console.log("employee==>",employee)
    this.ref = this.dialogService.open(EmployeeFormComponent,{
      header: employee ? 'Edit Employee' : 'Add Employee',
      width:'50%',
      data:{employee}
    });

    this.ref.onClose.subscribe((result)=>{
      console.log("result==>",result)
      if(result){
        if(result.delete){
          this.serviceEmployee.deleteEmployee(result.id).subscribe();
        }else if(result.id){
          this.serviceEmployee.updateEmployee(result.id,result).subscribe();
        }
      }else {
        this.serviceEmployee.addEmployee(result).subscribe();
      }

    })
  }
  
}
