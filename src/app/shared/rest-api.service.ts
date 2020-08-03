import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  
  apiURL = 'http://localhost:8080/main';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  

  // HttpClient API get() method => Fetch employees list
  getEmployees(): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/employees')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getDivisions(): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/divisions')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getPositions(): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/positions')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch employee
  getEmployee(id): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/employees/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create employee
  createEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API patch() method => Update employee
  updateEmployee(id, employee): Observable<Employee> {
    return this.http.patch<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete employee
  deleteEmployee(id){
    return this.http.delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  countSequence(){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get<Employee>(this.apiURL + '/employees/sequence', { headers, responseType: 'text'})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }
}
