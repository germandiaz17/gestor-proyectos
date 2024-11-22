import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectsService {
  private apiUrl = 'http://localhost:3000/api/users/proyects'; 

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
