import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTickets(storiUser: string): Observable<any> {
    const url = `${this.apiUrl}/getTickets?id=${storiUser}`;
    return this.http.get<any>(url);
  }

  newTicket(newTicket: {name: string, status:string, user_story_id:number, comments:string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/createTicket`, newTicket);
  }

  updateTicket(ticketData: {name: string, status:string, comments:string, ticketId:number}): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateTicket`, ticketData);
  }

}
