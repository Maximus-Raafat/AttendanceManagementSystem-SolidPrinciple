import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { EmployeeModel } from '../Models/employee.model';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url:string = "http://localhost:3000/employees";
  private besubjectData = new BehaviorSubject<Array<EmployeeModel>>([]);
  $besubject = this.besubjectData.asObservable(); 
  constructor(private http:HttpClient) {
     this.fetchEmployees();
    }


  fetchEmployees(): void {
    this.http.get<EmployeeModel[]>(this.url).subscribe((employee: EmployeeModel[]) => {
      this.besubjectData.next(employee);
    });
  } 

  addEmployee(employee:any):Observable<EmployeeModel> {
    //Get current data form State Mangement! 
    const currentEmployee = this.besubjectData.getValue();
    const nextId = currentEmployee.length > 0 ? Math.max(...currentEmployee.map((t)=>t.id)) + 1 : 1;
    const newEmployee = {...employee,id:Number(nextId)};
    return this.http.post(`${this.url}`,newEmployee).pipe(
      tap((addedTask:any) => {
        console.log("Response from backend:", addedTask);

        this.besubjectData.next([...currentEmployee,addedTask]);
      })
    )
  }
  updateEmployee(employeeId:number,updateEmployee:Partial<EmployeeModel>): Observable<any> {
    const currentEmployee = this.besubjectData.getValue();
    const employeeIndex = currentEmployee.findIndex(employee => employee.id === employeeId);

    if (employeeIndex === -1) {
        console.error("Employee Not Found", employeeId);
        return throwError(()=> new Error("employee not found"))
    }

    const updateEmployees = [...currentEmployee];
    updateEmployees[employeeIndex] = {...updateEmployees[employeeIndex], ...updateEmployee};
    this.besubjectData.next(updateEmployees);
    
    return this.http.patch(`${this.url}/${employeeId}`,updateEmployees)
  }
  
  deleteEmployee(employeeId:number):Observable<void> {
    return this.http.delete<void>(`${this.url}/${employeeId}`).pipe(
      tap(()=>{
        const updateTask = this.besubjectData.getValue().filter(employee=> employee.id !== employeeId);
        this.besubjectData.next(updateTask);
      }),catchError(error=>{
        console.error("Error deleting employee:", error);
        return throwError(() => error);
      })
    );
  }

}
