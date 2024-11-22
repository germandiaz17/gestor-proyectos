import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private apiUrl = `${environment.apiUrl}/companies`; 

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
