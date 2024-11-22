import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private apiUrl = 'http://localhost:3000/api/users/companies'; 

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
