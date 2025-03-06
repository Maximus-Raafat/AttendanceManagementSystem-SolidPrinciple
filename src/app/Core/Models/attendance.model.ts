export interface AttendanceModel {
    id: number;
    employeeId: number;
    date: string;
    status: 'Present' | 'Absent' | 'Late';
}