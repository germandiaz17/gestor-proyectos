import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class StoryUserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStories(projectId: string): Observable<any> {
    const url = `${this.apiUrl}/storyUsers?id=${projectId}`;
    return this.http.get<any>(url);
  }

  newStoriUser(newStory: {name: string, project_id:number}): Observable<any> {
    return this.http.post(`${this.apiUrl}/createStoriUser`, newStory);
  }

}





