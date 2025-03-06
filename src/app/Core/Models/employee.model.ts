export interface EmployeeModel {
    id: number;
    name: string;
    position: string;
    email: string;
    status:"active" | "inactive";
}