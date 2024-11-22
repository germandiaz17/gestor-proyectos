import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl; 

    constructor(private http: HttpClient) {}

    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credentials);
    }

    register(userRegister: { name:string; email:string; password:string; companyId:number | null}): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userRegister);
    }
}
